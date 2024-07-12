
import React, { Fragment, useContext } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { Badge } from '@mui/material'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import { WebSocketContext } from '@/app/store/WebsocketNotiProvider';
import NotificationsNoneRoundedIcon from '@mui/icons-material/NotificationsNoneRounded';
export default function NotificationList({
    notiList,
}: {
    notiList: any,
}) {
    const { notifications } = useContext(WebSocketContext)
    console.log('notifications: ', notifications);

    return (
        <>
            <div className="dropdown dropdown-end">
                <NotificationsNoneIcon tabIndex={0} sx={{ color: '#000000', fontSize: '25px' }} />
                <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
                    style={{ width: '500px', background: "#f3f7ff", top: '150%', maxHeight: 500, overflowY: 'scroll' }}>
                    {notifications && notifications.length > 0 && notifications.map((item: any, index: any) =>
                        <li key={index}>
                            <a>
                                <div>
                                    <p style={{ fontWeight: 600, marginBottom: 7 }}>Thông báo từ đối tác</p>
                                    <p style={{ color: "#8f8f8f" }}>Chuyến xe đã được đăng ký</p>
                                </div>
                            </a>
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
