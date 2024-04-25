import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import customerReducer from '@/store/customer';
import documentReducer from '@/store/document';

export default configureStore({
    reducer: {
        customer: customerReducer,
        document: documentReducer
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware({
            serializableCheck: false
        });
    }
});
