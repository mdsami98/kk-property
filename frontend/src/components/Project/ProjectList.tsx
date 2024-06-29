import React, { useState } from 'react';
import { Button, Dropdown, Menu, Space } from 'antd';
import { MoreOutlined } from '@ant-design/icons';
import type { TableProps, MenuProps } from 'antd';
import DataTable from '../Table/DataTable';
import { useGetProjectDataTableQuery } from '@/redux/slice/project/projectApiSlice';
import {useRouter} from "next/navigation";

interface DataType {
    id: string;
    name: string;
    address: string;
    area: number;
    unit_price: number;
    total_price: number;
    selling_price: number;
}

function ProjectList() {
    const router = useRouter();

    const [currentPage, setCurrentPage] = useState<number>(1);
    const [itemPerPage, setItemPerPage] = useState<number>(10);
    const [filterSearch, setFilterSearch] = useState<string>('');
    const [status, setStatus] = useState('1,2');

    const {
        data: memberData,
        isLoading,
        isFetching,
        isSuccess,
        isError
    } = useGetProjectDataTableQuery({
        currentPage,
        rowLimit: itemPerPage,
        searchKey: filterSearch,
        status
    });

    const handleMenuClick = (record: DataType, e: any) => {
        if (e.key === 'view') {
            console.log('view', record);
            router.push('/admin/project/views/' +record.id);

            // Add your edit logic here
        } else if (e.key === 'delete') {
            console.log('Delete', record);
            // Add your delete logic here
        }
    };

    const menu = (record: DataType) => (
        <Menu onClick={(e) => handleMenuClick(record, e)}>
            <Menu.Item key="view">
                View
            </Menu.Item>
            <Menu.Item key="delete">
                Delete
            </Menu.Item>
        </Menu>
    );

    const columns: TableProps<DataType>['columns'] = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text) => text,
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address'
        },
        {
            title: 'Area',
            dataIndex: 'area',
            key: 'area'
        },
        {
            title: 'Unit Price',
            dataIndex: 'unit_price',
            key: 'unit_price'
        },
        {
            title: 'Total Price',
            dataIndex: 'total_price',
            key: 'total_price'
        },
        {
            title: 'Selling Price',
            dataIndex: 'selling_price',
            key: 'selling_price'
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Dropdown overlay={menu(record)} trigger={['click']}>
                    <a onClick={e => e.preventDefault()}>
                        <Space>
                            <MoreOutlined />
                        </Space>
                    </a>
                </Dropdown>
            )
        }
    ];

    const onPageChange = (page: number, pageSize: number) => {
        console.log(page, pageSize);
        setCurrentPage(page);
    };

    const handleSearch = (value: string) => {
        setFilterSearch(value);
    };

    return (
        <div>
            <DataTable
                columns={columns}
                data={memberData?.rows ? memberData?.rows : []}
                loading={isLoading}
                total={memberData?.count ?? 0}
                onPageChange={onPageChange}
                handleSearch={handleSearch}
                rowKey='id'
            />
        </div>
    );
}

export default ProjectList;
