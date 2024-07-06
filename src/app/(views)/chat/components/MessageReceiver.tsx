import React from 'react'

export default function MessageReceiver() {
    return (
        <div className='flex items-center mt-5 mb-5'>
            <img src='/avatarSample.jpg' style={{
                width: 28,
                height: 28,
                objectFit: 'cover',
                borderRadius: "50%",
            }} />
            <p
                style={{
                    maxWidth: '80%',
                    background: "#efefef",
                    borderRadius: '18px',
                    padding: 7
                }}
                className='ml-4'>
                asdasdasad     asdasdasad     asdasdasad     asdasdasad     asdasdasad     asdasdasad     asdasdasad
            </p>
        </div>
    )
}
