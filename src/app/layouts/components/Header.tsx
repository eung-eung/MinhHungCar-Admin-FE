import { Avatar } from 'antd'
import React from 'react'
import classes from './Header.module.css'
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import DigitalClock from '@/app/components/DigitalClock';
export default function Header() {
    return (
        <div className={classes.container + ' flex justify-end items-center'}>
            <DigitalClock />
            {/* <div className='flex justify-end items-center'> */}
            <div className={classes.notification}>
                <NotificationsNoneIcon sx={{ color: '#000000', fontSize: '25px' }} />
            </div>
            <Avatar size='default' src='/Minhhung.png' />
            <p className={classes.text}>Admin</p>
            <KeyboardArrowDownOutlinedIcon sx={{ color: '#000000', fontSize: '20px' }} />
            {/* </div> */}
        </div>
    )
}
