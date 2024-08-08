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
            <div className="inline-flex 
                                                animate-shimmer 
                                                items-center 
                                                justify-center 
                                                rounded-md border 
                                                 bg-[linear-gradient(45deg,#d4d3ff,45%,#ece8ff,55%,#d4d3ff)]
                                                bg-[length:200%_100%] 
                                                font-medium 
                                                text-slate-400 
                                                transition-colors 
                                                focus:outline-none 
                                                focus:ring-offset-2 focus:ring-offset-slate-50"
                style={{
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
