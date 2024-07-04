'use client'

import { useEffect, useState } from 'react'
import ContractTable from '../components/ContractTable'
import useAxiosAuth from '@/app/utils/hooks/useAxiosAuth'
import { ICustomerContract } from '@/app/models/CustomerContract'
import TopFilterTable from '@/app/components/TopFilterTable'

export default function Payments() {
    const axiosAuth = useAxiosAuth()
    const [refresh, setRefresh] = useState<boolean>(true)
    const [contractData, setContractData] = useState<ICustomerContract[]>()
    const [filter, setFilter] = useState<any>('renting')
    const [loading, setLoading] = useState<boolean>(true)
    const getListContractByStatus = async () => {
        setLoading(true)
        const response = await axiosAuth.get(
            `admin/contracts?customer_contract_status=${filter}&limit=100&offset=0`
        )
        setContractData(response.data.data.contracts)
        setLoading(false)
    }

    const handleChange = (e: string) => {
        setLoading(true)
        setContractData([])
        setFilter(e)
        setLoading(true)
    }
    useEffect(() => {
        getListContractByStatus()
    }, [refresh, filter])
    return (
        <>
            <TopFilterTable
                setRefresh={setRefresh}
                placeholder='Tìm kiếm theo biển số xe/tên khách hàng'
                defaultValue='renting'
                optionList={[
                    { label: 'Đang thuê', value: 'renting' },
                    { label: 'Hoàn thành', value: 'completed' },
                ]}
                showGarageConfig={false}
                handleChange={handleChange}
            />
            <ContractTable
                loading={loading}
                setRefresh={setRefresh}
                filter={filter}
                contractData={contractData}
            />
        </>
    )
}
