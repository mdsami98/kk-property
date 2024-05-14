import AdminLayout from '@/components/Layouts/AdminLayout';
import CardDataStats from '@/components/common/CardDataStats';
import { DollarTwoTone } from '@ant-design/icons';
import React from 'react';

export default function AdminDashboard() {
    return (
        <AdminLayout>
            <div className='grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5'>
                <CardDataStats
                    title='Total Expense'
                    total='3.456K'
                ></CardDataStats>
                <CardDataStats
                    title='Last 7 Days Deposit'
                    total='3.456K'
                ></CardDataStats>
                <CardDataStats title='Demo' total='3.456K'></CardDataStats>
            </div>
        </AdminLayout>
    );
}
