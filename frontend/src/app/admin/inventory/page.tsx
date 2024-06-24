'use client';
import { PlusOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import { Button } from 'antd';
import { useRouter } from 'next/navigation';
import InventoryCreate from '@/components/adminMember/adminInventory/InventoryCreate';
import CustomModal from '@/components/Modal';
import InventoryDataTable from '@/components/admin/inventory/table';

export default function AdminDashboard() {
    const router = useRouter();

    const [memberModal, setMemberModal] = useState(false);
    const handleOnClick = (e: any) => {
        e.preventDefault();
        console.log(e);
        setMemberModal(true);
    };

    const createSuccess = () => {
        setMemberModal(false);
        // memberCreateSuccess;
    };
    return (
        <div>
            <div className='mb-5 text-right'>
                <Button
                    onClick={handleOnClick}
                    type='primary'
                    icon={<PlusOutlined />}
                >
                    Add New Product
                </Button>
                <div className='mt-5'>
                    <InventoryDataTable />
                </div>
            </div>

            <CustomModal
                title='Product Create Page'
                children={<InventoryCreate createSuccess={createSuccess} />}
                open={memberModal}
                setOpen={setMemberModal}
            />
        </div>
    );
}
