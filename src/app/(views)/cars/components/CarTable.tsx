import { ICar } from '@/app/models/Car.model'
import { Button, Dropdown, Menu, Table } from 'antd'
import { TableProps } from 'antd/lib'
import React, { useState } from 'react'
import classes from '../index.module.css'
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import { ICarModel } from '@/app/models/CarModel.model'
import { IAccount } from '@/app/models/Account.model'
import Diaglog from '@/app/components/Modal'
import CarDialog from './CarDialog'
import useAxiosAuth from '@/app/utils/hooks/useAxiosAuth'
import { useTranslation } from 'react-i18next'
export default function CarTable(
    {
        carData,
        loading
    }: {
        carData: ICar[],
        loading: boolean
    }) {
    const [open, setOpen] = useState<boolean>(false);
    const [loadingDialog, setLoadingDialog] = useState<boolean>(true);
    const [carDetail, setCarDetail] = useState<ICar>()
    const { t } = useTranslation()
    const axiosAuth = useAxiosAuth()
    const handleOpenDetailDialog = async (id: any) => {
        setOpen(true);
        setLoadingDialog(true);
        const carDetail = await axiosAuth.get(`/car/${id}`)
        const detail: ICar = carDetail.data
        setCarDetail(detail)
        setLoadingDialog(false)

    };

    const handleOpenContractDialog = (id: any) => {
        console.log('a');
        // console.log(id);

    }



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
            render: (price: Number) => <>{price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</>
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
                console.log(record);

                return <div className={classes.actionBox}>
                    <Dropdown
                        dropdownRender={() => (
                            <Menu
                                items={[
                                    {
                                        key: '1',
                                        label: 'Chi tiết',
                                        onClick: () =>
                                            handleOpenDetailDialog(record.id)
                                    },
                                    {
                                        key: '2',
                                        label: 'Hợp đồng',
                                        onClick: () =>
                                            handleOpenContractDialog(record.id)
                                    },
                                    {
                                        key: '3', label: 'Option 3'
                                    },
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
                <CarDialog detail={carDetail} />
            </Diaglog>
        </>

    )
}
