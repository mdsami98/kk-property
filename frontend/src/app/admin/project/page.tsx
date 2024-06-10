'use client';
import { PlusOutlined } from '@ant-design/icons';
import React from 'react';
import { Button } from 'antd';
import { useRouter } from 'next/navigation';
import ProjectList from '@/components/Project/ProjectList';

export default function AdminDashboard() {
    const router = useRouter();
    const handleClick = () => {
        router.push('/admin/project/create');
    };
    return (
        <div>
            <div className='mb-5 text-right'>
                <Button
                    onClick={handleClick}
                    type='primary'
                    icon={<PlusOutlined />}
                >
                    Add New Project
                </Button>

                <div className='mt-5'>
                    <ProjectList />
                </div>
            </div>
        </div>
    );
}
