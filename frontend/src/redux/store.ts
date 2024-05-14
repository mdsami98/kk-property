import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from '@/redux/baseQuery';
import { setupListeners } from '@reduxjs/toolkit/query';
import AuthReducer from '@/redux/slice/auth/authSlice';
export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: AuthReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware)
});
setupListeners(store.dispatch);
