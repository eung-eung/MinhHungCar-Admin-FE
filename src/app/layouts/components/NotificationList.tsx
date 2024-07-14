'use client'
import React, { Fragment, useContext, useEffect } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { Badge } from '@mui/material'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import { WebSocketContext } from '@/app/store/WebsocketNotiProvider';
import NotificationsNoneRoundedIcon from '@mui/icons-material/NotificationsNoneRounded';
import Link from 'next/link';
import { INotifcation } from '@/app/models/Notification';
import '../../../app/globals.css'
import dayjs from 'dayjs';
export default function NotificationList() {
    const { notifications, ws, isConnected } = useContext(WebSocketContext)
    return (
        <>
            <div className="dropdown dropdown-end">
                <NotificationsNoneIcon tabIndex={0} sx={{ color: '#000000', fontSize: '25px' }} />
                <ul tabIndex={0} className={"notiList flex flex-nowrap flex-col dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"}
                >
                    {notifications && notifications.length > 0 && notifications.map((item: INotifcation, index: any) =>
                        <li key={index} style={{ borderBottom: '1px solid rgba(5, 5, 5, 0.06)' }}>
                            <Link href={item.url.includes('cars') ? item.url + '/nooverlay' : item.url}>
                                <div>
                                    <p style={{ fontWeight: 600, marginBottom: 7 }}>{item.title}</p>
                                    <p style={{ color: "#8f8f8f" }}>{item.content}</p>
                                    <p style={{ color: "#0866FF", fontWeight: 600, fontSize: '10px' }}>
                                        {dayjs(item.created_at).format('DD-MM-YYYY')}
                                    </p>
                                </div>
                            </Link>
                        </li>

                    )}
                    {
                        !notifications && <>
                            <NotificationsNoneRoundedIcon />
                            <p>Không có thông báo</p>
                        </>
                    }
                </ul>
            </div>
        </>
    )
}
