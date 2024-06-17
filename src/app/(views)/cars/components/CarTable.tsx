import { ICar } from '@/app/models/Car.model'
import { Button, Dropdown, Menu, Table } from 'antd'
import { TableProps } from 'antd/lib'
import React from 'react'
import classes from '../index.module.css'
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import { ICarModel } from '@/app/models/CarModel.model'
import { IAccount } from '@/app/models/Account.model'
export default function CarTable({ carData }: { carData: ICar[] }) {
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
            key: 'price',
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
            key: 'action',
            render: () => {
                return <div className={classes.actionBox}>
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
    return (
        <Table
            dataSource={carData} columns={columns} />
    )
}
