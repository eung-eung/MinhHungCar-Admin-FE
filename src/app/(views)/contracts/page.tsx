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
    const [searchValue, setSearchValue] = useState<any>()
    const [loading, setLoading] = useState<boolean>(true)
    const getListContractByStatus = async (status: any, searchValue: any) => {
        try {
            setLoading(true)
            if (searchValue) {
                const response = await axiosAuth.get(
                    `admin/contracts?customer_contract_status=${status}&search_param=${searchValue}&limit=100&offset=0`
                )
                setContractData(response.data.data.contracts)
            } else {
                const response = await axiosAuth.get(
                    `admin/contracts?customer_contract_status=${status}&limit=100&offset=0`
                )
                setContractData(response.data.data.contracts)
            }


            setLoading(false)
        } catch (error) {
            console.log(error);
            setLoading(false)
        }

    }
    useEffect(() => {
        if (!searchValue) {
            getListContractByStatus(filter, searchValue)
        } else {
            const getData = setTimeout(() => {
                getListContractByStatus(filter, searchValue)
            }, 500)
            return () => clearTimeout(getData)
        }
    }, [filter, refresh, searchValue])



    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value)
    }

    const handleChange = (e: string) => {
        setLoading(true)
        setContractData([])
        setFilter(e)
        setLoading(false)
        setSearchValue('')
    }
    return (
        <>
            <TopFilterTable
                setRefresh={setRefresh}
                placeholder='Tìm kiếm theo biển số xe/số điện thoại của khách hàng'
                defaultValue='ordered'
                handleChange={handleChange}
                showSearch={true}
                optionList={[
                    { label: 'Đã đặt', value: 'ordered' },
                    { label: 'Đủ điều kiện bàn giao', value: 'appraising_car_approved' },
                    { label: 'Đang thuê', value: 'renting' },
                    { label: 'Đã trả xe', value: 'returned_car' },
                    { label: 'Hoàn thành kiểm tra', value: 'appraised_return_car' },
                    { label: 'Hoàn thành', value: 'completed' },
                    { label: 'Đang xử lí sự cố', value: 'pending_resolve' },
                    { label: 'Không đủ điều kiện', value: 'appraising_car_rejected' },
                    { label: 'Đã hủy', value: 'canceled' },
                    { label: 'Đã xử lí sự cố', value: 'resolved' },
                ]}
                handleSearch={handleSearch}
                showGarageConfig={false}

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
