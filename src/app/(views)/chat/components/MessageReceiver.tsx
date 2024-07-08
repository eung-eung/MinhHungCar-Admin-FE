import React from 'react'

export default function MessageReceiver({ content, image }: { content: any, image: any }) {
    const handleBrokenImage = (e: any) => {
        e.target.src = '/defaultUser.png'
    }
    return (
        <div className='flex items-center mt-5 mb-5 pl-3'>
            <img src={image} style={{
                width: 38,
                height: 38,
                objectFit: 'cover',
                borderRadius: "50%",
            }}
                onError={handleBrokenImage}
            />
            <p
                style={{
                    maxWidth: '80%',
                    background: "#efefef",
                    borderRadius: '18px',
                    padding: 7
                }}
                className='ml-4'>
                {content}
            </p>
        </div>
    )
}
