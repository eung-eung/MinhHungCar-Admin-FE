'use client'
import { Button, Table, Tag } from 'antd'
import React from 'react'
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import { IPayment } from '@/app/models/Payment.model';
import { IAccount } from '@/app/models/Account.model';
import { formatCurrency } from '@/app/utils/formatCurrency';
import { useRouter } from 'next/navigation';

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
    const handlePayment = (url: any) => {
        router.push(url)
    }
    const columns = [
        {
            title: 'Tên đối tác',
            dataIndex: 'partner',
            key: 'id',
            render: (partner: IAccount) => partner.first_name + ' ' + partner.last_name
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
    return (
        <Table
            dataSource={payments}
            columns={columns}
            loading={loading}
        />
    )
}
