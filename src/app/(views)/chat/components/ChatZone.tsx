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
        conversationtId
    }: {
        user?: IAccount,
        messages: any,
        conversationtId: any
    }) {
    const handleBrokenImage = (e: any) => {
        e.target.src = '/defaultUser.png'
    }

    const scrollBar = useRef<HTMLDivElement>(null)
    const [conversationId, setConversationId] = useState<any>()
    const { data: session } = useSession()
    const socketRef = useRef<WebSocket | null>(null);
    useEffect(() => {
        if (!socketRef.current) {
            const webSocket = new WebSocket('wss://minhhungcar.xyz/chat')
            console.log(webSocket.CONNECTING);
            webSocket.addEventListener('open', event => {
                console.log(event);
                webSocket.send(JSON.stringify({
                    msg_type: MessageTypes.ADMIN_JOIN,
                    access_token: `Bearer ${session?.access_token}`,
                    conversation_id: conversationtId,
                }))
            })
            webSocket.addEventListener('message', e => {
                console.log('message: ', e);

            })
            //     webSocket.onopen = (data) => {
            //         console.log('WebSocket connection opened', data);
            //         webSocket.send(JSON.stringify({
            //             msg_type: MessageTypes.ADMIN_JOIN,
            //             access_token: `Bearer ${session?.access_token}`,
            //             conversation_id: conversationtId,
            //         }))

            //     };
            //     socketRef.current = webSocket;
            // }

            // socketRef.current.onmessage = (e) => {
            //     // const data = JSON.parse(e.data);
            //     console.log('Received message:', e);
            //     // handleResponse(data);

        };

        return () => socketRef.current?.close();
    }, []);

    const handleSubmit = () => {
        if (socketRef.current) {
            console.log('click');
            socketRef.current.send(JSON.stringify({
                msg_type: MessageTypes.TEXTING,
                content: "sadasdasd",
                conversation_id: conversationId,
                access_token: `Bearer ${session?.access_token}`,
            }));
        }
    }

    useEffect(() => {
        if (scrollBar.current) {
            scrollBar.current.scrollTo(0, scrollBar.current.scrollHeight);
        }
    }, []);
    return (
        <>
            <div className={classes.headerChat}>
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
                {messages.map((message: any) => {
                    if (message.sender === 1)
                        return <MessageSender
                            key={message.id}
                            content={message.content} />
                    if (message.sender !== 1)
                        return <MessageReceiver
                            image={message.account.avatar_url}
                            key={message.id}
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
