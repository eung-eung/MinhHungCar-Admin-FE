import { Avatar } from 'antd'
import React from 'react'
import classes from './Header.module.css'
import AdminPanelSettingsRoundedIcon from '@mui/icons-material/AdminPanelSettingsRounded';
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
                <NotificationList />
            </div>
            <div className='flex items-center'
                style={{
                    background: '#d4d3ff',
                    padding: 5,
                    borderRadius: 10,
                    color: "blue",
                    fontSize: 15
                }}
            >
                <AdminPanelSettingsRoundedIcon sx={{
                    fontSize: 17,
                    marginRight: 1
                }} />
                <p style={{
                    fontWeight: 600
                }}>Admin</p>
            </div>
        </div>
    )
}
