'use client'
import { IAccount } from '@/app/models/Account.model'
import { Modal, Table, Tag } from 'antd'
import React, { useState } from 'react'
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import { useTranslation } from 'react-i18next';
import AccountDialog from './AccountDialog';
import Dialog from '@/app/components/Modal';
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

    const handleOpenDetailDialog = async (id: any) => {
        setOpen(true)
        setLoadingDialog(true)
        const response = await axiosAuth.get('/admin/account/' + id)
        setAccountDetail(response.data.data)
        setLoadingDialog(false)

    }

    const columns = [
        {
            title: 'Họ và tên',
            key: 'name',
            render: (_: any, record: IAccount) =>
                <p>{record.last_name + ' ' + record.first_name}</p>
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'phone_number',
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
                    }}
                >
                    <RemoveRedEyeOutlinedIcon
                        color='primary'
                        onClick={() => handleOpenDetailDialog(record.id)}
                    />
                </div>

            )
        }
    ];
    return (
        <>
            <Table
                loading={loading}
                dataSource={accountData}
                columns={columns} />
            <Dialog
                width='45%'
                loading={loadingDialog}
                setOpen={setOpen}
                title="Chi tiết tài khoản"
                open={open}
                isIntercept={false}
            >
                <AccountDialog
                    detail={accountDetail}
                />
            </Dialog>
        </>
    )
}
