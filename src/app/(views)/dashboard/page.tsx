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
    return (
        <div className='pt-5'>
            <div>
                <StatisTicItemGrid>
                    {items.map((item, i) => (
                        <StatisticItem
                            key={i}
                            title={item.title}
                            description={item.description}
                            header={item.header}
                            className={i === 4 || i === 6 ? "md:col-span-2" : ""}
                        />
                    ))}
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
