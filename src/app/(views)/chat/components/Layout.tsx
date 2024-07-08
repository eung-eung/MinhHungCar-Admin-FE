'use client'
import { useEffect, useState } from 'react'
import ConversationList from './ConversationList'
import classes from './index.module.css'
import { IConversation } from '@/app/models/Conversation.model'
import useAxiosAuth from '@/app/utils/hooks/useAxiosAuth'

export default function ChatLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    const axiosAuth = useAxiosAuth()
    const [conversationList, setConversationList] = useState<IConversation[]>()
    const getConversationList = async () => {
        const response = await axiosAuth.get('/admin/conversations?offset=0&limit=100')
        const conversationList = response.data.data

        const renderList = await Promise.all(conversationList.map(
            async (c: IConversation) => {
                const response = await axiosAuth.get('/admin/account/' + c.account_id)
                return {
                    ...c,
                    account: response.data.data
                }
            }
        ))
        console.log('list: ', renderList);
        setConversationList(renderList)
    }
    useEffect(() => {
        getConversationList()
    }, [])

    return <>
        <div className='flex' style={{ height: '100%' }}>
            <div className={classes.left}>
                <h2 className='font-bold mb-5'>Tin nhắn</h2>
                <ConversationList conversationList={conversationList} />
            </div>
            {/* <div className={classes.right}> */}
            {children}
            {/* </div> */}


        </div>
    </>


}
