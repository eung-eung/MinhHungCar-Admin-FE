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
export default function NotificationList({
    notiList,
}: {
    notiList: any,
}) {
    const { notifications } = useContext(WebSocketContext)
    console.log('notifications: ', notifications);
    const notificationList = async () => {

    }

    return (
        <>
            <div className="dropdown dropdown-end">
                <NotificationsNoneIcon tabIndex={0} sx={{ color: '#000000', fontSize: '25px' }} />
                <ul tabIndex={0} className={"notiList flex flex-nowrap flex-col dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"}
                >
                    {notifications && notifications.length > 0 && notifications.map((item: INotifcation, index: any) =>
                        <li key={index}>
                            <Link href={item.url}>
                                <div>
                                    <p style={{ fontWeight: 600, marginBottom: 7 }}>{item.title}</p>
                                    <p style={{ color: "#8f8f8f" }}>{item.content}</p>
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
