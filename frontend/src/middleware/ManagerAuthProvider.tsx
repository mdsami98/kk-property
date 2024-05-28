'use-client';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
// import Forbidden from "../components/error-page/Forbidden";s
import { setCredentials } from '../redux/slice/auth/authSlice';
import { useGetUserQuery } from '../redux/slice/auth/authApiSlice';
import { redirect } from 'next/navigation';
import Loader from '../components/common/Loader';

const ManagerAuthProvider = ({ children }: any) => {
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
        if (isSuccess) {
            const { role } = user.data;
            console.log(role, 'role');
            if (role != 1) {
                redirect('/login');
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

export default ManagerAuthProvider;
