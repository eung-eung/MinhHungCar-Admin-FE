'use client'

import React, { Suspense, useEffect, useState } from 'react'
import ItemStatistic from './components/StatisticItem'
import StatisTicItemGrid from './components/StatisticItemGrid';
import StatisticItem from './components/StatisticItem';
import EqualizerRoundedIcon from '@mui/icons-material/EqualizerRounded';
import ReceiptLongRoundedIcon from '@mui/icons-material/ReceiptLongRounded';
import HandshakeRoundedIcon from '@mui/icons-material/HandshakeRounded';
import Person4RoundedIcon from '@mui/icons-material/Person4Rounded';

import classes from './index.module.css'
import dynamic from 'next/dynamic';
import { Skeleton } from 'antd';
import useAxiosAuth from '@/app/utils/hooks/useAxiosAuth';
import { formatCurrency } from '@/app/utils/formatCurrency';

const items = [
    {
        title: "1.000.000đ",
        description: "Tổng doanh thu",
        header: <EqualizerRoundedIcon sx={{ color: '#FEB95A' }} />,
    },
    {
        title: "500",
        description: "Tổng hợp đồng thuê xe",
        header: <ReceiptLongRoundedIcon sx={{ color: '#A9DFD8' }} />,
    },
    {
        title: "100",
        description: "Tổng partner",
        header: <HandshakeRoundedIcon sx={{ color: '#F2C8ED' }} />,
    },
    {
        title: "100",
        description:
            "Số khách hàng đã sử dụng dịch vụ",
        header: <Person4RoundedIcon sx={{ color: '#20AEF3' }} />,
    },

];
const DynamicAreaChart = dynamic(() => import('./components/AreaChart'), {
    loading: () => <Skeleton active />
})
const DynamicBarChart = dynamic(() => import('./components/BarChart'), {
    loading: () => <Skeleton active />

})
const DynamicPieChart = dynamic(() => import('./components/PieChart'), {
    loading: () => <Skeleton active />

})
const DynamicLineChart = dynamic(() => import('./components/LineChart'), {
    loading: () => <Skeleton active />

})
export default function Dashboard() {
    const axiosAuth = useAxiosAuth()
    const [items, setItems] = useState<any>({
        totalActiveCustomers: 0,
        totalActivePartners: 0,
        totalCustomerContracts: 0,
        totalPartnerCustomerContracts: 0
    })
    const getItems = async () => {
        const response = await axiosAuth.get(
            '/admin/statistic?total_customer_contracts_back_off_day=60&total_active_partners_back_off_day=60&total_active_customers_back_off_day=60&revenue_back_off_day=60&rented_cars_back_off_day=60'
        )
        console.log(response.data.data);
        setItems({
            totalActiveCustomers: {
                title: response.data.data.total_active_customers,
                description: "Số lượng khách hàng",
                header: <Person4RoundedIcon sx={{ color: '#20AEF3' }} />,
            },
            totalActivePartners: {
                title: response.data.data.total_active_partners,
                description: "Số lượng đối tác",
                header: <HandshakeRoundedIcon sx={{ color: '#F2C8ED' }} />,
            },
            totalCustomerContracts: {
                title: response.data.data.total_customer_contracts,
                description: "Tổng hợp đồng thuê xe",
                header: <ReceiptLongRoundedIcon sx={{ color: '#A9DFD8' }} />,

            },
            revenue: {
                title: formatCurrency(response.data.data.revenue),
                description: "Tổng doanh thu",
                header: <EqualizerRoundedIcon sx={{ color: '#FEB95A' }} />,
            },
        })
    }
    useEffect(() => {
        getItems()
    }, [])
    return (
        <div className='pt-5'>
            <div>
                <StatisTicItemGrid>
                    <StatisticItem
                        title={items.totalActiveCustomers.title}
                        description={items.totalActiveCustomers.description}
                        header={items.totalActiveCustomers.header}
                    // className={i === 4 || i === 6 ? "md:col-span-2" : ""}
                    />
                    <StatisticItem
                        title={items.totalActivePartners.title}
                        description={items.totalActivePartners.description}
                        header={items.totalActivePartners.header}
                    // className={i === 4 || i === 6 ? "md:col-span-2" : ""}
                    />
                    <StatisticItem
                        title={items.totalCustomerContracts.title}
                        description={items.totalCustomerContracts.description}
                        header={items.totalCustomerContracts.header}
                    // className={i === 4 || i === 6 ? "md:col-span-2" : ""}
                    />
                    <StatisticItem
                        title={items.revenue.title}
                        description={items.revenue.description}
                        header={items.revenue.header}
                    // className={i === 4 || i === 6 ? "md:col-span-2" : ""}
                    />
                </StatisTicItemGrid>

            </div>
            <div className={classes.areaChart}>
                <StatisticItem
                    // style={}
                    header={<DynamicAreaChart />}
                    title={<p>Doanh thu 6 ngày gần nhất</p>}
                />
            </div>

            <div className={classes.middleChartBox}>
                <StatisticItem
                    style={{
                        flex: 3,
                        marginTop: '30px'
                    }}
                    header={<DynamicLineChart />}
                    title={<p>Doanh thu 6 ngày gần nhất</p>}
                />

            </div>

            <div>
                <StatisticItem
                    style={{
                        // height: '500px',
                        flex: 1,
                        height: '100%'
                    }}
                    header={<DynamicPieChart />}
                    title={<p>Từng loại xe</p>}
                />
            </div>
            <div>

                <StatisticItem
                    style={{
                        // height: '500px',
                        flex: 1,
                        marginTop: '30px'
                    }}
                    header={<DynamicBarChart />}
                    title={<>Từng loại xe</>}
                />
            </div>
        </div>
    )
}
