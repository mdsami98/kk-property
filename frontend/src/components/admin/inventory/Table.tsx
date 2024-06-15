import React, { useState } from 'react';
import { Button, Dropdown, Flex } from 'antd';

import type { TableProps, MenuProps } from 'antd';
import DataTable from '../../Table/DataTable';
import { useGetInventoryDataTableQuery } from '@/redux/slice/inventory/inventoryApiSlice';

interface DataType {
    product_name: string;
    product_code: string;
    quantity: number;
    unit_price: number;
}
function InventoryDataTable() {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [itemPerPage, setItemPerPage] = useState<number>(10);
    const [filterSearch, setFilterSearch] = useState<string>('');
    const {
        data: tableData,
        isLoading,
        isFetching,
        isSuccess,
        isError
    } = useGetInventoryDataTableQuery({
        currentPage,
        rowLimit: itemPerPage,
        searchKey: filterSearch
    });

    const columns: TableProps<DataType>['columns'] = [
        {
            title: 'Product Name',
            dataIndex: 'product_name',
            key: 'product_name',
            render: (text) => {
                console.log(text);
                return text;
            }
        },
        {
            title: 'Product Code',
            dataIndex: 'product_code',
            key: 'product_code'
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            key: 'quantity'
        },
        {
            title: 'Unit Price',
            dataIndex: 'unit_price',
            key: 'unit_price'
        }
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

export default InventoryDataTable;
