import { IPayment } from '@/app/models/Payment.model'
import { formatCurrency } from '@/app/utils/formatCurrency'
import { Button, Modal, Table, TableProps, Tag } from 'antd'
import React, { SetStateAction } from 'react'
import { useTranslation } from 'react-i18next'
import RemoveIcon from '@mui/icons-material/Remove';
import useAxiosAuth from '@/app/utils/hooks/useAxiosAuth'
import { sucessNotify } from '@/app/utils/toast'
export default function PaymentTable(
    {
        listPayment,
        getPaymentUrl,
        setRefresh,
        loading
    }: {
        listPayment?: IPayment[],
        getPaymentUrl: (id: any) => void,
        setRefresh: React.Dispatch<SetStateAction<boolean>>,
        loading: boolean
    }
) {
    const { t } = useTranslation()
    const axiosAuth = useAxiosAuth()
    const handleRemovePayment = async (id: any) => {

        const { confirm } = Modal
        confirm({
            title: 'Bạn có muốn xóa thanh toán này?',
            onOk: async () => {
                const response = await axiosAuth.put('/admin/customer_payment/cancel', {
                    customer_payment_id: id,
                })

                if (response.status === 200) {
                    sucessNotify('Đã xóa thành công!')
                    setRefresh(prev => !prev)
                }
            },
            onCancel: () => {

            }
        })

    }
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
            render: (_, record) => {
                return record.status === 'paid' ?
                    <Tag color='green'>Đã thanh toán</Tag>
                    : <div className='flex items-center justify-between'>
                        <Button
                            className='cursor-pointer'
                            onClick={() => getPaymentUrl(record.payment_url)}>
                            Thanh toán
                        </Button>
                        <Button
                            style={{
                                background: "#fff",
                                border: '1px solid red',
                                color: "red"
                            }}
                            onClick={() => handleRemovePayment(record.id)}
                            className='cursor-pointer'
                            color='red-inverse'><RemoveIcon />
                        </Button>
                    </div>

            }
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
            loading={loading}
            rowKey={(record) => record.id}
            rowSelection={{
                ...rowSelection,
            }}
            columns={column}
            dataSource={listPayment}
        />
    )
}
