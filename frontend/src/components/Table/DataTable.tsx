'use client';
import React from 'react';
import { Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';

interface DataTableProps {
    columns: ColumnsType<any>;
    data: any[];
}

const DataTable: React.FC<DataTableProps> = ({ columns, data }) => {
    return <Table columns={columns} dataSource={data} />;
};

export default DataTable;
