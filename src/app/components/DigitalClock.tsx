import dayjs, { Dayjs } from 'dayjs'
import React, { useEffect, useState } from 'react'
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';
import { Tag } from 'antd';
import classes from './index.module.css'
import { useTranslation } from 'react-i18next';
export default function DigitalClock() {
    const [currentTime, setCurrentTime] = useState<Dayjs>(dayjs())
    const { t } = useTranslation()
    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentTime(dayjs());
        }, 1000);

        // Clear interval on component unmount
        return () => clearInterval(intervalId);
    }, []);
    return (

        <div style={{ position: 'absolute', left: '50%', transform: "translateX(-50%)", marginTop: 5 }}>
            <div
                className="relative inline-flex h-12 overflow-hidden rounded-full p-[2px] focus:outline-none">
                <span className="absolute inset-[-1000%]  bg-[conic-gradient(from_90deg_at_60%_40%,#A5B4FC_0%,#C084FC_100%)]" />
                <span
                    style={{ background: '#fff', color: '#2900ff', width: 150 }}
                    className="inline-flex h-full w-full items-center justify-center rounded-full bg-slate-950 px-2 text-sm font-medium text-white backdrop-blur-3xl ">


                    <div style={{ fontSize: 10, fontWeight: 500, width: '100%', overflow: 'hidden' }} className='flex items-center flex-col justify-center p-2 mt-1'>
                        <time className='flex items-center w-full' >
                            <AccessTimeRoundedIcon sx={{ color: '#2900ff', marginRight: '15px', fontSize: 15 }} />
                            <p className='p-1'>{currentTime.format("HH")}</p>
                            :
                            <p className='p-1'>{currentTime.format("mm")}</p>
                            :
                            <p className='p-1'>{currentTime.format("ss")}</p>

                        </time>
                        <p style={{ width: '100%', height: 1, background: 'linear-gradient(to right, rgb(165, 180, 252), rgb(192, 132, 252))' }}></p>
                        <time className='flex items-center w-full pb-1'>
                            {/* <AccessTimeRoundedIcon sx={{ color: '#8200f5' }} /> */}
                            <p className='p-1'>{t(`day:${currentTime.day()}`)},</p>
                            <p className='p-1'>{currentTime.date()}</p>
                            -
                            <p className='p-1'>{currentTime.month() + 1}</p>
                            -
                            <p className='p-1'>{currentTime.year()}</p>

                        </time>
                    </div>
                </span>
            </div>
        </div>
    )
}
