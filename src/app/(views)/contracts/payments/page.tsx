'use client'

import { useEffect, useState } from 'react'
import ContractTable from '../components/ContractTable'
import useAxiosAuth from '@/app/utils/hooks/useAxiosAuth'
import { ICustomerContract } from '@/app/models/CustomerContract'

export default function Payments() {
    const axiosAuth = useAxiosAuth()
    const [refresh, setRefresh] = useState<boolean>(true)
    const [contractData, setContractData] = useState<ICustomerContract[]>()

    const getListContractByStatus = async () => {
        const response = await axiosAuth.get(
            `admin/contracts?customer_contract_status=renting&limit=100&offset=0`
        )
        setContractData(response.data.data.contracts)

    }
    useEffect(() => {
        getListContractByStatus()
    }, [refresh])
    return (
        <ContractTable
            setRefresh={setRefresh}
            filter='renting'
            contractData={contractData}
        />)
}
