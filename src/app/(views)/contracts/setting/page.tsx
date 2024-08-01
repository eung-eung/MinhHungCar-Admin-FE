'use client'

import { useEffect, useState } from 'react'
import ContractTable from '../components/ContractTable'
import useAxiosAuth from '@/app/utils/hooks/useAxiosAuth'
import { ICustomerContract } from '@/app/models/CustomerContract'
import TopFilterTable from '@/app/components/TopFilterTable'
import { ICustomerContractRule, IPartnerContractRule } from '@/app/models/ContractRule'
import { Button, InputNumber } from 'antd'
import Item from './components/Item'
import { sucessNotify } from '@/app/utils/toast'
type Error = {
    revenueSharing: boolean,
    maxWarningCount: boolean,
    insurancePercent: boolean,
    prepayPercent: boolean,
    collateralCashAmount: boolean
}
export default function Setting() {
    const axiosAuth = useAxiosAuth()
    const [customerContractRules, setCustomerContractRules] = useState<ICustomerContractRule>()
    const [partnerContractRules, setPartnerContractRules] = useState<IPartnerContractRule>()
    const [customerContractRulesloading, setCustomerContractRulesloading] = useState<boolean>(true)
    const [partnerContractRulesloading, setPartnerContractRulesloading] = useState<boolean>(true)
    const [rulesBody, setRulesBody] = useState<any>()
    const [customerUpdateLoading, setCustomerUpdateLoading] = useState<boolean>(false)
    const [partnerUpdateLoading, setPartnerUpdateLoading] = useState<boolean>(false)
    const [errors, setErrors] = useState<Error | any>({
        revenueSharing: false,
        maxWarningCount: false,
        insurancePercent: false,
        prepayPercent: false,
        collateralCashAmount: false
    })
    const getCustomerContractRules = async () => {
        try {
            setCustomerContractRulesloading(true)
            const response = await axiosAuth.get('/admin/customer_contract_rule')
            setCustomerContractRules(response.data.data)
            setCustomerContractRulesloading(false)
        } catch (error) {
            setCustomerContractRulesloading(false)
        }
    }
    const getPartnerContractRules = async () => {
        try {
            console.log('3');

            setPartnerContractRulesloading(true)
            const response = await axiosAuth.get('/admin/partner_contract_rule')
            setPartnerContractRules(response.data.data)
            setPartnerContractRulesloading(false)
        } catch (error) {
            setPartnerContractRulesloading(false)
        }
    }
    useEffect(() => {
        getCustomerContractRules()
        getPartnerContractRules()
    }, [])

    const handleUpdatePartnerContractRules = async () => {
        if (
            errors.revenueSharing
            || errors.maxWarningCount
        ) {
            console.log('invalid');
            return
        }
        if (rulesBody) {
            try {
                setPartnerUpdateLoading(true)
                const response = await axiosAuth.post('/admin/partner_contract_rule', {
                    revenue_sharing_percent: rulesBody.revenueSharing || partnerContractRules?.revenue_sharing_percent,
                    max_warning_count: rulesBody.maxWarningCount || partnerContractRules?.max_warning_count,
                })
                setPartnerUpdateLoading(false)
                sucessNotify('Cập nhật hợp đồng đối tác thành công')
            } catch (error) {
                console.log(error);
                setPartnerUpdateLoading(false)
            }
        }
    }

    const handleUpdateCustomerContractRules = async () => {

        if (
            errors.collateralCashAmount
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
                setCustomerUpdateLoading(true)
                const response = await axiosAuth.post('/admin/customer_contract_rule', {
                    insurance_percent: rulesBody.insurancePercent || customerContractRules?.insurance_percent,
                    prepay_percent: rulesBody.prepayPercent || customerContractRules?.prepay_percent,
                    collateral_cash_amount: rulesBody.collateralCashAmount || customerContractRules?.collateral_cash_amount,
                })
                setCustomerUpdateLoading(false)
                sucessNotify('Cập nhật hợp đồng khách hàng thành công')
            } catch (error) {
                console.log(error);
                setCustomerUpdateLoading(false)
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
                        loading={partnerContractRulesloading}
                        title='Phần trăm chia sẻ doanh thu'
                        data={
                            <InputNumber<number>
                                status={errors.revenueSharing && 'error'}
                                defaultValue={partnerContractRules?.revenue_sharing_percent}
                                min={0}
                                max={100}
                                formatter={(value) => `${value}%`}
                                parser={(value) => value?.replace('%', '') as unknown as number}
                                onChange={handleChangeRevenueSharingPercent}
                            />
                        }
                    />
                    <Item
                        loading={partnerContractRulesloading}
                        title='Số lần tối đa giao xe trễ'
                        data={
                            <InputNumber
                                status={errors.maxWarningCount && 'error'}
                                min={0}
                                defaultValue={partnerContractRules?.max_warning_count}
                                onChange={handleChangeMaxWarningCount}
                            />}

                    />
                    <Button
                        className='mb-5'
                        loading={partnerUpdateLoading}
                        onClick={handleUpdatePartnerContractRules}>
                        Lưu
                    </Button>

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
                        loading={customerContractRulesloading}
                        title='Phần trăm phí bảo hiểm'
                        data={
                            <InputNumber<number>
                                status={errors.insurancePercent && 'error'}
                                defaultValue={customerContractRules?.insurance_percent}
                                min={0}
                                max={100}
                                formatter={(value) => `${value}%`}
                                parser={(value) => value?.replace('%', '') as unknown as number}
                                onChange={handleChangeInsurancePercent}
                            />
                        }
                    />
                    <Item
                        loading={customerContractRulesloading}
                        title='Phần trăm đặt cọc'
                        data={
                            <InputNumber<number>
                                status={errors.prepayPercent && 'error'}
                                defaultValue={customerContractRules?.prepay_percent}
                                min={0}
                                max={100}
                                formatter={(value) => `${value}%`}
                                parser={(value) => value?.replace('%', '') as unknown as number}
                                onChange={handleChangePrepayPercent}
                            />
                        }
                    />
                    <Item
                        loading={customerContractRulesloading}
                        title='Số tiền thế chấp'
                        data={
                            <InputNumber<number>
                                status={errors.collateralCashAmount && 'error'}
                                style={{
                                    width: "200px"
                                }}
                                defaultValue={customerContractRules?.collateral_cash_amount}
                                formatter={(value) => `${value}đ`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                parser={(value) => value?.replace(/\đ\s?|(,*)/g, '') as unknown as number}
                                onChange={handleChangeCollateralCashAmount}
                            />
                        }
                    />
                </div>
            </div>
            <Button
                loading={customerUpdateLoading}
                onClick={handleUpdateCustomerContractRules}
            >Lưu
            </Button>
        </div>
    )
}
