import React from 'react'

export default function MessageReceiver({ content, image }: { content: any, image: any }) {
    const handleBrokenImage = (e: any) => {
        e.target.src = '/defaultUser.png'
    }
    return (
        <>
            <>
                <div className="chat chat-start">
                    <div className="chat-image avatar">
                        <div className="w-10 rounded-full">
                            <img
                                onError={handleBrokenImage}
                                alt="Tailwind CSS chat bubble component"
                                src={image} />
                        </div>
                    </div>
                    <div className="chat-bubble" style={{
                        background: "#efefef",
                        color: "#000000"
                    }}>{content}</div>
                </div>
            </>
        </>
        // <div className='flex items-center mt-5 mb-5 pl-3'>
        //     <img src={image} style={{
        //         width: 38,
        //         height: 38,
        //         objectFit: 'cover',
        //         borderRadius: "50%",
        //     }}
        //         onError={handleBrokenImage}
        //     />
        //     <p
        //         style={{
        //             maxWidth: '80%',
        //             background: "#efefef",
        //             borderRadius: '18px',
        //             padding: 7
        //         }}
        //         className='ml-4'>
        //         {content}
        //     </p>
        // </div>
    )
}
