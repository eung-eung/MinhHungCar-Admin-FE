import { IConversation } from '@/app/models/Conversation.model'
import useAxiosAuth from '@/app/utils/hooks/useAxiosAuth'
import React, { useEffect, useState } from 'react'
import ConversationItem from './ConversationItem'
import classes from './index.module.css'
import { usePathname } from 'next/navigation'

const users = [
    {
        image: "/avatarSample.jpg",
        name: "Kenny Dragon"
    },
    {
        image: "/customer.jpg",
        name: "Kenny Gae"
    },
    {
        image: "https://i.pinimg.com/564x/bb/eb/a6/bbeba63f548807db592804ece5a4dde8.jpg",
        name: "Kenny D Monkey"
    },
    {
        image: "https://i.pinimg.com/564x/54/80/21/548021807ac2fffa407a6911c1f6fcff.jpg",
        name: "Kenny N Catto"
    }
]

export default function ConversationList(
    {
        conversationList
    }: {
        conversationList?: IConversation[]
    }
) {
    const path = usePathname()
    const [activeId, setActiveId] = useState<any>()
    useEffect(() => {
        if (path) {
            const numberRegExp = /^\/chat\/(\d+)$/
            const match = path.match(numberRegExp)

            if (match) {
                setActiveId(parseInt(match[1], 10));

            } else {
                setActiveId(null)
            }
        }

    }, [path])

    return (
        <div className={classes.container}>
            {conversationList?.map((conversation, index) =>
                <ConversationItem
                    conversationId={conversation.id}
                    activeId={activeId}
                    key={index}
                    accountId={conversation.account_id}
                    name={
                        conversation.account.last_name
                        + ' '
                        + conversation.account.first_name
                    }
                    image={conversation.account.avatar_url}
                />
            )}

        </div>
    )
}
