import React, { useEffect, useRef, useState } from 'react'
import classes from './index.module.css'
import MessageReceiver from './MessageReceiver'
import MessageSender from './MessageSender'
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import { IAccount } from '@/app/models/Account.model';
import { useSession } from 'next-auth/react';

const MessageTypes = {
    USER_JOIN: "USER_JOIN",
    ADMIN_JOIN: "ADMIN_JOIN",
    TEXTING: "TEXTING",
    SYSTEM_USER_JOIN_RESPONSE: "SYSTEM_USER_JOIN_RESPONSE",
    ERROR: "ERROR",
};

export default function ChatZone(
    {
        user,
        messages,
        conversationtId,
        setMessages
    }: {
        user?: IAccount,
        messages: any,
        conversationtId: string,
        setMessages: any
    }) {
    const handleBrokenImage = (e: any) => {
        e.target.src = '/defaultUser.png'
    }
    const scrollBar = useRef<HTMLDivElement>(null)
    const [conversationId, setConversationId] = useState<string>(conversationtId)
    const { data: session } = useSession()
    const ws = useRef<WebSocket>(new WebSocket('wss://minhhungcar.xyz/chat')).current;
    const chatBox = useRef<HTMLParagraphElement>(null)
    const soundAudioRef = useRef<HTMLAudioElement>(null)
    useEffect(() => {
        ws.onopen = () => {
            console.log('open ws');
            ws.send(JSON.stringify({
                msg_type: MessageTypes.ADMIN_JOIN,
                access_token: `Bearer ${session?.access_token}`,
                conversation_id: 82
            }));
        };

        ws.onerror = (e: any) => {
            console.log('error:', e.message);

        };
        ws.onmessage = (e) => {
            console.log('ws on message');
            console.log(JSON.parse(e.data));

            const data = JSON.parse(e.data)
            if (data.sender === 'system') {
                return
            }
            if (data.sender === 'customer') {
                soundAudioRef.current?.play()
            }
            setMessages((prev: any) => ([

                ...prev,
                {
                    content: data.content,
                    sender: data.sender === "admin" ? 1 : data.sender
                },
            ]))

        };
    }, []);

    const handleSubmit = () => {
        if (ws && chatBox.current) {
            if (chatBox.current.innerText === '') {
                return
            }
            ws.send(JSON.stringify({
                msg_type: MessageTypes.TEXTING,
                content: chatBox.current.innerText,
                conversation_id: parseInt(conversationId),
                access_token: `Bearer ${session?.access_token}`,
            }));
            chatBox.current.innerText = ''
        }
    }
    const handleKeyDown = (event: any) => {

        if (event.key === 'Enter' && chatBox.current?.innerText.trim() !== '') {
            event.preventDefault()
            handleSubmit()
        }
        if (event.key === 'Enter' && chatBox.current?.innerText.trim() === '') {
            event.preventDefault()
        }
    }
    useEffect(() => {
        if (scrollBar.current) {
            scrollBar.current.scrollTo(0, scrollBar.current.scrollHeight);
        }
    }, [messages]);
    return (
        <>
            <div className={classes.headerChat}>
                <audio ref={soundAudioRef} id="mySound" src="/soundNoti.mp3"></audio>
                <img
                    onError={handleBrokenImage}
                    src={user?.avatar_url}
                    className={classes.imgAvatar} />
                <div className='ml-3'>
                    <p className='font-bold'>
                        {user?.last_name + ' ' + user?.first_name}
                    </p>
                </div>
            </div>
            <div
                ref={scrollBar}
                className={classes.chatZone}>
                {messages.map((message: any, index: number) => {
                    if (message.sender === 1)
                        return <MessageSender
                            key={index}
                            content={message.content} />
                    if (message.sender !== 1)
                        return <MessageReceiver
                            image={user?.avatar_url}
                            key={index}
                            content={message.content} />
                })}


            </div>
            <div
                style={{
                    position: 'relative',
                    // height: "15%"
                    margin: "16px 22px"
                }}>
                <div
                    style={{
                        background: "#fff",
                        width: "100%",
                        border: "1px solid #efefef",
                        borderRadius: 18,
                        outline: 'none',
                        padding: 6,
                        paddingLeft: 10,
                    }}
                >
                    <p
                        onKeyDown={handleKeyDown}
                        ref={chatBox}
                        style={{
                            outline: 'none',
                            width: '90%',
                            overflowY: 'auto',
                            maxHeight: '50px'
                        }}
                        aria-describedby='MMM'
                        contentEditable="true">

                    </p>
                    <div
                        onClick={handleSubmit}
                        style={{
                            width: "10%",
                            position: 'absolute',
                            right: 0,
                            top: '50%',
                            transform: 'translateY(-50%)',
                            textAlign: 'right'
                        }}>
                        <SendRoundedIcon
                            sx={{
                                color: "#6C69FF",
                                marginRight: '10px',
                                cursor: "pointer"
                            }} />
                    </div>
                </div>
            </div>
        </>
    )
}
