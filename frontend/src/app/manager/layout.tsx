'use client';

import React, { useEffect } from 'react';
import AdminLayout from '@/components/Layouts/AdminLayout';
import ManagerAuthProvider from '@/middleware/ManagerAuthProvider';

export default function ManagerLayout({ children }) {
    useEffect(() => {}, []);

    return (
        <ManagerAuthProvider>
            <AdminLayout>{children}</AdminLayout>
        </ManagerAuthProvider>
    );
}
