'use client'

import { IPayment } from '@/app/models/Payment.model';
import useAxiosAuth from '@/app/utils/hooks/useAxiosAuth';
import { useEffect, useState } from 'react'

export default function PaymentDetail({
    params: { contractIdSlug }
}: {
    params: { contractIdSlug: any }
}) {
    const axiosAuth = useAxiosAuth()
    const [listPayment, setListPayment] = useState<IPayment[]>()
    const paymentDetailByContractId = async (id: any) => {
        const response = await axiosAuth.get('/admin/customer_payments?customer_contract_id=' + id)
        setListPayment(response.data.data)
    }
    useEffect(() => {
        paymentDetailByContractId(contractIdSlug)
    }, [contractIdSlug])
    return (
        <div>page</div>
    )
}
