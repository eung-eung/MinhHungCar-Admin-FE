'use client'

import { formatCurrency } from '@/app/utils/formatCurrency';
import useAxiosAuth from '@/app/utils/hooks/useAxiosAuth';
import React, { useEffect, useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';


export default function AreaReChart() {
    const axiosAuth = useAxiosAuth()
    const [revenueData, setRevenueData] = useState<any>()
    const [loading, setLoading] = useState<boolean>(true)
    const CustomTooltip = (props: any) => {
        const { active, payload } = props
        if (active && payload && payload.length) {
            const { name, uv } = payload[0].payload;
            return (
                <div style={{
                    border: "1px solid #ddd",
                    padding: 3,
                    background: "#fff"
                }}>
                    <p className="label">{name}</p>
                    <p style={{
                        color: "#62c3b6"
                    }}>Doanh thu: {formatCurrency(uv)}</p>

                </div>
            );
        }
        return null;
    }
    const getRevenueData = async () => {
        try {
            setLoading(true)
            const response = await axiosAuth.get("/admin/statistic?total_customer_contracts_back_off_day=60&total_active_partners_back_off_day=60&total_active_customers_back_off_day=60&revenue_back_off_day=6&rented_cars_back_off_day=60")

            const data = response.data.data.revenue.records.map((item: any) => (
                {
                    name: new Date(item.from_date).toLocaleDateString(),
                    uv: item.revenue
                }
            ))
            setRevenueData(data)
            setLoading(false)

        } catch (error) {
            setLoading(false)
        }
    }
    useEffect(() => {
        getRevenueData()
    }, [])
    return (
        <div className='flex justify-center'>
            {
                !loading &&

                <AreaChart
                    width={900}
                    height={400}
                    data={revenueData}
                    margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 0,
                    }}
                >
                    <defs>
                        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#62c3b6" stopOpacity={1} />
                            <stop offset="100%" stopColor="#62c3b6" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <XAxis dataKey="name" />
                    <YAxis dataKey="uv" tickFormatter={(val: any) => (Math.abs(val) > 999 ? Math.sign(val) * ((Math.abs(val) / 1000).toFixed(1) as any) + 'k' : Math.sign(val) * Math.abs(val)).toString()} />
                    <Area type="monotone"
                        fillOpacity={1} dataKey="uv"
                        strokeWidth={4} stroke="#3fc587" fill="url(#colorUv)" />
                    <Tooltip content={<CustomTooltip />} />
                </AreaChart>

            }
        </div>
    );

}
