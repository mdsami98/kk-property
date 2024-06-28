import React, { useState } from 'react';
import dayjs from 'dayjs';
import { Button, Dropdown, Flex } from 'antd';

import type { TableProps, MenuProps } from 'antd';
// import DataTable from '../../Table/DataTable';
import {useGetExpenseDataTableQuery} from "@/redux/slice/expense/expenseApiSlice";
import DataTable from "@/components/Table/DataTable";

interface DataType {
    name: string;
    amount: string;
    date: number;
}
function DailyExpenseDataTable() {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [itemPerPage, setItemPerPage] = useState<number>(10);
    const [filterSearch, setFilterSearch] = useState<string>('');
    const {
        data: tableData,
        isLoading,
        isFetching,
        isSuccess,
        isError
    } = useGetExpenseDataTableQuery({
        currentPage,
        rowLimit: itemPerPage,
        searchKey: filterSearch
    });

    const columns: TableProps<DataType>['columns'] = [
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
            render: (text) => {
                return dayjs(text).format('MMMM D, YYYY h:mm A');
            },
            width:  "20%"
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            key: 'amount'
        },

    ];

    const onPageChange = (page: number, pageSize: number) => {
        setCurrentPage(page);
    };
    const handleSearch = (value: string) => {
        setFilterSearch(value);
    };

    console.log(tableData?.rows);
    return (
        <div>
            <DataTable
                columns={columns}
                data={tableData?.rows ? tableData?.rows : []}
                loading={isLoading}
                total={tableData?.count ?? 0}
                onPageChange={onPageChange}
                handleSearch={handleSearch}
                rowKey='id'
            />
        </div>
    );
}

export default DailyExpenseDataTable;
