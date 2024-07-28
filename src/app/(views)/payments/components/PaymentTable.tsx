'use client'
import { Button, Table, Tag } from 'antd'
import React, { useState } from 'react'
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import { IPayment } from '@/app/models/Payment.model';
import { IAccount } from '@/app/models/Account.model';
import { formatCurrency } from '@/app/utils/formatCurrency';
import { useRouter } from 'next/navigation';
import PlaylistRemoveRoundedIcon from '@mui/icons-material/PlaylistRemoveRounded';
import { FloatingNav } from '@/app/components/FloatingNavbar';
const navItems = [
    {
        name: "Bỏ chọn tất cả",
        icon: <PlaylistRemoveRoundedIcon className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },

];
export default function PaymentTable(
    {
        payments,
        loading
    }: {
        payments?: IPayment[],
        loading: boolean
    }
) {
    const router = useRouter()
    const [selectedKey, setSelectedRowKeys] = useState<React.Key[]>()
    const [selectedRowsState, setSelectedRowsState] = useState<IPayment[]>()
    const handlePayment = (url: any) => {
        router.push(url)
    }
    const columns = [
        {
            title: 'Tên đối tác',
            dataIndex: 'partner',
            key: 'id',
            render: (partner: IAccount) => partner.last_name + ' ' + partner.first_name
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'partner',
            key: 'id',
            render: (partner: IAccount) => partner.phone_number
        },
        {
            title: 'Từ ngày',
            dataIndex: 'start_date',
            key: 'id',
            render: (date: any) => <p>
                {
                    new Date(date).getDate().toString().padStart(2, '0')
                    + '/' + (new Date(date).getMonth() + 1).toString().padStart(2, '0')
                    + '/' + new Date(date).getFullYear().toString().padStart(2, '0')
                }
            </p>
        },
        {
            title: 'Đến ngày',
            dataIndex: 'end_date',
            key: 'id',
            render: (date: any) => <p>
                {
                    new Date(date).getDate().toString().padStart(2, '0')
                    + '/' + (new Date(date).getMonth() + 1).toString().padStart(2, '0')
                    + '/' + new Date(date).getFullYear().toString().padStart(2, '0')
                }
            </p>
        },
        {
            title: 'Số tiền',
            dataIndex: 'amount',
            key: 'id',
            render: (amount: any) => formatCurrency(amount)
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'id',
            render: (status: any) => status === 'pending'
                ?
                <CancelOutlinedIcon sx={{ color: 'red' }} />
                :
                <CheckCircleOutlineOutlinedIcon sx={{ color: 'green' }} />
        },
        {
            title: '',
            dataIndex: 'action',
            key: 'id',
            render: (_: any, record: any) => record.status === 'pending'
                ? <Button onClick={() => handlePayment(record.payment_url)}>Thanh toán</Button>
                : <Tag color='green'>Đã thanh toán</Tag>

        }
    ]
    const rowSelection = {
        onChange: (selectedRowKeys: React.Key[], selectedRows: IPayment[]) => {
            console.log('row keys: ', selectedRows);
            setSelectedRowKeys(selectedRowKeys)
            setSelectedRowsState(selectedRows)
        },
        getCheckboxProps: (record: IPayment) => {
            return ({
                disabled: record.status === 'paid'

            })
        },
        selectedRowKeys: selectedKey,
        hideSelectAll: true
    };

    return (
        <>
            <FloatingNav
                url='/admin/monthly_partner_payment/multiple/generate_qr'
                body={{
                    partner_payment_ids: selectedKey,
                    return_url: process.env.WEB_HOST_PUBLIC + '/payments'
                }}
                selectedKey={selectedKey}
                navItems={navItems}
                setSelectedRowKeys={setSelectedRowKeys}
                setSelectedRowsState={setSelectedRowsState}

            />

            <Table
                rowKey={(record) => record.id}
                rowSelection={{ ...rowSelection }}
                dataSource={payments}
                columns={columns}
                loading={loading}
            />
        </>

    )
}
