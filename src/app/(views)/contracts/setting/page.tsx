'use client'

import { useEffect, useState } from 'react'
import ContractTable from '../components/ContractTable'
import useAxiosAuth from '@/app/utils/hooks/useAxiosAuth'
import { ICustomerContract } from '@/app/models/CustomerContract'
import TopFilterTable from '@/app/components/TopFilterTable'
import { IContractRule } from '@/app/models/ContractRule'
import { Button, InputNumber } from 'antd'
import Item from './components/Item'

export default function Setting() {
    const axiosAuth = useAxiosAuth()
    const [contractRules, setContractRules] = useState<IContractRule>()
    const [loading, setLoading] = useState<boolean>(true)
    const getContractRules = async () => {
        try {
            setLoading(true)
            const response = await axiosAuth.get('/admin/contract_rule')
            setContractRules(response.data.data)
            setLoading(false)
        } catch (error) {
            setLoading(false)
        }
    }
    useEffect(() => {
        getContractRules()
    }, [])
    return (
        <div style={{
            background: "#fff",
            padding: 20,
            marginTop: 5,
            borderRadius: 5,

        }}
            className='shadow-sm'
        >
            <div>
                <div>
                    <h1
                        style={{
                            fontSize: 20,
                            fontWeight: 600,
                            marginBottom: 10
                        }}
                    >Đối tác
                    </h1>
                    <Item
                        loading={loading}
                        title='Phần trăm chia sẻ doanh thu'
                        data={
                            <InputNumber<number>
                                defaultValue={contractRules?.revenue_sharing_percent}
                                min={0}
                                max={100}
                                formatter={(value) => `${value}%`}
                                parser={(value) => value?.replace('%', '') as unknown as number}
                            />
                        }
                    />
                    <Item
                        loading={loading}
                        title='Số lần tối đa giao xe trễ'
                        data={
                            <InputNumber
                                min={1}
                                defaultValue={contractRules?.max_warning_count}
                            // onChange={onChange}
                            />}

                    />
                </div>
                <div>
                    <h1
                        style={{
                            fontSize: 20,
                            fontWeight: 600,
                            marginBottom: 10
                        }}
                    >
                        Khách hàng
                    </h1>
                    <Item
                        loading={loading}
                        title='Phần trăm phí bảo hiểm'
                        data={
                            <InputNumber<number>
                                defaultValue={contractRules?.insurance_percent}
                                min={0}
                                max={100}
                                formatter={(value) => `${value}%`}
                                parser={(value) => value?.replace('%', '') as unknown as number}
                            />
                        }
                    />
                    <Item
                        loading={loading}
                        title='Phần trăm đặt cọc'
                        data={
                            <InputNumber<number>
                                defaultValue={contractRules?.prepay_percent}
                                min={0}
                                max={100}
                                formatter={(value) => `${value}%`}
                                parser={(value) => value?.replace('%', '') as unknown as number}
                            // onChange={onChange}
                            />
                        }
                    />
                    <Item
                        loading={loading}
                        title='Số tiền thế chấp'
                        data={
                            <InputNumber<number>
                                style={{
                                    width: "200px"
                                }}
                                defaultValue={contractRules?.collateral_cash_amount}
                                formatter={(value) => `${value}đ`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                parser={(value) => value?.replace(/\đ\s?|(,*)/g, '') as unknown as number}
                            // onChange={onChange}
                            />
                        }
                    />
                </div>
            </div>
            <Button>Lưu</Button>
        </div>
    )
}
