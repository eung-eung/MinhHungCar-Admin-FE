'use client'
import { useEffect, useState } from 'react'
import '../../globals.css'
import TopFilterTable from '@/app/components/TopFilterTable'
import useAxiosAuth from '@/app/utils/hooks/useAxiosAuth'
import { ICar } from '@/app/models/Car.model'
import { TableParams } from '@/app/models/TableParams.model'
import CarTable from './components/CarTable'

export default function Cars() {
    const [filter, setFilter] = useState('pending_approval')
    const [carData, setCarData] = useState<ICar[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const axiosAuth = useAxiosAuth()
    const [tableParams, setTableParams] = useState<TableParams>({
        pagination: {
            current: 1,
            pageSize: 10,
        },
    });

    const getCarList = async (filter: any) => {
        setCarData([])
        setLoading(true)
        const carList = await axiosAuth.get(
            `/admin/cars?car_status=${filter}`
        )
        setCarData(carList.data)
        setLoading(false)

    }

    useEffect(() => {
        getCarList(filter)
    }, [filter])



    const handleSearch = () => {

    }

    const handleChange = (e: string) => {
        setFilter(e)

    }
    return (
        <div>
            <TopFilterTable
                placeholder='Tìm kiếm theo họ và tên/email/số điện thoại'
                defaultValue='pending_approval'
                handleChange={handleChange}
                optionList={[
                    { label: 'Xe đang chờ duyệt', value: 'pending_approval' },
                    { label: 'Xe đã duyệt', value: 'approved' },
                    { label: 'Xe đang chờ giao', value: 'waitingPark' },
                    { label: 'Xe đang hoạt động', value: 'active' },
                ]}
                handleSearch={handleSearch}
            />
            <CarTable
                loading={loading}
                carData={carData}
                filter={filter}
            />

        </div>
    )
}
