'use client';
import { PlusOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import { Button, Dropdown, Flex } from 'antd';
import CustomModal from '@/components/Modal';
import MemberAddForm from '@/components/adminMember/MemberAddForm';
import MemberList from '@/components/adminMember/MemberList';

export default function AdminDashboard() {
    const [memberModal, setMemberModal] = useState(false);
    const handleOnClick = (e) => {
        e.preventDefault();
        console.log(e);
        setMemberModal(true);
    };

    const memberCreateSuccess = () => {
        setMemberModal(false);
        memberCreateSuccess;
    };

    return (
        <div>
            <div className='mb-5 text-right'>
                <Button
                    onClick={handleOnClick}
                    type='primary'
                    icon={<PlusOutlined />}
                >
                    Add New Investor/Manager
                </Button>
            </div>

            <MemberList />

            <CustomModal
                title='Add New Investor/Manager'
                children={
                    <MemberAddForm memberCreateSuccess={memberCreateSuccess} />
                }
                open={memberModal}
                setOpen={setMemberModal}
            />
        </div>
    );
}
