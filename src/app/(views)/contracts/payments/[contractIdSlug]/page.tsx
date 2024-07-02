'use client'

import { IPayment } from '@/app/models/Payment.model';
import useAxiosAuth from '@/app/utils/hooks/useAxiosAuth';
import { useEffect, useState } from 'react'
import PaymentTable from './components/PaymentTable';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { Button, Skeleton, Spin, Tag } from 'antd';
import Diaglog from '@/app/components/Modal';
import AddPaymentDialog from './components/AddPaymentDialog';
import { ICustomerContract } from '@/app/models/CustomerContract';
import { formatCurrency } from '@/app/utils/formatCurrency';

export default function PaymentDetail({
    params: { contractIdSlug }
}: {
    params: { contractIdSlug: any }
}) {
    const axiosAuth = useAxiosAuth()
    const [listPayment, setListPayment] = useState<IPayment[]>()
    const [open, setOpen] = useState<boolean>(false)
    const [refresh, setRefresh] = useState<boolean>(false)
    const [detail, setDetail] = useState<ICustomerContract>()
    const [loadingDetail, setLoadingDetail] = useState<boolean>(true)

    const getPaymentDetailByContractId = async (id: any) => {
        const response = await axiosAuth.get('/admin/customer_payments?customer_contract_id=' + id)
        setListPayment(response.data.data)
    }
    const getCustomerContractDetailById = async (id: any) => {
        setLoadingDetail(true)
        const response = await axiosAuth.get('/admin/contract/' + id)
        setDetail(response.data.data)
        setLoadingDetail(false)
    }
    useEffect(() => {
        getPaymentDetailByContractId(contractIdSlug)
    }, [contractIdSlug, refresh])

    useEffect(() => {
        getCustomerContractDetailById(contractIdSlug)
    }, [contractIdSlug])
    const handleModal = () => {
        setOpen(true)
    }

    return (
        <div className='mt-10'>
            <div className='flex justify-between items-end'>
                <div>
                    <p className='font-bold'>
                        {
                            'Các khoản thanh toán của chuyến đi xe '
                            + detail?.car.car_model.brand
                            + ' '
                            + detail?.car.car_model.model
                            + ' '
                            + detail?.car.car_model.year
                        }

                    </p>
                    <div className='mt-5'>
                        <Tag
                            style={{ width: 80, textAlign: 'center' }}
                            color='cyan'
                        >
                            Khách hàng
                        </Tag>
                        {
                            loadingDetail
                                ?
                                <Skeleton.Button
                                    active={true}
                                    size='default'
                                    shape='round'
                                    block={false}
                                />
                                :
                                <span
                                    style={{
                                        color: '#797979',
                                        fontWeight: 600,
                                        fontSize: 14
                                    }}
                                >
                                    {
                                        detail?.customer.last_name
                                        + ' '
                                        + detail?.customer.first_name}
                                </span>
                        }
                    </div>
                    <div className='mt-5 mb-4'>
                        <Tag
                            style={{ width: 80, textAlign: 'center', fontSize: 14 }}
                            color='purple'
                        >
                            Phí thuê xe
                        </Tag>
                        {
                            loadingDetail ?
                                <Skeleton.Button active={true} size='small' shape='round' block={false} />
                                :

                                <span
                                    style={{
                                        color: '#797979',
                                        fontWeight: 600,
                                    }}
                                >
                                    {formatCurrency(detail?.rent_price)}
                                </span>
                        }
                    </div>
                </div>


                <Button
                    onClick={handleModal}
                    type='primary'
                    className='mb-5'
                >
                    <AddCircleOutlineOutlinedIcon />
                    <p>Thêm khoản thanh toán</p>
                </Button>
            </div>
            <PaymentTable
                listPayment={listPayment}
            />
            <Diaglog
                loading={false}
                open={open}
                setOpen={setOpen}
                title="Tạo khoản thanh toán mới cho chuyến đi"
                width='50%'
                key={1}
            >
                <AddPaymentDialog
                    setOpen={setOpen}
                    id={contractIdSlug}
                    setRefresh={setRefresh}
                />
            </Diaglog>
        </div>
    )
}
