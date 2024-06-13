'use client'
import { Button, ConfigProvider, Dropdown, GetProp, Menu, MenuProps, Modal, Select, Switch, Table, UploadFile, UploadProps } from 'antd'
import React, { ChangeEvent, useState } from 'react'
import '../../globals.css'
import classes from './index.module.css'
import SearchInput from '@/app/components/SearchInput'
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import ArrowDropDownRoundedIcon from '@mui/icons-material/ArrowDropDownRounded';
import TopFilterTable from '@/app/components/TopFilterTable'




export default function Cars() {
    const [filter, setFilter] = useState()

    const columns = [
        {
            title: 'Hãng xe',
            dataIndex: 'brand',
            key: 'brand',
        },
        {
            title: 'Mẫu xe',
            dataIndex: 'model',
            key: 'model',
        },
        {
            title: 'Biển số xe',
            dataIndex: 'carNumber',
            key: 'carNumber',
        },
        {
            title: 'Giá thuê xe',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Tên chủ xe',
            dataIndex: 'owner',
            key: 'owner',
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
    const carData = [
        {
            key: 1,
            brand: 'Audi',
            model: 'Audi 2023',
            carNumber: 'K1023021',
            price: 213123,
            owner: 'Nguyễn Văn Long'
        },
        {
            key: 2,
            brand: 'Toyoto',
            model: 'Inova cross',
            carNumber: 'K1023021',
            price: 213123,
            owner: 'Nguyễn Văn A'
        },
        {
            key: 3,
            brand: 'Toyoto',
            model: 'Inova cross',
            carNumber: 'K1023021',
            price: 213123,
            owner: 'Nguyễn Văn A'
        },
        {
            key: 4,
            brand: 'Toyoto',
            model: 'Inova cross',
            carNumber: 'K1023021',
            price: 213123,
            owner: 'Nguyễn Văn A'
        },
        {
            key: 5,
            brand: 'Toyoto',
            model: 'Inova cross',
            carNumber: 'K1023021',
            price: 213123,
            owner: 'Nguyễn Văn A'
        },

    ]

    const handleSearch = () => {

    }

    const handleChange = (e: string) => {
        console.log(e);

    }



    return (
        <div>
            <TopFilterTable
                placeholder='Tìm kiếm theo họ và tên/email/số điện thoại'
                defaultValue='waiting'
                handleChange={handleChange}
                optionList={[
                    { label: 'Xe đang chờ duyệt', value: 'waiting' },
                    { label: 'Xe đã duyệt', value: 'approve' },
                    { label: 'Xe đang chờ giao', value: 'waitingPark' },
                    { label: 'Xe đang hoạt động', value: 'active' },
                ]}
                handleSearch={handleSearch}
            />
            <Table
                dataSource={carData} columns={columns} />
        </div>
    )
}
