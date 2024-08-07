import React from 'react'

export default function MessageSender(
    { content }: { content: any }
) {
    return (
        <div className="chat chat-end">
            <div className="chat-bubble" style={{
                background: '#6C69FF',
                color: '#fff'
            }}> {content}</div>
        </div>
    )
}
