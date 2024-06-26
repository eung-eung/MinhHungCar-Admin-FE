'use client'
import { IAccount } from '@/app/models/Account.model'
import { Modal, Table, Tag } from 'antd'
import React, { useState } from 'react'
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import { useTranslation } from 'react-i18next';
import AccountDialog from './AccountDialog';
import Diaglog from '@/app/components/Modal';
import useAxiosAuth from '@/app/utils/hooks/useAxiosAuth';
import { errorNotify, sucessNotify } from '@/app/utils/toast';
type IUpdateAccountStatusRequest = {

    account_id: any,
    status: any

}
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

    const handleUpdateStatusAccount = async (id: any, status: any, title: any) => {
        showConfirmModal(title)
            .then(async () => {
                try {
                    const response = await axiosAuth.put('/admin/account/status', {
                        account_id: id,
                        status: status
                    } as IUpdateAccountStatusRequest)
                    if (status === 'active') {
                        sucessNotify('Gỡ khóa thành công')
                    }
                    else if (status === 'inactive') {
                        sucessNotify('Đã khóa tài khoản')
                    }
                    setRefresh(prev => !prev)
                } catch (error: any) {
                    if (status === 'active') {
                        errorNotify('Gỡ khóa thất bại. Hãy thử lại')
                    }
                    else if (status === 'inactive') {
                        errorNotify('Khóa tài khoản thất bại. Hãy thử lại')
                    }
                }

            })
    }

    const showConfirmModal = (title: any) => {
        const { confirm } = Modal
        return new Promise((res, rej) => {
            confirm({
                title: title,
                onOk: () => {
                    res(true)
                },
                cancelText: "Hủy",
                onCancel: () => {
                    rej(true)
                }
            })
        })
    }

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
                    {
                        record.status === 'active' ? <Tag onClick={
                            () =>
                                handleUpdateStatusAccount(
                                    record.id,
                                    'inactive',
                                    'Bạn có muốn khóa tài khoản này?'
                                )}
                            color='red'
                            className='ml-3 cursor-pointer'>
                            Khóa
                        </Tag> :
                            <Tag onClick={
                                () =>
                                    handleUpdateStatusAccount(
                                        record.id,
                                        'active',
                                        'Bạn có muốn gỡ khóa tài khoản này?'
                                    )}
                                color='default'
                                className='ml-3 cursor-pointer'>
                                Gỡ khóa
                            </Tag>
                    }

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
                width='45%'
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
