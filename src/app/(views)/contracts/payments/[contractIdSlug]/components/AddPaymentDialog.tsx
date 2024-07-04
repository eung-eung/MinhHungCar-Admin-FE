import Diaglog from '@/app/components/Modal'
import { Button, Select } from 'antd'
import React, { SetStateAction, useState } from 'react'
import ArrowDropDownRoundedIcon from '@mui/icons-material/ArrowDropDownRounded';
import { Input } from '@/app/(views)/login/components/Input';
import { TextArea } from '@/app/(views)/login/components/TextArea';
import useAxiosAuth from '@/app/utils/hooks/useAxiosAuth';
import { sucessNotify } from '@/app/utils/toast';
import { IPayment } from '@/app/models/Payment.model';
export default function AddPaymentDialog(
    {
        setOpen,
        setRefresh,
        id
    }: {
        setOpen: React.Dispatch<SetStateAction<boolean>>,
        setRefresh: React.Dispatch<SetStateAction<boolean>>,
        id: any
    }) {
    const [paymentType, setPaymentType] = useState<any>()
    const [note, setNote] = useState<any>()
    const [amount, setAmount] = useState<any>()
    const axiosAuth = useAxiosAuth()
    const handleChange = (e: string) => {
        setPaymentType(e)
    }
    const handleCreatePayment = async () => {
        const response = await axiosAuth.post('/admin/customer_payment/generate_qr', {
            customer_payment_id: parseInt(id),
            payment_type: paymentType,
            amount: parseInt(amount),
            note,
            return_url: "http://localhost:3000/contracts/payments/" + id
        })
        if (response.status === 200) {
            sucessNotify("Thêm thành công")
            setRefresh(prev => !prev)
            setOpen(false)
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
                    options={[
                        { label: 'Khoản thanh toán còn lại', value: 'remaining_pay' },
                        { label: 'Hoàn trả tiền thế chấp', value: 'return_collateral_cash' },
                        { label: 'Khác', value: 'other' },
                    ]}
                />
            </div>

            <div className='flex  items-center justify-between mb-3'>
                <p>Số tiền</p>
                <Input
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
                <Button onClick={handleCreatePayment}>Tạo thanh toán</Button>
            </div>

        </div>
    )
}
