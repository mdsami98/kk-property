'use client';
import { PlusOutlined } from '@ant-design/icons';
import DataTable from '@/components/Table/DataTable';
import React, { useState } from 'react';
import type { TableProps } from 'antd';
import type { MenuProps } from 'antd';
import { Button, Dropdown, Flex } from 'antd';
import CustomModal from '@/components/Modal';

export default function AdminDashboard() {
    interface DataType {
        key: string;
        name: string;
        age: number;
        address: string;
        tags: string[];
    }

    const [memberModal, setMemberModal] = useState(false);
    const handleOnClick = (e) => {
        e.preventDefault();
        console.log(e);
        setMemberModal(true);
    };

    const onMenuClick: MenuProps['onClick'] = (e) => {
        console.log('click', e);
    };

    const items = [
        {
            key: '1',
            label: '1st item'
        },
        {
            key: '2',
            label: '2nd item'
        },
        {
            key: '3',
            label: '3rd item'
        }
    ];

    const columns: TableProps<DataType>['columns'] = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text) => {
                return text;
            }
        },
        {
            title: 'Age',
            dataIndex: 'age',
            key: 'age'
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address'
        },

        {
            title: '',
            key: 'action',
            render: (_, record) => (
                <Dropdown.Button
                    menu={{ items, onClick: onMenuClick }}
                ></Dropdown.Button>
            )
        }
    ];

    const data: DataType[] = [
        {
            key: '1',
            name: 'John Brown',
            age: 32,
            address: 'New York No. 1 Lake Park',
            tags: ['nice', 'developer']
        },
        {
            key: '2',
            name: 'Jim Green',
            age: 42,
            address: 'London No. 1 Lake Park',
            tags: ['loser']
        },
        {
            key: '3',
            name: 'Joe Black',
            age: 32,
            address: 'Sydney No. 1 Lake Park',
            tags: ['cool', 'teacher']
        }
    ];

    console.log(memberModal);
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

            <DataTable columns={columns} data={data} />

            <CustomModal
                title='Add New Investor/Manager'
                children={
                    <div className='mb-5 text-right'>
                        User Add ar Akta Form Banabi
                    </div>
                }
                open={memberModal}
                setOpen={setMemberModal}
            />
        </div>
    );
}
