import React from 'react'
import classes from './index.module.css'
import MessageReceiver from './MessageReceiver'
import MessageSender from './MessageSender'
import SendRoundedIcon from '@mui/icons-material/SendRounded';
export default function ChatZone() {
    return (
        <>
            <div className={classes.headerChat}>
                <img src='/avatarSample.jpg' className={classes.imgAvatar} />
                <div className='ml-3'>
                    <p className='font-bold'>G-dragon</p>
                </div>
            </div>
            <div className={classes.chatZone}>
                <MessageReceiver />
                <MessageSender />
                <MessageReceiver />
                <MessageSender />
                <MessageSender />
                <MessageReceiver />
                <MessageSender />
                <MessageReceiver />
                <MessageSender />
                <MessageSender />
                <MessageReceiver />
                <MessageSender />
                <MessageReceiver />
                <MessageSender />
                <MessageSender />
                <MessageReceiver />
            </div>
            <div
                style={{
                    width: "100%",
                    border: "1px solid #efefef",
                    borderRadius: 18,
                    outline: 'none',
                    padding: 6,
                    paddingLeft: 10,
                    position: "absolute",
                    bottom: 0
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
                    a                </p>
                <div style={{
                    width: "10%",
                    position: 'absolute',
                    right: 0,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    textAlign: 'right'
                }}>
                    <SendRoundedIcon sx={{
                        color: "#6C69FF",
                        marginRight: '10px',
                        cursor: "pointer"
                    }} />
                </div>
            </div>
        </>
    )
}
