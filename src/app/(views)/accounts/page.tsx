'use client'

import { Table, Tag } from 'antd'
import React, { useState } from 'react'


import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import SearchInput from '@/app/components/SearchInput'
import Diaglog from '@/app/components/Modal'
import AccountDialog from './components/AccountDialog'
export default function Account() {
    const [open, setOpen] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);

    const showLoading = () => {
        setOpen(true);
        setLoading(true);

        // Simple loading mock. You should add cleanup logic in real world.
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    };
    const handleSearch = () => {


    }
    const handleShowDialog = () => {
        showLoading()

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
                    <RemoveRedEyeOutlinedIcon
                        onClick={handleShowDialog}
                        className='mr-3 cursor-pointer' />

                    <Tag color='#ef1a2b' className='ml-3 cursor-pointer'>
                        Khóa
                    </Tag>
                </div>

            )
        },
    ];
    return (
        <div className={'flex flex-col'}>
            <div className='flex justify-end mt-5'>
                <SearchInput callback={handleSearch} placeholder='Tìm kiếm theo họ và tên/email/số điện thoại' />
            </div>
            <Table dataSource={dataSource} columns={columns} />
            <Diaglog
                loading={loading}
                setOpen={setOpen}
                showLoading={showLoading}
                title="Chi tiết tài khoản"
                open={open}
            >
                <AccountDialog />
            </Diaglog>
        </div>
    )
}
