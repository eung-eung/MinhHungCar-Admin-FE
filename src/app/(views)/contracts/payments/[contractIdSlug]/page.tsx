'use client'

import { IPayment } from '@/app/models/Payment.model';
import useAxiosAuth from '@/app/utils/hooks/useAxiosAuth';
import { useEffect, useState } from 'react'
import PaymentTable from './components/PaymentTable';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { Button, ConfigProvider, Modal, Skeleton, Spin, Switch, Tag } from 'antd';
import Dialog from '@/app/components/Modal';
import AddPaymentDialog from './components/AddPaymentDialog';
import { ICustomerContract } from '@/app/models/CustomerContract';
import { formatCurrency } from '@/app/utils/formatCurrency';
import QRPaymentDialog from './components/QRPaymentDialog';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { errorNotify, sucessNotify } from '@/app/utils/toast';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';

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
    const [loadingPayment, setLoadingPayment] = useState<boolean>(true)
    const [loadingAddPaymentDialog, setLoadingAddPaymentDialog] = useState<boolean>(true)
    const [paymentUrl, setPaymentUrl] = useState<any>()
    const [options, setOptions] = useState<any>()
    const [checked, setChecked] = useState<boolean>()
    const [loadingUpdate, setLoadingUpdate] = useState<boolean>(true)
    const getPaymentDetailByContractId = async (id: any) => {
        setLoadingPayment(true)
        const response = await axiosAuth.get('/admin/customer_payments?customer_contract_id=' + id)
        setListPayment(response.data.data)
        setLoadingPayment(false)

    }

    const getPaymentUrl = async (url: any) => {
        setOpenQr(true)
        // setloadingQR(true)
        setPaymentUrl(url)
        setloadingQR(false)
    }

    const handleCompletedContract = async (id: any) => {
        const { confirm } = Modal
        confirm({
            title: "Bạn có muốn hoàn thành hợp đồng này?",
            onOk: async () => {
                if (!checked && detail?.collateral_type === 'motorbike') {
                    errorNotify("Vui lòng hoàn trả thế chấp")
                    return
                }
                if (detail?.collateral_type === 'cash') {
                    const list = listPayment?.filter(payment =>
                        (payment.payment_type === "remaining_pay" && payment.status === 'paid')
                        || (payment.payment_type === "return_collateral_cash" && payment.status === 'paid')
                    )
                    if (list && list?.length < 2) {
                        console.log('list: ', list);
                        errorNotify("Khoản thanh toán còn lại hoặc tiền thế chấp chưa được xử lí")
                        return
                    }
                } else if (detail?.collateral_type === 'motorbike') {
                    const list = listPayment?.filter(payment =>
                        (payment.payment_type === "remaining_pay" && payment.status === 'paid')
                    )
                    if (list && list.length < 1 && !checked) {
                        errorNotify("Khoản thanh toán còn lại hoặc xe thế chấp chưa được xử lí")
                        return
                    }
                }
                try {
                    const resposne = await axiosAuth.put('/admin/contract/complete', {
                        customer_contract_id: parseInt(id)
                    })
                    if (resposne.status === 200) {
                        sucessNotify("Cập nhật thành công!")
                        setRefresh(prev => !prev)
                    }
                } catch (error: any) {
                    if (error.response.data.error_code === 10064) {
                        errorNotify("Vui lòng thanh toán hết các khoản")
                    }
                }
            }
        })


    }

    const getCustomerContractDetailById = async (id: any) => {
        setLoadingDetail(true)
        setLoadingUpdate(true)
        const response = await axiosAuth.get('/admin/contract/' + id)
        setDetail(response.data.data)
        setLoadingDetail(false)
        setChecked(response.data.data.is_return_collateral_asset)
        setLoadingUpdate(false)
    }
    useEffect(() => {
        getPaymentDetailByContractId(contractIdSlug)
    }, [contractIdSlug, refresh])

    useEffect(() => {
        getCustomerContractDetailById(contractIdSlug)
    }, [contractIdSlug, refresh])

    const handleUpdateReturnCollateralAsset = async (id: any) => {
        const { confirm } = Modal
        confirm({
            title: 'Bạn có muốn thay đổi?',
            cancelText: "Hủy",
            onOk: async () => {
                try {
                    setLoadingUpdate(true)
                    const response = await axiosAuth.put('/admin/update_is_return_collateral_asset', {
                        customer_contract_id: parseInt(id),
                        new_status: !checked
                    })
                    if (response.status === 200) {
                        setChecked(!checked)
                    }
                    setLoadingUpdate(false)
                } catch (error) {
                    setChecked(false)
                    setLoadingUpdate(false)
                }
            },
            onCancel: () => {

            }
        })


    }

    const handleModal = async (id: any) => {
        setOpen(true)
        setLoadingAddPaymentDialog(true)
        const resposne = await axiosAuth.get('/admin/contract/' + id)
        const data: ICustomerContract = resposne.data.data
        const isExistRemainingPayment = listPayment?.some((payment: IPayment) => payment.payment_type === "remaining_pay")
        const isExistReturnCollateralCashPayment = listPayment?.some((payment: IPayment) => payment.payment_type === "return_collateral_cash")

        if (data.collateral_type === 'cash') {
            (isExistRemainingPayment && isExistReturnCollateralCashPayment) &&
                setOptions([
                    { label: 'Khác', value: 'other' },
                ]);
            (!isExistRemainingPayment && !isExistReturnCollateralCashPayment) &&
                setOptions([
                    { label: 'Khoản thanh toán còn lại', value: 'remaining_pay' },
                    { label: 'Hoàn trả tiền thế chấp', value: 'return_collateral_cash' },
                    { label: 'Khác', value: 'other' },
                ]);
            (!isExistRemainingPayment && isExistReturnCollateralCashPayment) &&
                setOptions([
                    { label: 'Khoản thanh toán còn lại', value: 'remaining_pay' },
                    { label: 'Khác', value: 'other' },
                ]);
            (isExistRemainingPayment && !isExistReturnCollateralCashPayment) &&
                setOptions([
                    { label: 'Hoàn trả tiền thế chấp', value: 'return_collateral_cash' },
                    { label: 'Khác', value: 'other' },
                ]);
        }
        if (data.collateral_type === 'motorbike') {
            isExistRemainingPayment &&
                setOptions([
                    { label: 'Khác', value: 'other' },
                ]);
            !isExistRemainingPayment &&
                setOptions([
                    { label: 'Khoản thanh toán còn lại', value: 'remaining_pay' },
                    { label: 'Khác', value: 'other' }
                ]);
        }
        setLoadingAddPaymentDialog(false)
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
                                style={{ width: 100, textAlign: 'center', fontSize: 14 }}
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
                                style={{ width: 100, textAlign: 'center', fontSize: 14 }}
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
                        {
                            detail?.collateral_type === 'motorbike'
                            &&
                            <div>
                                <Tag
                                    style={{ textAlign: 'center', fontSize: 14, marginBottom: 20 }}
                                    color='green'>
                                    Hoàn trả thế chấp
                                </Tag>
                                <ConfigProvider
                                    theme={{
                                        token: {
                                            colorPrimary: "#4cb863"
                                        },
                                    }}
                                >
                                    <Switch
                                        disabled={detail.status === 'completed' ? true : false}
                                        checked={checked}
                                        onChange={() => handleUpdateReturnCollateralAsset(detail?.id)}
                                        loading={loadingUpdate}
                                    />

                                </ConfigProvider>
                            </div>
                        }
                        {
                            detail?.status === 'renting'
                            &&
                            <Button
                                onClick={() => handleModal(detail.id)}
                                type='default'
                                style={{ width: "fit-content" }}
                            >
                                <AddCircleOutlineOutlinedIcon />
                                <p>Thêm khoản thanh toán</p>
                            </Button>
                        }

                    </div>

                </div>
                <div className='w-1/2 text-end flex flex-col items-end'>
                    {
                        detail?.status === 'completed'
                        &&
                        <button
                            style={{
                                color: '#fff',
                                padding: '7px 20px',
                                outline: 'none',
                                border: 'none',
                                cursor: 'auto'
                            }}
                            className="inline-flex 
                    animate-shimmer 
                    items-center 
                    justify-center 
                    rounded-md border 
                    border-slate-800 bg-[linear-gradient(110deg,#33bf4e,45%,#60ff7e,55%,#33bf4e)]
                     bg-[length:200%_100%] 
                    font-medium 
                     text-slate-400 
                     transition-colors 
                     focus:outline-none 
                     focus:ring-offset-2 focus:ring-offset-slate-50"
                        >
                            Đã hoàn thành
                            <CheckOutlinedIcon sx={{ color: '#fff', fontSize: 16, marginLeft: 2 }} />
                        </button>
                    }
                    {
                        detail?.status === 'renting'
                        &&
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
                            <ArrowForwardIosIcon
                                sx={{ color: '#fff', fontSize: 16, marginLeft: 2 }}
                            />
                        </button>
                    }
                </div>
            </div>
            <PaymentTable
                loading={loadingPayment}
                getPaymentUrl={getPaymentUrl}
                listPayment={listPayment}
                setRefresh={setRefresh}
            />
            <Dialog
                loading={loadingAddPaymentDialog}
                open={open}
                setOpen={setOpen}
                title="Tạo khoản thanh toán mới cho chuyến đi"
                width='50%'
            >
                <AddPaymentDialog
                    listPayment={listPayment}
                    detail={detail}
                    options={options}
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
        </div >
    )
}
