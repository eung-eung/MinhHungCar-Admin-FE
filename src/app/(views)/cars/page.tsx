'use client'
import { Button, Dropdown, GetProp, Menu, MenuProps, Modal, Select, Switch, Table, TableProps, UploadFile, UploadProps } from 'antd'
import React, { ChangeEvent, useEffect, useState } from 'react'
import '../../globals.css'

import SearchInput from '@/app/components/SearchInput'

import ArrowDropDownRoundedIcon from '@mui/icons-material/ArrowDropDownRounded';
import TopFilterTable from '@/app/components/TopFilterTable'
import useAxiosAuth from '@/app/utils/hooks/useAxiosAuth'
import { ICar } from '@/app/models/Car.model'
import { TableParams } from '@/app/models/TableParams.model'
import CarTable from './components/CarTable'






export default function Cars() {
    const [filter, setFilter] = useState()
    const [carData, setCarData] = useState<ICar[]>([])
    const axiosAuth = useAxiosAuth()
    const [tableParams, setTableParams] = useState<TableParams>({
        pagination: {
            current: 1,
            pageSize: 10,
        },
    });
    const getCarList = async () => {
        const carList = await axiosAuth.get(
            '/admin/cars?status=pending_approval'
        )
        console.log(carList);

        setCarData(carList.data)
    }

    useEffect(() => {
        getCarList()


    }, [])

    // const carData = [
    //     {
    //         key: 1,
    //         brand: 'Audi',
    //         model: 'Audi 2023',
    //         carNumber: 'K1023021',
    //         price: 213123,
    //         owner: 'Nguyễn Văn Long'
    //     },
    //     {
    //         key: 2,
    //         brand: 'Toyoto',
    //         model: 'Inova cross',
    //         carNumber: 'K1023021',
    //         price: 213123,
    //         owner: 'Nguyễn Văn A'
    //     },
    //     {
    //         key: 3,
    //         brand: 'Toyoto',
    //         model: 'Inova cross',
    //         carNumber: 'K1023021',
    //         price: 213123,
    //         owner: 'Nguyễn Văn A'
    //     },
    //     {
    //         key: 4,
    //         brand: 'Toyoto',
    //         model: 'Inova cross',
    //         carNumber: 'K1023021',
    //         price: 213123,
    //         owner: 'Nguyễn Văn A'
    //     },
    //     {
    //         key: 5,
    //         brand: 'Toyoto',
    //         model: 'Inova cross',
    //         carNumber: 'K1023021',
    //         price: 213123,
    //         owner: 'Nguyễn Văn A'
    //     },

    // ]

    const handleSearch = () => {

    }

    const handleChange = (e: string) => {
        console.log(e);

    }



    return (
        <div>
            <TopFilterTable
                placeholder='Tìm kiếm theo họ và tên/email/số điện thoại'
                defaultValue='waiting'
                handleChange={handleChange}
                optionList={[
                    { label: 'Xe đang chờ duyệt', value: 'waiting' },
                    { label: 'Xe đã duyệt', value: 'approve' },
                    { label: 'Xe đang chờ giao', value: 'waitingPark' },
                    { label: 'Xe đang hoạt động', value: 'active' },
                ]}
                handleSearch={handleSearch}
            />
            <CarTable carData={carData} />
        </div>
    )
}
