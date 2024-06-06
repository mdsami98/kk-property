import { useGetMemberDataTableQuery } from '@/redux/slice/user/userApiSlice';
import React, { useState } from 'react';
import { Button, Dropdown, Flex } from 'antd';

import type { TableProps, MenuProps } from 'antd';
import DataTable from '../Table/DataTable';

interface DataType {
    key: string;
    name: string;
    age: number;
    address: string;
    tags: string[];
}
function MemberList() {
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
    } = useGetMemberDataTableQuery({
        currentPage,
        rowLimit: itemPerPage,
        searchKey: filterSearch,
        status
    });

    const columns: TableProps<DataType>['columns'] = [
        {
            title: 'Name',
            dataIndex: 'first_name',
            key: 'name',
            render: (text) => {
                return text;
            }
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'age'
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
            />
        </div>
    );
}

export default MemberList;
