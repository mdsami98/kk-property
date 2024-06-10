'use client';
import React, { useEffect, useRef, useState } from 'react';
import { Space, Table, Tag, Pagination, Input } from 'antd';
import type { ColumnsType } from 'antd/es/table';

interface DataTableProps {
    columns: ColumnsType<any>;
    data: any[];
    loading: boolean;
    total: number;
    rowKey: string;
    onPageChange: (page: number, pageSize: number) => void;
    handleSearch: (value: string) => void;
}

const DataTable: React.FC<DataTableProps> = ({
    columns,
    data,
    loading,
    total,
    onPageChange,
    handleSearch,
    rowKey
}) => {
    const [search, setSearch] = useState('');
    const debounceTimeoutRef = useRef<number | null>(null);
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };

    useEffect(() => {
        if (debounceTimeoutRef.current) {
            clearTimeout(debounceTimeoutRef.current);
        }

        debounceTimeoutRef.current = window.setTimeout(() => {
            handleSearchInternal();
        }, 500); // Adjust the delay as needed (300ms in this example)

        return () => {
            if (debounceTimeoutRef.current) {
                clearTimeout(debounceTimeoutRef.current);
            }
        };
    }, [search]);
    const handleSearchInternal = () => {
        // Call your API here with the search value
        handleSearch(search);
    };
    return (
        <>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    marginBottom: '16px'
                }}
            >
                <Input
                    name='name'
                    placeholder='Enter Name'
                    value={search}
                    onChange={handleSearchChange}
                    style={{ width: '200px' }}
                />
            </div>
            {/* <Input
                name='name'
                placeholder='Enter Name'
                value={search}
                onChange={handleSearchChange}
            /> */}
            <Table
                columns={columns}
                dataSource={data}
                loading={loading}
                pagination={false}
                rowKey={rowKey}
            />
            <div className='pt-5 text-right'>
                <Pagination
                    defaultCurrent={1}
                    total={total}
                    onChange={onPageChange}
                />
            </div>
        </>
    );
};

export default DataTable;
