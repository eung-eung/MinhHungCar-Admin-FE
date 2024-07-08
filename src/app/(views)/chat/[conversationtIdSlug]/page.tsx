'use client'
import React, { useEffect, useState } from 'react'
import ChatZone from '../components/ChatZone'
import useAxiosAuth from '@/app/utils/hooks/useAxiosAuth'
import { IAccount } from '@/app/models/Account.model'
import { Spin } from 'antd'
import classes from '../components/index.module.css'
export default function ChatZoneById({
    params: { conversationtIdSlug }
}: {
    params: { conversationtIdSlug: any }
}) {
    const axiosAuth = useAxiosAuth()
    const [loading, setLoading] = useState<boolean>(true)
    const [profile, setProfile] = useState<IAccount>()
    const [messages, setMessages] = useState<any>()
    const getUserProfile = async () => {
        setLoading(true)
        try {
            const messages = await axiosAuth.get(
                `/admin/conversation/messages?conversation_id=${conversationtIdSlug}&offset=0&limit=10000`
            )
            setMessages(messages.data.data)
            const userProfile = messages.data.data.find((item: any) => item.sender != 1)
            console.log(userProfile);

            // const response = await axiosAuth.get('/admin/account/' + accountIdSlug)
            setProfile(userProfile.account)
        } catch (error) {
            console.log(error);

        }
        setLoading(false)
    }

    useEffect(() => {
        getUserProfile()
    }, [conversationtIdSlug])
    return (
        <div className={classes.right}>
            {loading ?
                <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: "50%",
                    transform: "translate(-50%,-50%)"
                }}>
                    <Spin size='large' />
                </div> :
                <ChatZone
                    user={profile}
                    messages={messages}
                    conversationtId={conversationtIdSlug}
                />
            }
        </div>
    )
}
