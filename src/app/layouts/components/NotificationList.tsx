'use client'
import React, { Fragment, useContext, useEffect, useRef, useState } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { Badge } from '@mui/material'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import { WebSocketContext } from '@/app/store/WebsocketNotiProvider';
import NotificationsNoneRoundedIcon from '@mui/icons-material/NotificationsNoneRounded';
import Link from 'next/link';
import { INotifcation } from '@/app/models/Notification';
import '../../../app/globals.css'
import dayjs from 'dayjs';

import { useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import toast from 'react-hot-toast';
export default function NotificationList() {
    const { notifications, sound, conversationWs, ws, setNotifications } = useContext(WebSocketContext)
    const [open, setOpen] = useState<boolean>(false)
    const router = useRouter()
    const soundAudioRef = useRef<HTMLAudioElement>(null)
    const { data: session } = useSession()
    useEffect(() => {
        if (conversationWs != null) {
            conversationWs.onmessage = (event: MessageEvent) => {
                const data = JSON.parse(event.data) as any
                if (data.msg_type === 'ERROR' && session?.access_token) {
                    signOut()
                } else {
                    setNotifications((prev: INotifcation[]) => [
                        {
                            url: `/chat/${data.conversation_id}`,
                            title: 'Bạn có tin nhắn mới',
                        },
                        ...prev])

                    toast.custom((t) => (
                        <div
                            style={{ width: '350px' }}
                            className={`${t.visible ? 'animate-enter' : 'animate-leave'
                                } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
                        >
                            <div className="flex-1 w-0 p-4">
                                <div className="flex items-start">
                                    <div className="ml-3 flex-1">
                                        <p className="text-sm font-medium text-gray-900">
                                            Bạn có tin nhắn mới
                                        </p>
                                        {/* <p className="mt-1 text-sm text-gray-500">
                                    
                                </p> */}
                                    </div>
                                </div>
                            </div>
                            <div className="flex border-l border-gray-200">
                                <button
                                    onClick={() => toast.dismiss(t.id)}
                                    className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    ), {
                        position: "bottom-left"
                    })
                }
                soundAudioRef.current?.play()
            }
        }
        if (ws != null) {
            ws.onmessage = (event: MessageEvent) => {
                console.log('vào notification message');
                const data = JSON.parse(event.data) as any
                console.log('provider: ', data);
                if (data.msg_type === 'ERROR' && session?.access_token) {
                    console.log('vao error');
                    signOut()
                } else {
                    setNotifications((prev: INotifcation[]) => [
                        {
                            url: data.data.redirect_url,
                            title: data.title,
                            content: data.body
                        },
                        ...prev])
                    toast.custom((t) => (
                        <div
                            style={{ width: '350px' }}
                            className={`${t.visible ? 'animate-enter' : 'animate-leave'
                                } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
                        >
                            <div className="flex-1 w-0 p-4">
                                <div className="flex items-start">
                                    <div className="ml-3 flex-1">
                                        <p className="text-sm font-medium text-gray-900">
                                            {data.title}
                                        </p>
                                        <p className="mt-1 text-sm text-gray-500">
                                            {data.body}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex border-l border-gray-200">
                                <button
                                    onClick={() => toast.dismiss(t.id)}
                                    className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    ), {
                        position: "bottom-left"
                    })
                }
            }
        }
        return () => {
            if (ws) {
                ws.close(); // Clean up on unmount
            }
            if (conversationWs) {
                conversationWs.close()
            }
        };
    }, [])
    return (
        <>
            <div
                tabIndex={0}
                className="dropdown dropdown-end cursor-pointer">
                <NotificationsNoneIcon
                    sx={{ color: '#000000', fontSize: '25px' }} />
                <ul
                    tabIndex={0}
                    className={"notiList flex flex-nowrap flex-col dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"}
                >
                    <audio ref={soundAudioRef} id="mySound" src="/soundNoti.mp3"></audio>
                    {notifications && notifications.length > 0 && notifications.map((item: INotifcation, index: any) =>
                        <li key={index} style={{ borderBottom: '1px solid rgba(5, 5, 5, 0.06)' }}>
                            <div
                                className='linkNotification'
                                onClick={() => {
                                    router.push(item.url.includes('cars') ? item.url + '/nooverlay' : item.url)
                                }}
                            >
                                <div>
                                    <p style={{ fontWeight: 600, marginBottom: 7 }}>{item.title}</p>
                                    <p style={{ color: "#8f8f8f" }}>{item.content}</p>
                                    <p style={{ color: "#0866FF", fontWeight: 600, fontSize: '10px' }}>
                                        {dayjs(item.created_at).format('DD-MM-YYYY')}
                                    </p>
                                </div>
                            </div>
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
