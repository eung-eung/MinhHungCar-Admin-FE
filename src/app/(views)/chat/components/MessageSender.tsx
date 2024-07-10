import React from 'react'

export default function MessageSender(
    { content }: { content: any }
) {
    return (
        <div className="chat chat-end">
            <div className="chat-bubble" style={{
            }}> {content}</div>
        </div>
    )
}
