import React from 'react'
import classes from './index.module.css'
import { useRouter } from 'next/navigation'
export default function ConversationItem({
    image,
    name,
    accountId,
    activeId,
    conversationId
}: {
    image: string,
    name: string,
    accountId: any,
    activeId: string,
    conversationId: any
}) {
    const router = useRouter()
    const handleBrokenImage = (event: any) => {
        event.target.src = '/defaultUser.png'
    }
    const handleNavigateByClick = (id: any) => {
        router.push('/chat/' + id)
    }
    return (
        <div
            onClick={() => handleNavigateByClick(conversationId)}
            className={(conversationId === activeId ? `
             animate-shimmer
            border-slate-800 bg-[linear-gradient(110deg,#b688ff40,45%,#eebfff40,55%,#b688ff40)]
            bg-[length:200%_100%]  
            `: '') + classes.conversationItem}>
            <div>
                <img
                    onError={handleBrokenImage}
                    src={image} className={classes.imgAvatar} />
            </div>
            <div className='ml-3'>
                <p>{name}</p>
            </div>
        </div>
    )
}
