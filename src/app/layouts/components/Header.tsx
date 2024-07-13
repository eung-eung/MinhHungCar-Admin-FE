import { Avatar } from 'antd'
import React from 'react'
import classes from './Header.module.css'
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import DigitalClock from '@/app/components/DigitalClock';
import NotificationList from './NotificationList';
export default function Header() {
    return (
        <div
            style={{
                background: "#fff",
                height: '8vh',
                position: 'relative',
                boxShadow: '0 4px 1px -3px #f0f0f0'
            }}
            className={classes.container + ' flex justify-end items-center pb-4'}>
            <DigitalClock />
            <div className={classes.notification}>
                <NotificationList
                    notiList={[{
                        title: "AAAA"
                    }]} />
            </div>
            <Avatar size='default' src='/Minhhung.png' />
            <p className={classes.text}>Admin</p>
            <KeyboardArrowDownOutlinedIcon sx={{ color: '#000000', fontSize: '20px' }} />
            {/* </div> */}
        </div>
    )
}
