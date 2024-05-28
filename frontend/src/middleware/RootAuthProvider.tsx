'use client';

import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
// import Forbidden from "../components/error-page/Forbidden";s
import { setCredentials } from '../redux/slice/auth/authSlice';
import { useGetUserQuery } from '../redux/slice/auth/authApiSlice';
import { redirect } from 'next/navigation';
import Loader from '../components/common/Loader';

const RootAuthProvider = ({ children }: any) => {
    const dispatch = useDispatch();
    const {
        data: user,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetUserQuery({});
    useEffect(() => {
        if (isSuccess) {
            const { role } = user.data;
            console.log(role, 'role');
            if (role == 0) {
                redirect('/admin');
            }
            if (role == 1) {
                redirect('/manager');
            }
            if (role == 2) {
                redirect('/investors');
            }
            dispatch(setCredentials(user.data));
        }
    }, [isSuccess, user]);

    if (isLoading) {
        // TODO Need to add loader component or Skeleton loader full page loader
        return <Loader />;
    }
    if (isError || error || !user) {
        redirect('/login');
    }
    if (isSuccess) {
        // if success return children
        return children;
    }
};

export default RootAuthProvider;
