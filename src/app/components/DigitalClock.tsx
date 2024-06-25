import dayjs, { Dayjs } from 'dayjs'
import React, { useEffect, useState } from 'react'
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';
import { Tag } from 'antd';
import classes from './index.module.css'
export default function DigitalClock() {
    const [currentTime, setCurrentTime] = useState<Dayjs>(dayjs())

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentTime(dayjs());
        }, 1000);

        // Clear interval on component unmount
        return () => clearInterval(intervalId);
    }, []);
    return (

        <div style={{ position: 'absolute', left: '50%', transform: "translateX(-50%)" }}>
            <button
                className="relative inline-flex h-12 overflow-hidden rounded-full p-[2px] focus:outline-none">
                <span className="absolute inset-[-1000%] animate-[spin_100s_linear_infinite]  bg-[conic-gradient(from_90deg_at_50%_50%,#8E2DE2_0%,#c471ed_50%,#4A00E0_100%)]" />
                <span
                    style={{ background: '#efe6ff', color: '#8200f5' }}
                    className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-2 text-sm font-medium text-white backdrop-blur-3xl shadow-sm	">


                    <div style={{ fontSize: 19, fontWeight: 500, width: 150, overflow: 'hidden' }}>
                        <time className='flex items-center'>
                            <AccessTimeRoundedIcon sx={{ color: '#8200f5' }} />
                            <p className='p-2'>{currentTime.format("HH")}</p>
                            :
                            <p className='p-2'>{currentTime.format("mm")}</p>
                            :
                            <p className='p-2'>{currentTime.format("ss")}</p>

                        </time>

                    </div>


                </span>
            </button>
        </div>
    )
}
