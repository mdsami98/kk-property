import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import DefaultLayout from '@/components/Layouts/AdminLayout';
import LoginForm from '@/components/auth/LoginForm';
import logo from '../../../public/images/user/kk logo.jpeg';

export const metadata: Metadata = {
    title: 'Next.js SignIn Page | TailAdmin - Next.js Dashboard Template',
    description: 'This is Next.js Signin Page TailAdmin Dashboard Template'
};

const SignIn: React.FC = () => {
    return (
        <div className='rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark mt-5 m-10'>
            <div className='flex flex-wrap items-center'>
                <div className='hidden w-full xl:block xl:w-1/2'>
                    <div className='px-26 py-17.5 text-center'>
                        <Link className='mb-5.5 inline-block' href='/'>
                            <Image
                                className='hidden dark:block'
                                src={logo}
                                alt='Logo'
                                width={176}
                                height={32}
                            />
                            <Image
                                className='dark:hidden'
                                src={logo}
                                alt='Logo'
                                width={176}
                                height={32}
                            />
                        </Link>

                        <h2 className='2xl:px-20'>
                           Kamal & Kalam Properties Ltd.
                        </h2>

                    
                    </div>
                </div>

                <div className='w-full border-stroke dark:border-strokedark xl:w-1/2 xl:border-l-2'>
                    <div className='w-full p-4 sm:p-12.5 xl:p-17.5'>
                        <h2 className='mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2'>
                            Sign In 
                        </h2>

                        <LoginForm />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignIn;
