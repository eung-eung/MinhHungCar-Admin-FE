import { IPayment } from '@/app/models/Payment.model'
import { formatCurrency } from '@/app/utils/formatCurrency'
import { Button, Table, TableProps, Tag } from 'antd'
import React from 'react'
import { useTranslation } from 'react-i18next'

export default function PaymentTable(
    {
        listPayment
    }: {
        listPayment?: IPayment[]
    }
) {
    const { t } = useTranslation()
    const column: TableProps<IPayment>['columns'] = [
        {
            title: "Loại thanh toán",
            dataIndex: "payment_type",
            key: "id",
            render: (payment) => t(`common:${payment}`)
        },
        {
            title: "Số tiền",
            dataIndex: "amount",
            key: "id",
            render: (amount) => formatCurrency(amount)
        },
        {
            title: "Ghi chú",
            dataIndex: "note",
            key: "id"
        },
        {
            title: "Trạng thái",
            dataIndex: "status",
            key: "id",
            render: (status) => t(`common:${status}`)
        },
        {
            title: "Người thực hiện",
            dataIndex: "payer",
            key: "id",
            render: (payer) => t(`common:${payer}`)
        },
        {
            title: "",
            key: "id",
            render: (_, record) => record.status === 'paid' ?
                <Tag color='green'>Đã thanh toán</Tag>
                : <Button>Thanh toán</Button>
        },
    ]

    const rowSelection = {
        onChange: (selectedRowKeys: React.Key[], selectedRows: IPayment[]) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        getCheckboxProps: (record: IPayment) => ({
            disabled: record.payer === 'customer',
            //   name: record.name,
        }),
    };
    return (
        <Table
            rowKey={(record) => record.id}
            rowSelection={{
                ...rowSelection,
            }}
            columns={column}
            dataSource={listPayment}
        />
    )
}
