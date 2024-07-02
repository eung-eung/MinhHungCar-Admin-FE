'use client'

import { Button, Dropdown, Menu } from 'antd'
import React, { useEffect, useState } from 'react'
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import TopFilterTable from '@/app/components/TopFilterTable';
import useAxiosAuth from '@/app/utils/hooks/useAxiosAuth';
import ContractTable from './components/ContractTable';
import { ICustomerContract } from '@/app/models/CustomerContract';



export default function Contracts() {
    const axiosAuth = useAxiosAuth()
    const [refresh, setRefresh] = useState<boolean>(true)
    const [filter, setFilter] = useState<any>('ordered')
    const [contractData, setContractData] = useState<ICustomerContract[]>()

    const getListContractByStatus = async (status: any) => {
        const response = await axiosAuth.get(
            `admin/contracts?customer_contract_status=${status}&limit=100&offset=0`
        )
        setContractData(response.data.data.contracts)

    }
    useEffect(() => {
        getListContractByStatus(filter)
    }, [filter, refresh])



    const handleSearch = () => {

    }

    const handleChange = (e: string) => {
        setContractData([])
        setFilter(e)
    }
    return (
        <>
            <TopFilterTable
                setRefresh={setRefresh}
                placeholder='Tìm kiếm theo biển số xe/tên khách hàng'
                defaultValue='ordered'
                handleChange={handleChange}
                optionList={[
                    { label: 'Đã đặt', value: 'ordered' },
                    { label: 'Đang thuê', value: 'renting' },
                    { label: 'Hoàn thành', value: 'completed' },
                    { label: 'Đã hủy', value: 'canceled' },
                ]}
                handleSearch={handleSearch}
                showGarageConfig={false}

            />
            <ContractTable
                setRefresh={setRefresh}
                filter={filter}
                contractData={contractData}
            />
        </>
    )
}
