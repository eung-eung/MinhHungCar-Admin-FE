'use client'

import { Button, Dropdown, GetProp, Menu, Modal, Switch, Table, UploadFile, UploadProps } from 'antd'
import React, { useEffect, useState } from 'react'
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import { getBase64 } from '@/app/utils/getBase64';
import UploadImage from '../cars/components/Upload';
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

    const columns = [
        {
            title: 'Tên khách hàng',
            dataIndex: 'customerName',
            key: 'customerName',
        },
        {
            title: 'Biển số xe',
            dataIndex: 'carNumber',
            key: 'carNumber',
        },
        {
            title: 'Ngày nhận xe',
            dataIndex: 'startDate',
            key: 'startDate',
        },
        {
            title: 'Ngày trả xe',
            dataIndex: 'endDate',
            key: 'endDate',
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'phoneNumber',
            key: 'phoneNumber',
        },
        {
            title: 'Loại thế chấp',
            dataIndex: 'collateralType',
            key: 'collateralType',
        },
        {
            title: '',
            dataIndex: 'action',
            key: 'action',
            render: () => {
                return <div>
                    <Dropdown
                        dropdownRender={() => (
                            <Menu
                                items={[
                                    { key: '1', label: 'Chi tiết' },
                                    { key: '2', label: 'Hợp đồng' },
                                    { key: '3', label: 'Option 3' },
                                ]}>

                            </Menu>
                        )}

                        placement="bottom" arrow>
                        <Button><MoreHorizOutlinedIcon /></Button>
                    </Dropdown>
                </div>

            }

        },

    ]


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
