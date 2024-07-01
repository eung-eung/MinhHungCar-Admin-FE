'use client'
import { ChangeEvent, useEffect, useState } from 'react'
import '../../globals.css'
import TopFilterTable from '@/app/components/TopFilterTable'
import useAxiosAuth from '@/app/utils/hooks/useAxiosAuth'
import { ICar } from '@/app/models/Car.model'
import { TableParams } from '@/app/models/TableParams.model'
import CarTable from './components/CarTable'
import { removeKeys } from '@/app/utils/removeKeysFromObject'
import { Flex, Skeleton, Tag } from 'antd'

export default function Cars() {
    const axiosAuth = useAxiosAuth()
    const [filter, setFilter] = useState('pending_approval')
    const [carData, setCarData] = useState<ICar[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [refresh, setRefresh] = useState<boolean>(true)
    const [loadingCurrentSeats, setLoadingCurrentSeats] = useState<boolean>(true)
    const [searchValue, setSearchValue] = useState<string>()
    const [currentSeats, setCurrentSeats] = useState<any>()
    const keyToRemove = ["max_4_seats", "max_7_seats", "max_15_seats", "total"]
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
        setCarData(carList.data.data.cars)
        setLoading(false)
    }

    const getCurrentSeats = async () => {
        setLoadingCurrentSeats(true)
        const currentSeats = await axiosAuth.get('/admin/garage_config')
        const filterData = removeKeys(currentSeats.data.data, keyToRemove)
        setCurrentSeats(filterData)
        setLoadingCurrentSeats(false)

    }

    useEffect(() => {
        if (!searchValue) {
            getCarList(filter)
            return
        }
        const getData = setTimeout(async () => {
            setLoading(true)
            const query = `admin/cars?car_status=${filter}&search_param=${searchValue}&offset=0&limit=100`
            const getCarsBySearch = await axiosAuth.get(query)
            setCarData(getCarsBySearch.data.data.cars)
            setLoading(false)
        }, 1000)
        return () => clearTimeout(getData)
    }, [filter, refresh, searchValue])

    useEffect(() => {
        getCurrentSeats()
    }, [refresh])

    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value)
    }

    const handleChange = (e: string) => {
        setFilter(e)
        setSearchValue('')
    }
    return (
        <div>
            <TopFilterTable
                searchValue={searchValue}
                setRefresh={setRefresh}
                showSearch={true}
                placeholder='Tìm kiếm theo họ và tên/email/số điện thoại'
                defaultValue='pending_approval'
                handleChange={handleChange}
                optionList={[
                    { label: 'Xe đang chờ duyệt', value: 'pending_approval' },
                    { label: 'Xe đã duyệt', value: 'approved' },
                    { label: 'Xe đang chờ giao', value: 'waiting_car_delivery' },
                    { label: 'Xe đang hoạt động', value: 'active' },
                ]}
                handleSearch={handleSearch}
                showGarageConfig={true}
            />
            <div className='mb-5'>
                <Flex gap="4px 0" wrap justify='end'>
                    {loadingCurrentSeats ? <Skeleton.Input active size='small' />
                        : <>
                            <Tag color="blue" style={{ fontWeight: 500 }}>
                                <p>Số xe 4 chỗ đã có ở bãi đỗ: {currentSeats.current_4_seats}</p>
                            </Tag>
                            <Tag color="geekblue" style={{ fontWeight: 500 }}>
                                <p>Số xe 7 chỗ đã có ở bãi đỗ: {currentSeats.current_7_seats}</p>
                            </Tag>
                            <Tag color="purple" style={{ fontWeight: 500 }}>
                                <p>Số xe 15 chỗ đã có ở bãi đỗ: {currentSeats.current_15_seats}</p>
                            </Tag>
                        </>
                    }

                </Flex>
            </div>
            <CarTable
                loading={loading}
                carData={carData}
                filter={filter}
                setRefresh={setRefresh}
            />

        </div>
    )
}
