import React, { useState } from 'react';
import dayjs from 'dayjs';
import { Button, message, Popconfirm, Space } from 'antd';
import type { TableProps } from 'antd';
import {useGetExpenseDataTableQuery, useUpdatePaymentStatusMutation} from "@/redux/slice/expense/expenseApiSlice";
import DataTable from "@/components/Table/DataTable";

interface DataType {
    name: string;
    amount: string;
    date: number;
    approved: number;
    id: string;  // Assuming there's an id field for uniqueness
}

function DailyExpenseDataTable() {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [itemPerPage, setItemPerPage] = useState<number>(10);
    const [filterSearch, setFilterSearch] = useState<string>('');

    // Pop Confirm
    const [openConfirmId, setOpenConfirmId] = useState<string | null>(null);
    const [confirmLoading, setConfirmLoading] = useState(false);

    const [updateStatus] = useUpdatePaymentStatusMutation()

    const showPopconfirm = (id: string) => {
        setOpenConfirmId(id);
    };

    const handleOk = (e:any, recordId:any) => {
        console.log(recordId);
        setConfirmLoading(true);
        try {
            updateStatus({id: recordId})
                .unwrap()
                .then((response: any) => {
                    if (response.status) {
                        message.success(response.message);
                        setOpenConfirmId(null);
                        setConfirmLoading(false);
                        // router.push('/daily-expenses');
                    }
                })
                .catch((error: any) => {
                    setOpenConfirmId(null);
                    setConfirmLoading(false);
                    message.error('Sorry Something Wrong Please Try Again');
                });
        } catch (error) {
            setOpenConfirmId(null);
            setConfirmLoading(false);
            message.error('Failed to add daily expense');
        }


        setTimeout(() => {
            setOpenConfirmId(null);
            setConfirmLoading(false);
        }, 2000);
    };

    const handleCancel = () => {
        setOpenConfirmId(null);
    };

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

    const PopConfirmRender = (props:any) => {
        const {record} = props
        return (
            <Popconfirm
                title={`Are you sure you want to pay this expense?`}
                open={openConfirmId === record.id}
                onConfirm={(e:any) => handleOk(e, record.id)}
                okButtonProps={{ loading: confirmLoading }}
                onCancel={handleCancel}
            >
                <Button size="small" onClick={() => showPopconfirm(record.id)} danger>Unpaid</Button>
            </Popconfirm>
        );
    };

    const columns: TableProps<DataType>['columns'] = [
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
            render: (text) => dayjs(text).format('MMMM D, YYYY h:mm A'),
            width: "20%"
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
        {
            title: 'Payment Status',
            dataIndex: 'approved',
            key: 'approved'
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record:any) => (
                <Space size="middle">
                    {record.approved === 1 ? (
                        <Button disabled size="small">Paid</Button>
                    ) : (
                        <PopConfirmRender record={record} />
                    )}
                </Space>
            ),
        }
    ];

    const onPageChange = (page: number, pageSize: number) => {
        setCurrentPage(page);
    };

    const handleSearch = (value: string) => {
        setFilterSearch(value);
    };

    return (
        <div>
            <DataTable
                columns={columns}
                data={tableData?.rows || []}
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
