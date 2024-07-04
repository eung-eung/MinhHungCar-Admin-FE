'use client'

import { IPayment } from '@/app/models/Payment.model';
import useAxiosAuth from '@/app/utils/hooks/useAxiosAuth';
import { useEffect, useState } from 'react'
import PaymentTable from './components/PaymentTable';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { Button, Skeleton, Spin, Tag } from 'antd';
import Dialog from '@/app/components/Modal';
import AddPaymentDialog from './components/AddPaymentDialog';
import { ICustomerContract } from '@/app/models/CustomerContract';
import { formatCurrency } from '@/app/utils/formatCurrency';
import QRPaymentDialog from './components/QRPaymentDialog';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { errorNotify } from '@/app/utils/toast';
export default function PaymentDetail({
    params: { contractIdSlug }
}: {
    params: { contractIdSlug: any }
}) {
    const axiosAuth = useAxiosAuth()
    const [listPayment, setListPayment] = useState<IPayment[]>()
    const [open, setOpen] = useState<boolean>(false)
    const [openQr, setOpenQr] = useState<boolean>(false)
    const [refresh, setRefresh] = useState<boolean>(false)
    const [detail, setDetail] = useState<ICustomerContract>()
    const [loadingDetail, setLoadingDetail] = useState<boolean>(true)
    const [loadingQR, setloadingQR] = useState<boolean>(true)
    const [paymentUrl, setPaymentUrl] = useState<any>()
    const getPaymentDetailByContractId = async (id: any) => {
        const response = await axiosAuth.get('/admin/customer_payments?customer_contract_id=' + id)
        setListPayment(response.data.data)
    }

    const getPaymentUrl = async (url: any) => {
        setOpenQr(true)
        setloadingQR(true)

        console.log(url);

        setPaymentUrl(url)
        setloadingQR(false)
    }

    const handleCompletedContract = async (id: any) => {
        try {
            const resposne = await axiosAuth.put('/admin/contract/complete', {
                customer_contract_id: parseInt(id)
            })
        } catch (error: any) {
            if (error.response.data.error_code === 10064) {
                errorNotify("Vui lòng thanh toán hết các khoản")
            }
        }
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
            <div className='flex justify-between items-start mb-5'>
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
                    <div className='flex flex-col'>
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
                        <Button
                            onClick={handleModal}
                            type='default'
                            style={{ width: "fit-content" }}
                        >
                            <AddCircleOutlineOutlinedIcon />
                            <p>Thêm khoản thanh toán</p>
                        </Button>
                    </div>
                </div>
                <div className='w-1/2 text-end'>
                    <button
                        style={{ color: '#fff', padding: '7px 20px', outline: 'none', border: 'none' }}
                        className="inline-flex 
                     
                    animate-shimmer 
                    items-center 
                    justify-center 
                    rounded-md border 
                    border-slate-800 bg-[linear-gradient(110deg,#ff6E00,45%,#ffc89e,55%,#ff6E00)]
                     bg-[length:200%_100%] 
                    font-medium 
                     text-slate-400 
                     transition-colors 
                     focus:outline-none 
                     focus:ring-offset-2 focus:ring-offset-slate-50"
                        onClick={() => handleCompletedContract(contractIdSlug)}
                    >
                        Hoàn thành hợp đồng
                        <ArrowForwardIosIcon sx={{ color: '#fff', fontSize: 16, marginLeft: 2 }} />
                    </button>
                </div>
            </div>
            <PaymentTable
                getPaymentUrl={getPaymentUrl}
                listPayment={listPayment}
                setRefresh={setRefresh}
            />
            <Dialog
                loading={false}
                open={open}
                setOpen={setOpen}
                title="Tạo khoản thanh toán mới cho chuyến đi"
                width='50%'
            >
                <AddPaymentDialog
                    setOpen={setOpen}
                    id={contractIdSlug}
                    setRefresh={setRefresh}
                />
            </Dialog>

            <Dialog
                loading={loadingQR}
                open={openQr}
                setOpen={setOpenQr}
                title="Thanh toán chuyến đi"
                width='50%'
            >
                <QRPaymentDialog
                    setOpen={setOpenQr}
                    id={contractIdSlug}
                    setRefresh={setRefresh}
                    paymentUrl={paymentUrl}
                />
            </Dialog>
        </div>
    )
}
