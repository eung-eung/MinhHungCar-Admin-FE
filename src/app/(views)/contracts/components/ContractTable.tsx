import { IAccount } from '@/app/models/Account.model'
import { ICar } from '@/app/models/Car.model'
import { ICustomerContract } from '@/app/models/CustomerContract'
import { Modal, Skeleton, Spin, Table, TableProps, UploadFile } from 'antd'
import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import { useTranslation } from 'react-i18next'
import OrderedContractDropdown from './OrderedContractDropdown'
import useAxiosAuth from '@/app/utils/hooks/useAxiosAuth'
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import RentingContractDropdown from './RentingContractDropdown'
import { errorNotify, sucessNotify } from '@/app/utils/toast'
import ExpandRowCollateral from './ExpandRowCollateral'
import SwitchIsReturn from './Switch'
import ExpandRowRecievingCar from './ExpandRowRecievingCar'
import CompletedContractDropdown from './CompletedContractDropdown'
import CanceledContractDropdown from './CanceledContractDropdown'
import nProgress from 'nprogress'
import { useRouter } from 'next/navigation'
import Dialog from '@/app/components/Modal'
import CarDialog from '../../cars/components/CarDialog'
import AccountDialog from '../../accounts/components/AccountDialog'


export default function ContractTable(
    {
        contractData,
        filter,
        loading,
        setRefresh
    }: {
        contractData?: ICustomerContract[],
        filter: any,
        loading: boolean,
        setRefresh: React.Dispatch<React.SetStateAction<boolean>>
    }) {
    const router = useRouter()
    const { t } = useTranslation()
    const axiosAuth = useAxiosAuth()
    const [open, setOpen] = useState<boolean>(false)
    const [loadingDialog, setLoadingDialog] = useState<boolean>(true)
    const [carDetail, setCarDetail] = useState<ICar>()
    const [openAccountDialog, setOpenAccountDialog] = useState<boolean>(false)
    const [accountDetail, setAccountDetail] = useState<IAccount>()
    const [loadingAccountDialog, setLoadingAccountDialog] = useState<boolean>(true)
    const openAccountDetailDialog = async (id: any) => {
        setOpenAccountDialog(true)
        setLoadingAccountDialog(true)
        const response = await axiosAuth.get('/admin/account/' + id)
        setAccountDetail(response.data.data)
        setLoadingAccountDialog(false)

    }
    const openCarDetail = async (id: any) => {
        setOpen(true)
        setLoadingDialog(true)
        try {
            const response = await axiosAuth.get("/car/" + id)
            setCarDetail(response.data.data)
            setLoadingDialog(false)
        } catch (error) {
            setLoadingDialog(false)
        }

    }

    const columns: TableProps<ICustomerContract>['columns'] = [
        {
            title: 'Tên khách hàng',
            dataIndex: 'customer',
            key: 'id',
            render: (customer: IAccount) => <div
                onClick={() => openAccountDetailDialog(customer.id)}
                style={{
                    color: "blue",
                    cursor: 'pointer'
                }}>{customer.last_name + ' ' + customer.first_name}
            </div>
        },
        {
            title: 'Biển số xe',
            dataIndex: 'car',
            key: 'id',
            render: (car: ICar) => <div
                onClick={() => openCarDetail(car.id)}
                style={{
                    color: "blue",
                    cursor: 'pointer'
                }}>{car.license_plate}</div>
        },
        {
            title: 'Ngày nhận xe',
            dataIndex: 'start_date',
            key: 'id',
            render: (date) => <p>{dayjs(date).format('DD-MM-YYYY HH:mm:ss')}</p>
        },
        {
            title: 'Ngày trả xe',
            dataIndex: 'end_date',
            key: 'id',
            render: (date) => <p>{dayjs(date).format('DD-MM-YYYY HH:mm:ss')}</p>
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'customer',
            key: 'id',
            render: (customer: IAccount) => <>{customer.phone_number}</>
        },
        {
            title: '',
            dataIndex: 'action',
            key: 'id',
            render: (_, record) => {
                return <div
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
                        router.push('/contracts/' + record.id)
                    }}>
                    <RemoveRedEyeOutlinedIcon style={{
                        color: "#0073e6",
                    }} />

                </div>

            }

        },
    ]
    return (
        <>
            <Table
                loading={loading}
                rowKey={(record) => record.id}
                columns={columns}
                dataSource={contractData}
            />
            <Dialog
                width='50%'
                loading={loadingDialog}
                open={open}
                setOpen={setOpen}
                title='Thông tin xe'
                isIntercept={false}
            >
                <CarDialog
                    detail={carDetail}
                />
            </Dialog>

            <Dialog
                width='45%'
                loading={loadingAccountDialog}
                setOpen={setOpenAccountDialog}
                title="Chi tiết tài khoản"
                open={openAccountDialog}
                isIntercept={false}
            >
                <AccountDialog
                    detail={accountDetail}
                />
            </Dialog>
        </>
    )
}
