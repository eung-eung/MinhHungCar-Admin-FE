import dayjs, { Dayjs } from 'dayjs'
import React, { useEffect, useState } from 'react'
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';
import { Tag } from 'antd';
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
        <Tag
            style={{
                position: 'absolute',
                left: '50%',
                transform: "translateX(-50%)"
            }}
            color="default" >
            <div
                className='flex items-center pt-1 pb-1 pl-3 pr-3'>
                <AccessTimeRoundedIcon />
                <p style={{ fontSize: 20, fontWeight: 600, marginLeft: 5 }}>
                    {currentTime.format("HH:mm:ss")}
                </p>
            </div>
        </Tag >


    )
}
