'use client'

import { ConfigProvider, Table, Tag } from 'antd'
import { Metadata } from 'next'
import React from 'react'
import classes from './index.module.css'
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import SearchInput from '@/app/components/SearchInput'
export default function Account() {
    const handleSearch = () => {
        console.log('search');

    }
    const dataSource = [
        {
            key: '1',
            name: 'Mike',
            age: 32,
            address: '10 Downing Street',
            phone: "01231231",
            email: 'boyvip@gmai.com',
            role: 'Customer',
            status: 'Đang hoạt động'
        },
        {
            key: '2',
            name: 'John',
            age: 42,
            address: '10 Downing Street',
            phone: "01231231",
            email: 'boyvip@gmai.com',
            role: 'Customer',
            status: 'Đang hoạt động'
        },
    ];

    const columns = [
        {
            title: 'Họ và tên',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Vai trò',
            dataIndex: 'role',
            key: 'role',
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            render: (_: any, record: any) => (
                <Tag color='#4baf21' key={record}>
                    {record.status.toUpperCase()}
                </Tag>
            )


        },
        {
            title: '',
            dataIndex: 'action',
            key: 'action',
            render: (_: any, record: any) => (
                <div className='flex items-center'>
                    <RemoveRedEyeOutlinedIcon className='mr-3' />
                    <Tag color='#ef1a2b' className='ml-3'>
                        Khóa
                    </Tag>
                </div>

            )
        },
    ];
    return (
        <div className={classes.box + ' flex flex-col'}>
            <div className='flex justify-end mt-5'>
                <SearchInput callback={handleSearch} placeholder='Tìm kiếm theo họ và tên/email/số điện thoại' />
            </div>
            <ConfigProvider
                theme={
                    {
                        components: {
                            Table: {
                                headerBg: '#21222D',
                                headerColor: '#87888C',
                                footerBg: '#21222D',
                                headerSplitColor: '#21222D',
                                borderColor: '#30363d'
                            }
                        },
                        token: {
                            colorBgContainer: '#21222D',
                            colorText: '#fff'
                        }
                    }
                }>
                <Table dataSource={dataSource} columns={columns} />

            </ConfigProvider>
        </div>
    )
}
