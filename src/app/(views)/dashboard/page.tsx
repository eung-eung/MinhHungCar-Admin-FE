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
import { Flex, Skeleton } from 'antd';
import useAxiosAuth from '@/app/utils/hooks/useAxiosAuth';
import { formatCurrency } from '@/app/utils/formatCurrency';
import TopRentCarTable from './components/TopRentCarTable';

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
    const [items, setItems] = useState<any>()
    const [loadingItems, setLoadingItems] = useState<boolean>(true)
    const getItems = async () => {
        setLoadingItems(true)
        try {
            const response = await axiosAuth.get(
                '/admin/statistic?total_customer_contracts_back_off_day=60&total_active_partners_back_off_day=60&total_active_customers_back_off_day=60&revenue_back_off_day=6&rented_cars_back_off_day=60'
            )
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
                    title: formatCurrency(response.data.data.revenue.total_revenue),
                    description: "Tổng doanh thu",
                    header: <EqualizerRoundedIcon sx={{ color: '#FEB95A' }} />,
                },
            })
            setLoadingItems(false)
        } catch (error) {
            console.log(error);

        }
    }
    useEffect(() => {
        getItems()
    }, [])
    return (
        <div className='pt-5'>
            <div>
                <StatisTicItemGrid>
                    {
                        loadingItems ?
                            <>
                                <Skeleton active />
                                <Skeleton active />
                                <Skeleton active />
                                <Skeleton active />
                            </>
                            : <>
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
                            </>
                    }
                </StatisTicItemGrid>

            </div>
            <div className={classes.areaChart}>
                <StatisticItem
                    style={{
                        display: 'flex',
                        justifyContent: 'center'
                    }}
                    header={<DynamicAreaChart />}
                    title={<p>Doanh thu 6 ngày gần nhất</p>}
                />
            </div>
            <Flex className='mt-5 mb-5 justify-between gap-4' style={{
                height: 400
            }}>
                <div className={classes.middleChartBox} style={{
                    flex: 4,
                    height: '100%'
                }}>
                    <StatisticItem
                        style={{
                            flex: 1,
                            height: '100%'
                        }}
                        header={<DynamicPieChart />}
                    />
                </div>
                <div
                    style={{
                        flex: 3,
                        height: '100%'
                    }}
                >
                    <StatisticItem
                        style={{
                            height: 400,
                            overflow: 'auto'
                        }}
                        header={<TopRentCarTable />}
                    />
                </div>
            </Flex>
            <div>
                {/* <StatisticItem
                    style={{
                        height: 400
                    }}
                    header={<DynamicLineChart />}

                /> */}
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
