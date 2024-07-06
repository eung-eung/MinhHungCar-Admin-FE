import { IConversation } from '@/app/models/Conversation.model'
import useAxiosAuth from '@/app/utils/hooks/useAxiosAuth'
import React, { useEffect, useState } from 'react'
import ConversationItem from './ConversationItem'
import classes from './index.module.css'

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

export default function ConversationList() {


    return (
        <div className={classes.container}>
            {users.map((user, index) =>
                <ConversationItem
                    key={index}
                    name={user.name}
                    image={user.image}
                />
            )}

        </div>
    )
}
