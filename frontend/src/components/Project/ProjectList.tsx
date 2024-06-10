import React, { useState } from 'react';
import { Button, Dropdown, Flex } from 'antd';

import type { TableProps, MenuProps } from 'antd';
import DataTable from '../Table/DataTable';
import { useGetProjectDataTableQuery } from '@/redux/slice/project/projectApiSlice';

interface DataType {
    name: string;
    address: string;
    area: number;
    unit_price: number;
    total_price: number;
    selling_price: number;
}
function ProjectList() {
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
