import Image from 'next/image'
import React, { SetStateAction } from 'react'

export default function QRPaymentDialog(
    {
        setRefresh,
        setOpen,
        id,
        paymentUrl

    }: {
        setRefresh: React.Dispatch<SetStateAction<boolean>>,
        setOpen: React.Dispatch<SetStateAction<boolean>>,
        id: any,
        paymentUrl: any
    }
) {
    return (
        <div>
            <a style={{
                width: '50%',
                padding: 20,
                border: '1px solid #ccc',
                display: 'block',
                borderRadius: 10,
            }} href={paymentUrl}>
                <Image src='/logo-primary.svg' width={100} height={100} alt='vnpay' />
            </a>
            {/* <img src={paymentUrl} /> */}
        </div>
    )
}
