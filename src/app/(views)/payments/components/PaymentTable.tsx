import { Button, Table, Tag } from 'antd'
import React from 'react'
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
export default function PaymentTable() {

    const data = [
        {
            id: 0,
            car_owner: "AAAAA asdadsasd",
            bank_number: '12312312323',
            from: "12/05/2024",
            to: "12/10/2024",
            price: 131231,
            status: 'Chưa thanh toán'
        },
        {
            id: 1,
            car_owner: "AAAAA asdadsasd",
            bank_number: '12312312323',
            from: "12/05/2024",
            to: "12/10/2024",
            price: 131231,
            status: 'Chưa thanh toán'
        },
        {
            id: 2,
            car_owner: "AAAAA asdadsasd",
            bank_number: '12312312323',
            from: "12/05/2024",
            to: "12/10/2024",
            price: 131231,
            status: 'Chưa thanh toán'
        },
        {
            id: 3,
            car_owner: "AAAAA asdadsasd",
            bank_number: '12312312323',
            from: "12/05/2024",
            to: "12/10/2024",
            price: 131231,
            status: 'Đã thanh toán'
        }
    ]

    const columns = [
        {
            title: 'Tên chủ xe',
            dataIndex: 'car_owner',
            key: 'id'
        },
        {
            title: 'Tài khoản ngân hàng',
            dataIndex: 'bank_number',
            key: 'id'
        },
        {
            title: 'Từ ngày',
            dataIndex: 'from',
            key: 'id'
        },
        {
            title: 'Đến ngày',
            dataIndex: 'car_owner',
            key: 'id'
        },
        {
            title: 'Số tiền',
            dataIndex: 'price',
            key: 'id'
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'id',
            render: (status: any) => status === 'Chưa thanh toán'
                ?
                <CancelOutlinedIcon sx={{ color: 'red' }} />
                :
                <CheckCircleOutlineOutlinedIcon sx={{ color: 'green' }} />
        },
        {
            title: '',
            dataIndex: 'action',
            key: 'id',
            render: () =>
                <Button >Thanh toán</Button>
        },
    ]
    return (
        <Table
            dataSource={data}
            columns={columns}
        />
    )
}
