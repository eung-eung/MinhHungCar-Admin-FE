import Diaglog from '@/app/components/Modal'
import { Button, Select } from 'antd'
import React, { SetStateAction, useEffect, useState } from 'react'
import ArrowDropDownRoundedIcon from '@mui/icons-material/ArrowDropDownRounded';
import { Input } from '@/app/(views)/login/components/Input';
import { TextArea } from '@/app/(views)/login/components/TextArea';
import useAxiosAuth from '@/app/utils/hooks/useAxiosAuth';
import { errorNotify, sucessNotify } from '@/app/utils/toast';
import { IPayment } from '@/app/models/Payment.model';
import { ICustomerContract } from '@/app/models/CustomerContract';
import { formatCurrency } from '@/app/utils/formatCurrency';



export default function AddPaymentDialog(
    {
        setOpen,
        setRefresh,
        options,
        id,
        detail,
        listPayment
    }: {
        setOpen: React.Dispatch<SetStateAction<boolean>>,
        setRefresh: React.Dispatch<SetStateAction<boolean>>,
        options: any,
        id: any,
        detail?: ICustomerContract,
        listPayment?: IPayment[]
    }) {
    const [paymentType, setPaymentType] = useState<any>()
    const [note, setNote] = useState<any>()
    const [amount, setAmount] = useState<any>()
    const [disabled, setDisabled] = useState<boolean>(false)
    const [disabledBtn, setDisabledBtn] = useState<boolean>(true)
    const axiosAuth = useAxiosAuth()
    useEffect(() => {
        if (!amount || !paymentType) {
            setDisabledBtn(true)
        } else {
            setDisabledBtn(false)
        }
    }, [amount, paymentType])
    const handleChange = (e: string) => {
        setPaymentType(e)
        setAmount('')
        if (e === 'remaining_pay' && detail?.rent_price) {
            setDisabled(true)
            setAmount(detail.rent_price - (detail?.rent_price + detail?.insurance_amount) * 30 / 100)
            return
        }
        if (e === 'return_collateral_cash' && detail?.collateral_cash_amount) {
            setDisabled(true)
            setAmount(detail?.collateral_cash_amount)
            return
        }
        setDisabled(false)
    }

    const handleCreatePayment = async () => {
        try {
            const response = await axiosAuth.post('/admin/customer_payment/generate_qr', {
                customer_contract_id: parseInt(id),
                payment_type: paymentType,
                amount: parseInt(amount),
                note,
                return_url: `${process.env.WEB_HOST_PUBLIC}/contracts/payments/${id}`
            })
            if (response.status === 200) {
                sucessNotify("Thêm thành công")
                setRefresh(prev => !prev)
                setOpen(false)
            }
        } catch (error: any) {
            errorNotify(error.response.data)
        }


    }
    const handleChangeAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAmount(e.target.value)
    }
    const handleChangeNote = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setNote(e.target.value)
    }
    return (
        <div>
            <div className='flex items-center justify-between mb-3'>
                <p>Chọn loại thanh toán</p>
                <Select
                    onChange={handleChange}
                    style={{
                        width: '200px'
                    }}
                    suffixIcon={<ArrowDropDownRoundedIcon sx={{ color: '#6C69FF' }} />}
                    variant='outlined'
                    placeholder='Chọn loại thanh toán'
                    options={options}
                />
            </div>

            <div className='flex  items-center justify-between mb-3'>
                <p>Số tiền</p>
                <Input
                    disabled={disabled}
                    type='number'
                    onChange={handleChangeAmount}
                    onKeyDown={(evt) => ["e", "E", "+", "-"].includes(evt.key) && evt.preventDefault()}
                    value={amount}
                    style={{ width: 200 }}
                    placeholder='Nhập số tiền' />
            </div>
            <div className='flex  items-center justify-between mb-3'>
                <p>Ghi chú</p>
                <TextArea
                    value={note}
                    onChange={handleChangeNote}
                    style={{ width: 300 }}
                    placeholder='Vui lòng thêm ghi chú của bạn'
                />
            </div>
            <div className='flex  items-center justify-center mt-10'>
                <p></p>
                <Button
                    disabled={disabledBtn}
                    type='primary'
                    onClick={handleCreatePayment}
                >Tạo thanh toán</Button>
            </div>

        </div>
    )
}
