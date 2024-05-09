'use client'
import React from 'react';
import { Provider } from 'react-redux';
import { SnackbarProvider } from 'notistack';
import { useAuth } from '@/hooks/auth';
import Navigation from '@/app/(app)/Navigation';
import Loading from '@/app/(app)/Loading';
import ConfirmContextProvider from '@/providers/confirmContext';
import store from '@/store';

const AppLayout = ({ children }) => {
  const { user } = useAuth({ middleware: 'auth' });

  if (!user) {
    return <Loading />;
  }

  return (
    <Provider store={store}>
      <ConfirmContextProvider>
        <SnackbarProvider
          anchorOrigin={{
            horizontal: 'center',
            vertical: 'top'
          }}
        >
          <div className="min-h-screen bg-gray-100">
            <Navigation user={user} />
            <main>{children}</main>
          </div>
        </SnackbarProvider>
      </ConfirmContextProvider>
    </Provider>
  );
};

export default AppLayout;
