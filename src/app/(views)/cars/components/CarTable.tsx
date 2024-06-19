import { ICar } from '@/app/models/Car.model'
import { Table } from 'antd'
import { TableProps } from 'antd/lib'
import React, { useState } from 'react'
import classes from '../index.module.css'
import { ICarModel } from '@/app/models/CarModel.model'
import { IAccount } from '@/app/models/Account.model'
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import useAxiosAuth from '@/app/utils/hooks/useAxiosAuth'
import { useTranslation } from 'react-i18next'
import PendingApprovalDropdown from './PendingApprovalCarDropdown'
import Diaglog from '@/app/components/Modal'
import CarDialog from './CarDialog'
import ActiveCarDropdown from './ActiveCarDropdown'
import { formatCurrency } from '@/app/utils/formatCurrency'
export default function CarTable(
    {
        carData,
        loading,
        filter,

    }: {
        carData: ICar[],
        loading: boolean,
        filter: any,
    }) {
    const axiosAuth = useAxiosAuth()
    const [open, setOpen] = useState<boolean>(false);
    const [loadingDialog, setLoadingDialog] = useState<boolean>(true);
    const [carDetail, setCarDetail] = useState<ICar>()

    const handleOpenDetailDialog = async (id: any) => {
        setOpen(true);
        setLoadingDialog(true);
        const carDetail = await axiosAuth.get(`/car/${id}`)
        const detail: ICar = carDetail.data
        setCarDetail(detail)
        setLoadingDialog(false)

    };

    const columns: TableProps<ICar>['columns'] = [
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
            title: 'Giá thuê xe',
            dataIndex: 'price',
            key: 'id',
            render: (price: Number) => <>{formatCurrency(price)}</>
        },
        {
            title: 'Tên chủ xe',
            dataIndex: 'account',
            key: 'id',
            render: (account: IAccount) =>
                <>{`${account.first_name + ' ' + account.last_name}`}</>

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
                            handleOpenDetailDialog={handleOpenDetailDialog}
                            carDetail={carDetail}
                            loadingDialog={loadingDialog}
                            setOpen={setOpen}
                        />
                    }
                    {
                        filter === 'approved' &&
                        <RemoveRedEyeOutlinedIcon
                            className='cursor-pointer'
                            onClick={() => handleOpenDetailDialog(record.id)}
                        />
                    }
                    {
                        filter === 'active' &&
                        <ActiveCarDropdown
                            id={record.id}
                            handleOpenDetailDialog={handleOpenDetailDialog}
                        />
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
            <Diaglog
                loading={loadingDialog}
                open={open}
                setOpen={setOpen}
                title='Thông tin xe'
                showLoading={handleOpenDetailDialog}
            >
                <CarDialog
                    detail={carDetail}
                />
            </Diaglog>
        </>

    )
}
