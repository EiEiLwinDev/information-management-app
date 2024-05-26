import useSWR from 'swr'
import axios from '@/utils/axios'
import { useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'

export const useAuth = ({ middleware, redirectIfAuthenticated } = {}) => {
    const router = useRouter()
    const params = useParams()

    const { data: user, error, mutate } = useSWR('/api/user', () =>
        axios
            .get('/api/user')
            .then(res => res.data)
            .catch(error => {
                if (error.response.status !== 409) throw error
                router.push('/verify-email')
            }),
    )

    const csrf = () => axios.get('/sanctum/csrf-cookie')

    const register = async ({ setErrors, ...props }) => {
        await csrf()

        setErrors([])

        axios
            .post('/register', props)
            .then(() => mutate())
            .catch(error => {
                if (error.response.status !== 422) throw error

                setErrors(error.response.data.errors)
            })
    }

    // const login = async ({ setErrors, setStatus, ...props }) => {
    //     await csrf()

    //     setErrors([])
    //     setStatus(null)

    //     axios
    //         .post('/login', props)
    //         .then(() => mutate())
    //         .catch(error => {
    //             if (error.response.status !== 422) throw error

    //             setErrors(error.response.data.errors)
    //         })
    // }

    const login = async ({ setErrors, setStatus, ...props }) => {
        try {
            // Fetch CSRF token
            await csrf();
    
            // Clear any previous errors and status
            setErrors([]);
            setStatus(null);
    
            // Send login request
            const response = await axios.post('/login', props);
    
            // Assuming the token is returned in the response as 'token'
            const token = response.data.token;
    
            // Store token in local storage
            localStorage.setItem('authToken', token);
            
            // Optionally, you can redirect the user to another page upon successful login
            // Router.push('/dashboard');
            
        } catch (error) {
            if (error.response) {
                // Server responded with an error status code
                if (error.response.status === 422) {
                    // Validation error, set errors
                    setErrors(error.response.data.errors);
                } else {
                    // Other server error, handle appropriately
                    setStatus({ type: 'error', message: 'An error occurred during login.' });
                }
            } else if (error.request) {
                // The request was made but no response was received
                setStatus({ type: 'error', message: 'No response received from the server.' });
            } else {
                // Something happened in setting up the request that triggered an error
                setStatus({ type: 'error', message: 'Error setting up the request.' });
            }
            
            // Log the error for debugging
            console.error('Login error:', error);
        }
    };

    const forgotPassword = async ({ setErrors, setStatus, email }) => {
        await csrf()

        setErrors([])
        setStatus(null)

        axios
            .post('/forgot-password', { email })
            .then(response => setStatus(response.data.status))
            .catch(error => {
                if (error.response.status !== 422) throw error

                setErrors(error.response.data.errors)
            })
    }

    const resetPassword = async ({ setErrors, setStatus, ...props }) => {
        await csrf()

        setErrors([])
        setStatus(null)

        axios
            .post('/reset-password', { token: params.token, ...props })
            .then(response =>
                router.push('/login?reset=' + btoa(response.data.status)),
            )
            .catch(error => {
                if (error.response.status !== 422) throw error

                setErrors(error.response.data.errors)
            })
    }

    const resendEmailVerification = ({ setStatus }) => {
        axios
            .post('/email/verification-notification')
            .then(response => setStatus(response.data.status))
    }

    const logout = async () => {
        if (!error) {
            await axios.post('/logout').then(() => mutate())
        }

        window.location.pathname = '/login'
    }

    useEffect(() => {
        if (middleware === 'guest' && redirectIfAuthenticated && user)
            router.push(redirectIfAuthenticated)
        if (
            window.location.pathname === '/verify-email' &&
            user?.email_verified_at
        )
            router.push(redirectIfAuthenticated)
        if (middleware === 'auth' && error) logout()
    }, [user, error])

    return {
        user,
        register,
        login,
        forgotPassword,
        resetPassword,
        resendEmailVerification,
        logout,
    }
}
