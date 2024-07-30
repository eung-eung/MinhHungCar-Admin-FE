'use client'

import { useEffect, useState } from 'react'
import ContractTable from '../components/ContractTable'
import useAxiosAuth from '@/app/utils/hooks/useAxiosAuth'
import { ICustomerContract } from '@/app/models/CustomerContract'
import TopFilterTable from '@/app/components/TopFilterTable'
import { IContractRule } from '@/app/models/ContractRule'
import { Button, InputNumber } from 'antd'
import Item from './components/Item'
type Error = {
    revenueSharing: boolean,
    maxWarningCount: boolean,
    insurancePercent: boolean,
    prepayPercent: boolean,
    collateralCashAmount: boolean
}
export default function Setting() {
    const axiosAuth = useAxiosAuth()
    const [contractRules, setContractRules] = useState<IContractRule>()
    const [loading, setLoading] = useState<boolean>(true)
    const [rulesBody, setRulesBody] = useState<any>()
    const [updateLoading, setUpdateLoading] = useState<boolean>(false)
    const [errors, setErrors] = useState<Error | any>({
        revenueSharing: false,
        maxWarningCount: false,
        insurancePercent: false,
        prepayPercent: false,
        collateralCashAmount: false
    })
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
    const handleUpdateContractRules = async () => {

        if (errors.revenueSharing
            || errors.maxWarningCount
            || errors.collateralCashAmount
            || errors.prepayPercent
            || errors.insurancePercent
        ) {
            console.log('invalid');
            return
        }
        if (rulesBody) {
            console.log('rulesBody: ', rulesBody);
            console.log('call api');
            try {
                setUpdateLoading(true)
                const response = await axiosAuth.put('/admin/contract_rule', {
                    rule_id: 1,
                    insurance_percent: rulesBody.insurancePercent,
                    prepay_percent: rulesBody.prepayPercent,
                    revenue_sharing_percent: rulesBody.revenueSharing,
                    collateral_cash_amount: rulesBody.collateralCashAmount,
                    max_warning_count: rulesBody.maxWarningCount
                })
                setUpdateLoading(false)
            } catch (error) {
                console.log(error);
                setUpdateLoading(false)
            }



        }
    }
    const handleChangeRevenueSharingPercent = (e: any) => {
        if (e === null) {
            console.log('error');
            setErrors((prev: any) => ({
                ...prev,
                revenueSharing: true
            }))
        } else {
            setErrors((prev: any) => ({
                ...prev,
                revenueSharing: false
            }))
            setRulesBody((prev: any) => ({
                ...prev,
                revenueSharing: e
            }))
        }
    }
    const handleChangeMaxWarningCount = (e: any) => {
        if (e === null) {
            console.log('error');
            setErrors((prev: any) => ({
                ...prev,
                maxWarningCount: true
            }))
        } else {
            setErrors((prev: any) => ({
                ...prev,
                maxWarningCount: false
            }))
            setRulesBody((prev: any) => ({
                ...prev,
                maxWarningCount: e
            }))
        }

    }

    const handleChangeInsurancePercent = (e: any) => {
        console.log(e);
        if (e === null) {
            console.log('error');
            setErrors((prev: any) => ({
                ...prev,
                insurancePercent: true
            }))
        } else {
            setErrors((prev: any) => ({
                ...prev,
                insurancePercent: false
            }))
            setRulesBody((prev: any) => ({
                ...prev,
                insurancePercent: e
            }))
        }
    }

    const handleChangePrepayPercent = (e: any) => {
        console.log(e);
        if (e === null) {
            console.log('error');
            setErrors((prev: any) => ({
                ...prev,
                prepayPercent: true
            }))
        } else {
            setErrors((prev: any) => ({
                ...prev,
                prepayPercent: false
            }))
            setRulesBody((prev: any) => ({
                ...prev,
                prepayPercent: e
            }))
        }
    }

    const handleChangeCollateralCashAmount = (e: any) => {
        console.log(e);
        if (e === null) {
            console.log('error');
            setErrors((prev: any) => ({
                ...prev,
                collateralCashAmount: true
            }))
        } else {
            setErrors((prev: any) => ({
                ...prev,
                collateralCashAmount: false
            }))
            setRulesBody((prev: any) => ({
                ...prev,
                collateralCashAmount: e
            }))
        }
    }

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
                                status={errors.revenueSharing && 'error'}
                                defaultValue={contractRules?.revenue_sharing_percent}
                                min={0}
                                max={100}
                                formatter={(value) => `${value}%`}
                                parser={(value) => value?.replace('%', '') as unknown as number}
                                onChange={handleChangeRevenueSharingPercent}
                            />
                        }
                    />
                    <Item
                        loading={loading}
                        title='Số lần tối đa giao xe trễ'
                        data={
                            <InputNumber
                                status={errors.maxWarningCount && 'error'}
                                min={0}
                                defaultValue={contractRules?.max_warning_count}
                                onChange={handleChangeMaxWarningCount}
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
                                status={errors.insurancePercent && 'error'}
                                defaultValue={contractRules?.insurance_percent}
                                min={0}
                                max={100}
                                formatter={(value) => `${value}%`}
                                parser={(value) => value?.replace('%', '') as unknown as number}
                                onChange={handleChangeInsurancePercent}
                            />
                        }
                    />
                    <Item
                        loading={loading}
                        title='Phần trăm đặt cọc'
                        data={
                            <InputNumber<number>
                                status={errors.prepayPercent && 'error'}
                                defaultValue={contractRules?.prepay_percent}
                                min={0}
                                max={100}
                                formatter={(value) => `${value}%`}
                                parser={(value) => value?.replace('%', '') as unknown as number}
                                onChange={handleChangePrepayPercent}
                            />
                        }
                    />
                    <Item
                        loading={loading}
                        title='Số tiền thế chấp'
                        data={
                            <InputNumber<number>
                                status={errors.collateralCashAmount && 'error'}
                                style={{
                                    width: "200px"
                                }}
                                defaultValue={contractRules?.collateral_cash_amount}
                                formatter={(value) => `${value}đ`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                parser={(value) => value?.replace(/\đ\s?|(,*)/g, '') as unknown as number}
                                onChange={handleChangeCollateralCashAmount}
                            />
                        }
                    />
                </div>
            </div>
            <Button loading={updateLoading} onClick={handleUpdateContractRules}>Lưu</Button>
        </div>
    )
}
