import React from 'react'

export default function Ribbon({ status, content }: { status: any, content: any }) {
    return (
        <>
            {
                status === 'completed'
                &&
                <span className='ribbonCompleted'>{content}</span>
            }
            {
                status === 'ordered'
                &&
                <span className='ribbonOrdered'>{content}</span>
            }
            {
                status === 'renting'
                &&
                <span className='ribbonRenting'>{content}</span>
            }
            {
                status === 'canceled'
                &&
                <span className='ribbonCanceled'>{content}</span>
            }
        </>
    )
}
