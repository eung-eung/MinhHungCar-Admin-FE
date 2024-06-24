'use client'
import { IAccount } from '@/app/models/Account.model'
import { Table, Tag } from 'antd'
import React, { useState } from 'react'
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import { useTranslation } from 'react-i18next';
import AccountDialog from './AccountDialog';
import Diaglog from '@/app/components/Modal';
import useAxiosAuth from '@/app/utils/hooks/useAxiosAuth';

export default function AccountTable(
    {
        accountData,
        loading,
        filter,
        setRefresh
    }: {
        accountData: IAccount[],
        loading: boolean,
        filter: any,
        setRefresh: React.Dispatch<React.SetStateAction<boolean>>
    }
) {
    const { t } = useTranslation()
    const [open, setOpen] = useState<boolean>(false)
    const axiosAuth = useAxiosAuth()
    const [accountDetail, setAccountDetail] = useState<IAccount>()
    const [loadingDialog, setLoadingDialog] = useState<boolean>(true)
    const handleOpenDetailDialog = async (id: any) => {
        setOpen(true)
        setLoadingDialog(true)
        const response = await axiosAuth.get('/admin/account/' + id)
        console.log(response.data);
        setAccountDetail(response.data)
        setLoadingDialog(false)

    }

    const columns = [
        {
            title: 'Họ và tên',
            key: 'name',
            render: (_: any, record: IAccount) =>
                <p>{record.first_name + ' ' + record.last_name}</p>
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
            render: (role: any) => <Tag
                color={role === 'customer' ? 'cyan' : 'blue'}>
                {t(`common:${role}`)}
            </Tag>
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            render: (_: any, record: any) => (
                <Tag color={record.status === 'active' ? "green" : "red"} key={record}>
                    {t(`accountStatus:${record.status}`)}
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
                        onClick={() => handleOpenDetailDialog(record.id)}
                        className='mr-3 cursor-pointer' />

                    <Tag color='#ef1a2b' className='ml-3 cursor-pointer'>
                        Khóa
                    </Tag>
                </div>

            )
        },
    ];
    return (
        <>
            <Table
                loading={loading}
                dataSource={accountData}
                columns={columns} />
            <Diaglog
                width='30%'
                loading={loadingDialog}
                setOpen={setOpen}
                title="Chi tiết tài khoản"
                open={open}
            >
                <AccountDialog
                    detail={accountDetail}
                />
            </Diaglog>
        </>
    )
}
