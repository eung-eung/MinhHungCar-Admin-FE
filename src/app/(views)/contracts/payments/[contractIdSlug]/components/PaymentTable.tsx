import { IPayment } from '@/app/models/Payment.model'
import { formatCurrency } from '@/app/utils/formatCurrency'
import { Button, Modal, Table, TableProps, Tag } from 'antd'
import React, { SetStateAction, useState } from 'react'
import { useTranslation } from 'react-i18next'
import RemoveIcon from '@mui/icons-material/Remove';
import useAxiosAuth from '@/app/utils/hooks/useAxiosAuth'
import { sucessNotify } from '@/app/utils/toast'
import { FloatingNav } from '@/app/components/FloatingNavbar'
import PlaylistRemoveRoundedIcon from '@mui/icons-material/PlaylistRemoveRounded';
import RefreshRoundedIcon from '@mui/icons-material/RefreshRounded';
const navItems = [
    {
        name: "Bỏ chọn tất cả",
        icon: <PlaylistRemoveRoundedIcon className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },

];
export default function PaymentTable(
    {
        listPayment,
        getPaymentUrl,
        setRefresh,
        loading,
        contractId,
        contractStatus
    }: {
        listPayment?: IPayment[],
        getPaymentUrl: (id: any) => void,
        setRefresh: React.Dispatch<SetStateAction<boolean>>,
        loading: boolean,
        contractId: any,
        contractStatus: any
    }
) {
    const { t } = useTranslation()
    const axiosAuth = useAxiosAuth()
    const [selectedKey, setSelectedRowKeys] = useState<React.Key[]>()
    const [selectedRowsState, setSelectedRowsState] = useState<IPayment[]>()
    const handleRemovePayment = async (id: any) => {

        const { confirm } = Modal
        confirm({
            title: 'Bạn có muốn xóa thanh toán này?',
            onOk: async () => {
                try {
                    const response = await axiosAuth.put('/admin/customer_payment/cancel', {
                        customer_payment_id: id,
                    })

                    if (response.status === 200) {
                        sucessNotify('Đã xóa thành công!')
                        setRefresh(prev => !prev)
                    }
                } catch (error) {

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
                        {
                            (
                                contractStatus === 'appraised_return_car'
                                || contractStatus === 'ordered'
                                || contractStatus === 'appraising_car_approved'
                                || contractStatus === 'pending_resolve'
                                || contractStatus === 'appraising_car_rejected'
                            )
                            &&
                            <Button
                                className='cursor-pointer'
                                onClick={() => getPaymentUrl(record.payment_url)}>
                                Thanh toán
                            </Button>
                        }
                        {
                            (contractStatus === 'appraised_return_car'
                                || (contractStatus === 'ordered'
                                    && record.payment_type === 'refund_pre_pay')
                                || (contractStatus === 'appraising_car_approved'
                                    && record.payment_type === 'refund_pre_pay'
                                )
                                || (contractStatus === 'appraising_car_rejected'
                                    && record.payment_type === 'refund_pre_pay')
                                || contractStatus === 'pending_resolve') &&
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
                        }
                    </div>

            }
        },

    ]

    const rowSelection = {
        onChange: (selectedRowKeys: React.Key[], selectedRows: IPayment[]) => {

            setSelectedRowsState(selectedRows)

            setSelectedRowKeys(selectedRowKeys)

        },
        getCheckboxProps: (record: IPayment) => {
            if (contractStatus === 'canceled'
                || contractStatus === 'resolved'
                || contractStatus === 'returned_car') {
                return ({
                    disabled: true
                })
            }
            if (contractStatus === 'renting') {
                return ({
                    disabled: true
                })
            }
            else {
                if (selectedRowsState && selectedRowsState.length > 0) {
                    const isSelectAdmin = selectedRowsState?.some(row => row.payer === 'admin')
                    if (isSelectAdmin) {
                        return ({
                            disabled: record.payer !== 'admin' || record.status === 'paid'
                        })
                    } else {
                        return ({
                            disabled: record.status === 'paid' || record.payer === 'admin'

                        })
                    }
                } else {
                    return ({
                        disabled: record.status === 'paid'
                    })
                }
            }
        },
        selectedRowKeys: selectedKey,
        hideSelectAll: true
    };
    return (
        <>
            <FloatingNav
                url='/admin/customer_payment/multiple/generate_qr'
                body={{
                    customer_payment_ids: selectedKey,
                    return_url: process.env.WEB_HOST_PUBLIC + '/contracts/payments/' + contractId
                }}
                selectedKey={selectedKey}
                navItems={navItems}
                setSelectedRowKeys={setSelectedRowKeys}
                setSelectedRowsState={setSelectedRowsState}
            />
            <Button
                size='middle'
                onClick={() => setRefresh(prev => !prev)}
                type='default'
                className='mr-5'>
                <RefreshRoundedIcon />
            </Button>
            <Table
                loading={loading}
                rowKey={(record) => record.id}
                rowSelection={{ ...rowSelection }}
                columns={column}
                dataSource={listPayment}
            />
        </>
    )
}
