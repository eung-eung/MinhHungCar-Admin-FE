'use client'
import TopFilterTable from '@/app/components/TopFilterTable'
import React, { useEffect, useState } from 'react'
import PaymentTable from './components/PaymentTable'
import dayjs from 'dayjs'
import useAxiosAuth from '@/app/utils/hooks/useAxiosAuth'
import { IPayment } from '@/app/models/Payment.model'

export default function Payments() {
    const axiosAuth = useAxiosAuth()
    const [refresh, setRefresh] = useState<boolean>(true)
    const [payments, setPayments] = useState<IPayment[]>()
    const [datepick, setDatepick] = useState<any>(new Date())
    const [loading, setLoading] = useState<boolean>(true)
    const [filter, setFilter] = useState<any>('paid')
    const handleChangeDatepick = async (date: any) => {
        setLoading(true)
        setDatepick(new Date(date))
        const startDate = dayjs(date).startOf('month')
        const endDate = dayjs(date).endOf('month')
        const formattedUtcStartDate = startDate.format('YYYY-MM-DDTHH:mm:ss');
        const formattedUtcEndDate = endDate.format('YYYY-MM-DDTHH:mm:ss');
        try {
            const response = await axiosAuth
                .get(`/admin/monthly_partner_payments?start_date=${formattedUtcStartDate + 'Z'}&end_date=${formattedUtcEndDate + 'Z'}&status=${filter}&offset=0&limit=100`)
            setPayments(response.data.data)
            setLoading(false)
        } catch (error) {
            console.log('error: ', error);
            setLoading(false)
        }
    }
    const handleChange = (e: string) => {
        setFilter(e)
    }
    useEffect(() => {
        handleChangeDatepick(datepick)
    }, [filter])
    return (
        <>
            <TopFilterTable
                datepick={datepick}
                searchValue='a'
                setRefresh={setRefresh}
                handleChangeDatepick={handleChangeDatepick}
                handleChange={handleChange}
                optionList={[
                    {
                        value: 'pending',
                        label: 'Chờ thanh toán'
                    },
                    {
                        value: "paid",
                        label: 'Đã thanh toán'
                    }
                ]}
                defaultValue={filter}
                showSearch={false}
                showDatepicker={true}
            />
            <PaymentTable
                loading={loading}
                payments={payments} />
        </>
    )
}
