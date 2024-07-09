'use client'
import React, { useEffect, useState } from 'react'
import ChatZone from '../components/ChatZone'
import useAxiosAuth from '@/app/utils/hooks/useAxiosAuth'
import { IAccount } from '@/app/models/Account.model'
import { Spin } from 'antd'
import classes from '../components/index.module.css'
import { IConversation } from '@/app/models/Conversation.model'
import DefaultChatZone from '../components/DefaultChatZone'
import { useRouter } from 'next/navigation'
export default function ChatZoneById({
    params: { conversationtIdSlug }
}: {
    params: { conversationtIdSlug: any }
}) {
    const axiosAuth = useAxiosAuth()
    const [loading, setLoading] = useState<boolean>(true)
    const [profile, setProfile] = useState<IAccount>()
    const [messages, setMessages] = useState<any>()
    const [isError, setIsError] = useState<boolean>(true)
    const router = useRouter()
    const getUserProfile = async () => {
        setLoading(true)
        try {
            const messages = await axiosAuth.get(
                `/admin/conversation/messages?conversation_id=${conversationtIdSlug}&offset=0&limit=10000`
            )
            const sortMessages = messages.data.data.sort((a: any, b: any) => a.id - b.id);
            setMessages(sortMessages)
            const user = await axiosAuth.get(
                'admin/conversations'
            )
            const accountId = user.data.data.find((user: IConversation) => user.id == conversationtIdSlug)
            const userProfile = await axiosAuth.get('/admin/account/' + accountId.account_id)
            setProfile(userProfile.data.data)

            setIsError(false)
        } catch (error) {
            console.log(error);
            setIsError(true)

        }
        setLoading(false)
    }

    useEffect(() => {
        console.log('error: ', isError);

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
                (isError
                    ? <DefaultChatZone />
                    :
                    <ChatZone
                        user={profile}
                        messages={messages}
                        conversationtId={conversationtIdSlug}
                        setMessages={setMessages}
                    />

                )
            }

        </div>
    )
}
