'use client';

import React, { useEffect } from 'react';
import InvestorAuthProvider from '@/middleware/InvestorAuthProvider';
import AdminLayout from '@/components/Layouts/AdminLayout';

export default function InvestorLayout({ children }) {
    useEffect(() => {}, []);

    return (
        <InvestorAuthProvider>
            <AdminLayout>{children}</AdminLayout>
        </InvestorAuthProvider>
    );
}
