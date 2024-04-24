'use client'

import { useAuth } from '@/hooks/auth'
import Navigation from '@/app/(app)/Navigation'
import Loading from '@/app/(app)/Loading'
import { Provider } from 'react-redux'
import store from '@/store'

const AppLayout = ({ 
    children, 
    header
 }) => {
    const { user } = useAuth({ middleware: 'auth' })

    if (!user) {
        return <Loading />
    }

    return (
        <Provider store={store}>
            <div className="min-h-screen bg-gray-100">
                <Navigation user={user} />
                <main>{children}</main>
            </div>
        </Provider>
    )
}

export default AppLayout
