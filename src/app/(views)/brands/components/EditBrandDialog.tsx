'use client'
import useAxiosAuth from '@/app/utils/hooks/useAxiosAuth'
import { errorNotify, sucessNotify } from '@/app/utils/toast'
import { Button, InputNumber } from 'antd'
import React, { SetStateAction } from 'react'

export default function EditBrandDialog(
    {
        setOpen,
        setRefresh,
        value,
        setValue
    }: {
        setOpen: React.Dispatch<SetStateAction<boolean>>
        setRefresh: React.Dispatch<SetStateAction<boolean>>,
        setValue: React.Dispatch<SetStateAction<any>>,
        value: any
    }
) {
    const axiosAuth = useAxiosAuth()
    const handleChangePrice = (e: any) => {
        setValue((prev: any) => ({
            ...prev,
            currentPrice: e
        }))
    }

    const handleUpdatePrice = async () => {
        console.log(value.id);
        console.log(value.currentPrice);
        if (value.currentPrice <= 100000) {
            errorNotify("Số tiền phải hơn 100.000đ")
            return
        }
        try {
            const response = await axiosAuth.put("/admin/car_model", {
                car_model_id: parseInt(value.id),
                based_price: value.currentPrice
            })

            if (response.status === 200) {
                sucessNotify("Cập nhật giá thành công")
                setRefresh((prev: boolean) => !prev)
                setOpen(false)
            }
        } catch (error) {
            console.log('error: ', error);
            errorNotify("Có lỗi xảy ra, vui lòng thử lại")

        }
    }

    return (
        <div>
            <div className=' mt-4 flex'>
                {/* <p className='font-medium mr-4'>Giá tiền</p> */}
                <InputNumber<number>
                    style={{
                        width: "200px"
                    }}
                    value={value.currentPrice}
                    formatter={(value) => `${value}đ`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    parser={(value) => value?.replace(/\đ\s?|(,*)/g, '') as unknown as number}
                    onChange={handleChangePrice}
                />
            </div>
            <Button
                onClick={handleUpdatePrice}
                className='mt-4'>Cập nhật</Button>
        </div>
    )
}
