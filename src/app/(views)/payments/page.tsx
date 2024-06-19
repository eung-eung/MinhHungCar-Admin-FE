'use client'
import TopFilterTable from '@/app/components/TopFilterTable'
import React from 'react'
import PaymentTable from './components/PaymentTable'

export default function Payments() {

    const handleChange = () => {

    }

    return (
        <>
            <TopFilterTable
                handleChange={handleChange}
                optionList={[
                    {
                        value: 'waiting_payment',
                        label: 'Chờ thanh toán'
                    },
                    {
                        value: "complete",
                        label: 'Đã thanh toán'
                    }
                ]}
                defaultValue='waiting_payment'
                showSearch={false}
                showDatepicker={true}
            />
            <PaymentTable />
        </>
    )
}
