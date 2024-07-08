import React from 'react'

export default function MessageSender(
    { content }: { content: any }
) {
    return (
        <div className='flex items-center justify-end mt-5 mb-5'>
            <p
                style={{
                    maxWidth: '80%',
                    background: "conic-gradient(at right center, rgb(199, 210, 254), rgb(71, 85, 105), rgb(199, 210, 254))",
                    borderRadius: '18px',
                    padding: 7,
                    color: "#fff"
                }}
                className='ml-4 mr-4'>
                {content}
            </p>
        </div>
    )
}
