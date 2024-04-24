import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import customerReducer from '@/store/customer';

export default configureStore({
    reducer: {
        customer: customerReducer
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware({
            serializableCheck: false
        });
    }
});
