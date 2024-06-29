'use client';

import React, { useEffect, useState } from 'react';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { ReduxProvider } from '@/redux/Provider/ReduxProvider';
import AdminAuthProvider from '@/middleware/AdminAuthProvider';
import AdminLayout from '@/components/Layouts/AdminLayout';

export default function RootLayout({ children }:any) {
    useEffect(() => {}, []);

    return (
        <AdminAuthProvider>
            <AdminLayout>{children}</AdminLayout>
        </AdminAuthProvider>
    );
}
