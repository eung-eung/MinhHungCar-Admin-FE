'use client'
import useAxiosAuth from '@/app/utils/hooks/useAxiosAuth'
import { errorNotify, sucessNotify } from '@/app/utils/toast'
import { Button, Flex, Input, InputNumber, Select } from 'antd'
import React, { SetStateAction, useState } from 'react'
const years = [
    2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024
]
const seats = [4, 7, 15]
export default function CreateBrandDialog({
    setOpen,
    setCurrentPage,
    setRefresh
}: {
    setOpen: React.Dispatch<SetStateAction<any>>,
    setCurrentPage: React.Dispatch<SetStateAction<any>>,
    setRefresh: React.Dispatch<SetStateAction<any>>
}) {
    const [brand, setBrand] = useState<any>('')
    const [model, setModel] = useState<any>('')
    const [price, setPrice] = useState<any>(0)
    const [year, setYears] = useState<any>(2024)
    const [seat, setSeat] = useState<any>(4)
    const axiosAuth = useAxiosAuth()
    const onChangeBrand = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBrand(e.target.value)
    }
    const onChangeSeat = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSeat(e)
    }

    const onChangeModel = (e: React.ChangeEvent<HTMLInputElement>) => {
        setModel(e.target.value)
    }
    const onChangePrice = (e: any) => {
        setPrice(e)
    }

    const onChangeYear = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setYears(e)
    }
    const handleCreateBrands = async () => {
        if ((model.trim().length < 1) || (brand.trim().length < 1)) {
            errorNotify("Vui lòng điền đầy đủ thông tin")
            return
        }
        if (price < 100000) {
            errorNotify("Số tiền phải trên 100.000đ")
            return
        }
        try {
            const response = await axiosAuth.post('/admin/car_model', {
                brand: brand.charAt(0).toUpperCase() + brand.slice(1),
                model: model.charAt(0).toUpperCase() + model.slice(1),
                year: year,
                number_of_seats: seat,
                based_price: price
            })
            sucessNotify("Thêm thành công")
            setBrand('')
            setModel('')
            setPrice(0)
            setOpen(false)
            setCurrentPage(1)
            setRefresh((prev: any) => !prev)
        } catch (error) {
            console.log(error);

        }

    }
    return (
        <div>
            <div className=' mt-4'>
                <p className='mr-4 font-medium'>Hãng</p>
                <Input onChange={onChangeBrand} value={brand} />
            </div>
            <div className=' mt-4'>
                <p className='mr-4 font-medium'>Mẫu</p>
                <Input onChange={onChangeModel} value={model} />
            </div>
            <Flex justify='space-between'>
                <div className=' mt-4'>
                    <p className='w-10 mr-4  font-medium'>Năm</p>
                    <Select
                        onChange={onChangeYear}
                        defaultValue={year}
                        options={
                            years.map((value, index) => (
                                { value: value, label: value }))
                        }
                    />
                </div>
                <div className=' mt-4'>
                    <p className='font-medium mr-4'>Số chỗ</p>
                    <Select
                        onChange={onChangeSeat}
                        defaultValue={seat}
                        options={
                            seats.map((value, index) => (
                                { value: value, label: value }))
                        }
                    />
                </div>
                <div className=' mt-4'>
                    <p className='font-medium mr-4'>Giá tiền</p>
                    <InputNumber<number>
                        style={{
                            width: "200px"
                        }}
                        value={price}
                        formatter={(value) => `${value}đ`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        parser={(value) => value?.replace(/\đ\s?|(,*)/g, '') as unknown as number}
                        onChange={onChangePrice}
                    />
                </div>
            </Flex>
            <Button onClick={handleCreateBrands} className='mt-4 w-1/5'>Thêm</Button>

        </div >
    )
}
