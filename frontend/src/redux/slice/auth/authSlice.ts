import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { AuthInterface, AuthStateInterface } from '@/interface/IAuthInterface';

const initialState = {
    user: {},
    isAuthenticated: false
} as AuthInterface;

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action: any) => {
            // const { user } = action.payload;
            console.log(action.payload);
            state.user = action.payload;
            state.isAuthenticated = true;
        },
        logOut: (state, action) => {
            state.user = null;
            state.isAuthenticated = false;
        }
    }
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state: AuthStateInterface) => state.auth.user;
export const isAuthenticated = (state: AuthStateInterface) =>
    state.auth.isAuthenticated;