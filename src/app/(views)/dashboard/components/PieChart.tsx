'use client'

import useAxiosAuth from '@/app/utils/hooks/useAxiosAuth';
import React, { useEffect, useState } from 'react'
import { Pie, PieChart, Sector } from 'recharts'


const renderActiveShape = (props: any) => {

    const { cx, cy, startAngle, endAngle, payload, innerRadius, outerRadius, z, cornerRadius } = props;
    return (
        <g>
            <text x={cx} y={cy - 20} dy={8} fontSize={z ? '16px' : "24px"} textAnchor="middle" fill="#001233" fontWeight="bold">
                {payload.value}
            </text>
            <text x={cx} y={cy + 5} dy={8} fontSize="12px" textAnchor="middle" fill="#5C677D">
                {payload.name}
            </text>
            <Sector
                cx={cx}
                cy={cy}
                innerRadius={innerRadius}
                outerRadius={outerRadius + 20}
                startAngle={startAngle}
                endAngle={endAngle}
                fill={"#83dfa3"}
                cornerRadius={payload.name === 'Deposit' ? cornerRadius : 0}
            />
            <Sector
                cx={cx}
                cy={cy}
                innerRadius={innerRadius - 18}
                outerRadius={innerRadius - 10}
                startAngle={startAngle}
                endAngle={endAngle}
                fill={"#7674740f"}
            />
        </g>
    );
};

export default function PieReChart() {
    const axiosAuth = useAxiosAuth()
    const [numberParkingLot, setNumberParkingLot] = useState<any>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [activeIndex, setActiveIndex] = useState<any>(0)

    const onPieEnter = (_: any, index: any) => {
        setActiveIndex(index)
    };

    const getDatePieChart = async () => {
        try {
            setLoading(true)
            const response = await axiosAuth.get('admin/statistic?total_customer_contracts_back_off_day=60&total_active_partners_back_off_day=60&total_active_customers_back_off_day=60&revenue_back_off_day=8&rented_cars_back_off_day=60')
            console.log(response.data.data);
            setNumberParkingLot([{
                name: 'MinhHung garage',
                value: response.data.data.parking_lot.garage
            },
            {
                name: 'Nhà',
                value: response.data.data.parking_lot.home
            }
            ])
            setLoading(false)
        } catch (error) {
            setLoading(false)
        }

    }

    useEffect(() => {
        getDatePieChart()
        if (!loading) {
            console.log(numberParkingLot);
        }

    }, [])
    return (
        <>
            <p className='font-sans font-bold text-neutral-600 dark:text-neutral-200 mb-3 mt-2'>
                Tỉ lệ chọn nơi để xe của các đối tác
            </p>
            <PieChart width={400} height={400}>
                <Pie
                    activeIndex={activeIndex}
                    activeShape={renderActiveShape}
                    style={{ outline: 'none' }}
                    data={numberParkingLot}
                    cx="50%"
                    cy="40%"
                    labelLine={false}
                    innerRadius={80}
                    outerRadius={120}
                    dataKey="value"
                    fill='#62c3b6'
                    onMouseEnter={onPieEnter}
                >
                </Pie>
            </PieChart >
        </>
    )
}
