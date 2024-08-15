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
            {
                status === 'appraising_car_approved'
                &&
                <span className='ribbonAppraisingApproved'>{content}</span>
            }
            {
                status === 'appraising_car_rejected'
                &&
                <span className='ribbonAppraisingRejected'>{content}</span>
            }
            {
                status === 'returned_car'
                &&
                <span className='ribbonReturnedCar'>{content}</span>
            }
            {
                status === 'appraised_return_car'
                &&
                <span className='ribbonAppraisedReturnedCar'>{content}</span>
            }
            {
                status === 'pending_resolve'
                &&
                <span className='ribbonPendingResolve'>{content}</span>
            }
            {
                status === 'resolved'
                &&
                <span className='ribbonResolved'>{content}</span>
            }
        </>
    )
}
