import React from 'react'
import classes from './index.module.css'
import { useRouter } from 'next/navigation'
import nProgress from 'nprogress'
import { Tag } from 'antd'
import { useTranslation } from 'react-i18next'
import HandshakeIcon from '@mui/icons-material/Handshake';
import PersonOutlineRoundedIcon from '@mui/icons-material/PersonOutlineRounded';
export default function ConversationItem({
    image,
    name,
    accountId,
    role,
    activeId,
    conversationId
}: {
    image: string,
    name: string,
    accountId: any,
    activeId: string,
    role: any,
    conversationId: any
}) {
    const { t } = useTranslation()
    const router = useRouter()
    const handleBrokenImage = (event: any) => {
        event.target.src = '/defaultUser.png'
    }
    const handleNavigateByClick = (id: any) => {
        nProgress.start()
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
                <p className='mb-1'>{name}</p>
                {
                    role === 'customer' ?
                        <Tag color='geekblue' className='flex items-center'
                            style={{
                                fontSize: 12,
                                fontWeight: 600,
                                display: 'flex',
                                alignItems: "center",
                                justifyContent: 'space-evenly',
                                width: 100
                            }}>
                            <PersonOutlineRoundedIcon sx={{ fontSize: 12 }} />
                            {t(`common:${role}`)}
                        </Tag>
                        :
                        <Tag color='#09d996' style={{
                            fontSize: 12,
                            fontWeight: 600,
                            display: 'flex',
                            alignItems: "center",
                            justifyContent: 'space-evenly',
                            width: 100
                        }}>
                            <HandshakeIcon sx={{ fontSize: 12 }} />
                            {t(`common:${role}`)}
                        </Tag>
                }
            </div>

        </div>
    )
}
