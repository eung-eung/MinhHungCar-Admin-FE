'use client'
import { ICar } from '@/app/models/Car.model'
import { Button, InputNumber, InputNumberProps, Table, Tag } from 'antd'
import { TableProps } from 'antd/lib'
import React, { ChangeEvent, useRef, useState } from 'react'
import classes from '../index.module.css'
import { ICarModel } from '@/app/models/CarModel.model'
import { IAccount } from '@/app/models/Account.model'
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import useAxiosAuth from '@/app/utils/hooks/useAxiosAuth'
import PendingApprovalDropdown from './PendingApprovalCarDropdown'
import Dialog from '@/app/components/Modal'
import CarDialog from './CarDialog'
import ActiveCarDropdown from './ActiveCarDropdown'
import { formatCurrency } from '@/app/utils/formatCurrency'
import DeliveryCarDropdown from './DeliveryCarDropdown'
import { useRouter } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import BlockRoundedIcon from '@mui/icons-material/BlockRounded';
import { IPartnerContractRule } from '@/app/models/ContractRule'
import InActiveCarDropDown from './InActiveCarDropDown'
import CountQuantityInput from './CountQuantityInput'
import nProgress from 'nprogress'
export default function CarTable(
    {
        carData,
        loading,
        filter,
        contractRules,
        setRefresh
    }: {
        carData: ICar[],
        loading: boolean,
        filter: any,
        contractRules?: IPartnerContractRule,
        setRefresh: React.Dispatch<React.SetStateAction<boolean>>
    }) {
    const axiosAuth = useAxiosAuth()
    const [open, setOpen] = useState<boolean>(false);
    const [loadingDialog, setLoadingDialog] = useState<boolean>(true);
    const [carDetail, setCarDetail] = useState<ICar>()
    const router = useRouter()
    const { t } = useTranslation()

    const columns: TableProps<ICar>['columns'] = [
        {
            title: 'Tên chủ xe',
            dataIndex: 'account',
            key: 'id',
            render: (account: IAccount) =>
                <>{`${account.last_name + ' ' + account.first_name}`}</>
        },
        {
            title: 'Hãng xe',
            dataIndex: 'car_model',
            key: 'id',
            render: (model: any) => <>{model.brand}</>
        },
        {
            title: 'Mẫu xe',
            dataIndex: 'car_model',
            key: 'id',
            render: (model: ICarModel) => <>{model.model}</>
        },
        {
            title: 'Biển số xe',
            dataIndex: 'license_plate',
            key: 'id',
        },
        {
            title: 'Giá cho thuê',
            dataIndex: 'price',
            key: 'id',
            render: (price: Number) => <>{formatCurrency(price)}</>
        },
        {
            title: 'Nơi đậu xe',
            dataIndex: 'parking_lot',
            key: 'id',
            render: (parking) => t(`common:${parking}`)
        },
        {
            title: 'Số chỗ',
            dataIndex: 'car_model',
            key: 'id',
            render: (car_model: ICarModel) => car_model.number_of_seats
        },
        {
            title: 'Số lần giao xe trễ',
            dataIndex: 'count',
            key: 'id',
            render: (_, record) => record.status === 'active'
                ? <>
                    <CountQuantityInput
                        setRefresh={setRefresh}
                        maxWarningCount={record.partner_contract_rule.max_warning_count}
                        car={record}
                        warningCount={record.warning_count}
                    />
                    <span> / {record.partner_contract_rule.max_warning_count}</span>
                </>
                : <BlockRoundedIcon color='disabled' />
        },
        {
            title: '',
            dataIndex: 'action',
            key: 'id',
            render: (_, record) => {


                return <div className={classes.actionBox}>
                    {
                        filter === 'pending_approval' &&
                        <PendingApprovalDropdown
                            id={record.id}
                            carDetail={carDetail}
                            loadingDialog={loadingDialog}
                            setOpen={setOpen}
                            setRefresh={setRefresh}
                        />
                    }
                    {
                        filter === 'approved' &&
                        <RemoveRedEyeOutlinedIcon
                            className='cursor-pointer'
                            onClick={() => router.push('/cars/' + record.id)}
                        />
                    }
                    {
                        filter === 'active' &&
                        <ActiveCarDropdown
                            id={record.id}
                        />
                    }
                    {
                        filter === 'waiting_car_delivery' &&
                        <DeliveryCarDropdown
                            id={record.id}
                            carDetail={carDetail}
                            loadingDialog={loadingDialog}
                            setOpen={setOpen}
                            setRefresh={setRefresh}
                        />
                    }
                    {
                        filter === 'inactive' &&
                        <InActiveCarDropDown
                            id={record.id}
                        />
                    }
                    {
                        filter === 'temporary_inactive' &&
                        <div
                            className='flex items-center justify-center'
                            style={{
                                cursor: "pointer",
                                width: '34px',
                                height: '34px',
                                borderRadius: '12px',
                                border: '1px solid',
                                backgroundColor: '#e8ebed1a',
                                borderColor: '#d9dee2',
                                boxShadow: '#f6f7f866 0 2px 0 inset, #e8eaee80 0 -1.5px 0 inset, #dfe2e780 0 1px 2px 0'
                            }} onClick={() => {
                                nProgress.start()
                                router.push('/cars/' + record.id)
                            }}>
                            <RemoveRedEyeOutlinedIcon style={{
                                color: "#0073e6",
                            }} />

                        </div>

                    }
                </div>

            }

        },

    ]
    return (
        <>
            <Table
                loading={loading}
                dataSource={carData}
                columns={columns} />
        </>

    )
}
