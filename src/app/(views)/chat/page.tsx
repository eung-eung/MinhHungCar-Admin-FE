'use client'

import React, { useEffect, useState } from 'react'
import ConversationList from './components/ConversationList'
import useAxiosAuth from '@/app/utils/hooks/useAxiosAuth'
import { IConversation } from '@/app/models/Conversation.model'
import ChatZone from './components/ChatZone'
import classes from './components/index.module.css'
export default function ChatPage() {
    const axiosAuth = useAxiosAuth()
    const [conversationList, setConversationList] = useState<IConversation[]>()
    const getConversationList = async () => {
        const response = await axiosAuth.get('/admin/conversations?offset=0&limit=100')
        setConversationList(response.data.data)
    }
    useEffect(() => {
        getConversationList()
    }, [])
    return (
        <div>

            <div className='flex'>
                <div className={classes.left}>
                    <h2 className='font-bold mb-5'>Tin nhắn</h2>
                    <ConversationList />
                </div>
                <div className={classes.right}>
                    <ChatZone />
                </div>
            </div>
        </div>
    )
}
