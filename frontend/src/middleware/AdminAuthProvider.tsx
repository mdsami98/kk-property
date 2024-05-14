'use-client';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
// import Forbidden from "../components/error-page/Forbidden";s
import { setCredentials } from '../redux/slice/auth/authSlice';
import { useGetUserQuery } from '../redux/slice/auth/authApiSlice';
import { redirect } from 'next/navigation';
import Loader from '../components/common/Loader';

const AdminAuthProvider = ({ children }: any) => {
    const dispatch = useDispatch();
    // call user fetch api
    const {
        data: user,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetUserQuery({});
    useEffect(() => {
        // check authentication by fetching user
        // set user data and isAuthenticated in auth reducer
        if (isSuccess) {
            const { role } = user.data;
            console.log(role, 'role');
            if (role != 0) {
                redirect('/');
            }
            dispatch(
                setCredentials({ user: user.data, isAuthenticated: true })
            );
        }
    }, [isSuccess, user]);

    if (isLoading) {
        // TODO Need to add loader component or Skeleton loader full page loader
        return <Loader />;
    }
    if (isError || error || !user) {
        redirect('/');
    }
    if (isSuccess) {
        // if success return children
        return children;
    }

    redirect('/');
};

export default AdminAuthProvider;
