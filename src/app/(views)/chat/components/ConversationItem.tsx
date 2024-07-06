import React from 'react'
import classes from './index.module.css'
export default function ConversationItem({
    image,
    name
}: {
    image: string,
    name: string
}) {
    return (
        <div className={classes.conversationItem}>
            <div>
                <img src={image} className={classes.imgAvatar} />
            </div>
            <div className='ml-3'>
                <p>{name}</p>
            </div>
        </div>
    )
}
