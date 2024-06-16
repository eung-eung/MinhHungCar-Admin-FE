'use client'

import React, { useEffect, useState } from 'react'
import ItemStatistic from './components/StatisticItem'
import StatisTicItemGrid from './components/StatisticItemGrid';
import StatisticItem from './components/StatisticItem';
import EqualizerRoundedIcon from '@mui/icons-material/EqualizerRounded';
import ReceiptLongRoundedIcon from '@mui/icons-material/ReceiptLongRounded';
import HandshakeRoundedIcon from '@mui/icons-material/HandshakeRounded';
import Person4RoundedIcon from '@mui/icons-material/Person4Rounded';
import AreaReChart from './components/AreaChart';
import classes from './index.module.css'
import LineReChart from './components/LineChart';
import PieReChart from './components/PieChart';
import BarRefChart from './components/BarChart';

const Skeleton = () => (
    <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100"></div>
);
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
export default function Dashboard() {
    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)
    }, [])

    return (
        <div>
            <StatisTicItemGrid className="">
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

            {
                isClient &&
                <>
                    <div className={classes.areaChart}>
                        <StatisticItem
                            // style={}
                            header={<AreaReChart />}
                            title={<p>Doanh thu 6 ngày gần nhất</p>}
                        />
                    </div>

                    <div className={classes.middleChartBox}>
                        <StatisticItem
                            style={{
                                flex: 3,
                                marginTop: '30px'
                            }}
                            header={<LineReChart />}
                            title={<p>Doanh thu 6 ngày gần nhất</p>}
                        />
                        <StatisticItem
                            style={{
                                // height: '500px',
                                flex: 1,
                                marginTop: '30px'
                            }}
                            header={<PieReChart />}
                            title={<p>Từng loại xe</p>}
                        />
                    </div>
                </>
            }
            <div>
                <StatisticItem
                    style={{
                        // height: '500px',
                        flex: 1,
                        marginTop: '30px'
                    }}
                    header={<BarRefChart />}
                    title={<p>Từng loại xe</p>}
                />
            </div>
        </div>
    )
}
