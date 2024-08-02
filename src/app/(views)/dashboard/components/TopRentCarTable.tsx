'use client'
import useAxiosAuth from '@/app/utils/hooks/useAxiosAuth'
import { Table, TableProps } from 'antd'
import React, { useEffect, useState } from 'react'
type ICarItem = {
    car_brand_model: any,
    count: number
}
export default function TopRentCarTable() {
    const [data, setData] = useState<ICarItem[]>()
    const axiosAuth = useAxiosAuth()
    const getData = async () => {
        try {
            const response = await axiosAuth.get('/admin/statistic?total_customer_contracts_back_off_day=1&total_active_partners_back_off_day=1&total_active_customers_back_off_day=1&revenue_back_off_day=5&rented_cars_back_off_day=6')
            setData(response.data.data.rented_cars)
        } catch (error) {

        }

    }
    useEffect(() => {
        getData()
    }, [])
    const columns: TableProps<ICarItem>['columns'] = [
        {
            title: "Tên xe",
            dataIndex: "car_brand_model",
        },
        {
            title: "Số lần được thuê",
            dataIndex: "count",
            render: (count: any) => <p style={{ textAlign: 'center' }}>{count}</p>,
            align: 'center'
        }
    ]
    return (
        <div>
            <p className='font-sans font-bold text-neutral-600 dark:text-neutral-200 mb-3 mt-2'>Các xe được thuê trong 6 ngày gần nhất</p>
            <Table
                style={{ height: "100%" }}
                size='small'
                columns={columns}
                dataSource={data}
            />
        </div>
    )
}
