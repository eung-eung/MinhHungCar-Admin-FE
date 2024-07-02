import { IPayment } from '@/app/models/Payment.model'
import { Button, Table, TableProps } from 'antd'
import React from 'react'

export default function PaymentTable(
    {
        paymentList
    }: {
        paymentList: IPayment[]
    }
) {

    const column: TableProps<IPayment>['columns'] = [
        {
            title: "Loại thanh toán",
            dataIndex: "payment_type",
            key: "id"
        },
        {
            title: "Số tiền",
            dataIndex: "amount",
            key: "id"
        },
        {
            title: "Ghi chú",
            dataIndex: "note",
            key: "id"
        },
        {
            title: "Trạng thái",
            dataIndex: "status",
            key: "id"
        },
        {
            title: "Người thực hiện",
            dataIndex: "payer",
            key: "id"
        },
        {
            title: "",
            key: "id",
            render: (_, record) => <Button>Thanh toán</Button>
        },
    ]
    return (
        <Table
            columns={column}
            dataSource={paymentList}
        />
    )
}
