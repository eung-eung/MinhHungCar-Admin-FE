'use client'

import React, { useEffect, useState } from 'react'
import { IAccount } from '@/app/models/Account.model';
import TopFilterTable from '@/app/components/TopFilterTable';
import useAxiosAuth from '@/app/utils/hooks/useAxiosAuth';
import AccountTable from './components/AccountTable'
export default function Account() {
    const [open, setOpen] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const [accountData, setAccountData] = useState<IAccount[]>([])
    const [filter, setFilter] = useState<string>('all')
    const [refresh, setRefresh] = useState<boolean>(true)
    const axiosAuth = useAxiosAuth()
    const [searchValue, setSearchValue] = useState<string>()
    // useEffect(() => {
    //     getAccountData()
    // }, [filter, refresh])

    useEffect(() => {
        if (!searchValue) {
            getAccountData()
            return
        }
        const getData = setTimeout(async () => {
            setLoading(true)
            const query = filter === 'all' ?
                `/admin/accounts?search_param=${searchValue}&offset=0&limit=100`
                : `/admin/accounts?role=${filter}&search_param=${searchValue}&offset=0&limit=100`
            const getAccountsBySearch = await axiosAuth.get(query)
            setAccountData(getAccountsBySearch.data.data)
            setLoading(false)
        }, 1000)
        return () => clearTimeout(getData)
    }, [searchValue, filter, refresh])


    const getAccountData = async () => {
        setAccountData([])
        setLoading(true)
        const response = await axiosAuth.get(
            `/admin/accounts?${filter === 'all' ? '' : `role=${filter}&`}offset=0&limit=100`
        )
        setAccountData(response.data.data)
        setLoading(false)
    }

    const showLoading = () => {
        setOpen(true);
        setLoading(true);

        // Simple loading mock. You should add cleanup logic in real world.
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    };
    const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value)

    }
    const handleShowDialog = () => {
        showLoading()

    }
    const handleChange = (e: string) => {
        setFilter(e)
        setSearchValue('')

    }
    return (
        <div className={'flex flex-col'}>
            <TopFilterTable
                searchValue={searchValue}
                handleSearch={handleSearch}
                setRefresh={setRefresh}
                handleChange={handleChange}
                placeholder='Tìm kiếm theo họ và tên/email/số điện thoại'
                defaultValue='all'
                optionList={[
                    { value: 'all', label: "Tất cả" },
                    { value: 'customer', label: "Khách hàng" },
                    { value: 'partner', label: "Đối tác" },

                ]}
                showDatepicker={false}
                showGarageConfig={false}
                showSearch={true}
            />
            <div className='flex justify-end mt-5'>
                {/* <SearchInput callback={handleSearch} placeholder='Tìm kiếm theo họ và tên/email/số điện thoại' /> */}
            </div>
            <AccountTable
                accountData={accountData}
                filter={filter}
                loading={loading}
                setRefresh={setRefresh}
            />

        </div>
    )
}
