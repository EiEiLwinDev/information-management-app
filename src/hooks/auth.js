import useSWR from 'swr'
import axiosInstance from '@/utils/axios'
import { useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'

export const useAuth = ({ middleware, redirectIfAuthenticated } = {}) => {
    const router = useRouter()
    const params = useParams()

    const { data: user, error, mutate } = useSWR('/api/user', () =>
        axiosInstance
            .get('/api/user')
            .then(res => res.data)
            .catch(error => {
                if (error.response.status !== 409) throw error
                router.push('/verify-email')
            }),
    )    
    const csrf = () => axiosInstance.get('/sanctum/csrf-cookie')

    const register = async ({ setErrors, ...props }) => {

        setErrors([])

        axiosInstance
        const response = await axiosInstance.post('/api/register', props, {
            headers: {
                accept: 'application/json',
            }
        });
        console.log('response', response)
        localStorage.setItem('authToken', response.data.data.token);
    }    

    const login = async ({ setErrors, setStatus, ...props }) => {
        try {
            setErrors([]);
            setStatus(null);

            const response = await axiosInstance.post('/api/login', props, {
                headers: {
                    accept: 'application/json',
                }
            });
            localStorage.setItem('authToken', response.data.data.token);
            mutate();
        } catch (error) {
            if (error.response && error.response.status === 422) {
                setErrors(error.response.data.errors);
            } else {
                throw error;
            }
        }
    }

    const forgotPassword = async ({ setErrors, setStatus, email }) => {
        await csrf()

        setErrors([])
        setStatus(null)

        axiosInstance
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

        axiosInstance
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
        axiosInstance
            .post('/email/verification-notification')
            .then(response => setStatus(response.data.status))
    }

    const logout = async () => {
        if (!error) {
            await axiosInstance.post('/api/logout').then(() =>{
                mutate()
                localStorage.setItem('authToken', null);

            })
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
