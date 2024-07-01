import { IAccount } from '@/app/models/Account.model'
import { ICar } from '@/app/models/Car.model'
import { ICustomerContract } from '@/app/models/CustomerContract'
import { Modal, Skeleton, Spin, Table, TableProps, Upload, UploadFile, message } from 'antd'
import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import { useTranslation } from 'react-i18next'
import OrderedContractDropdown from './OrderedContractDropdown'
import { UploadProps } from 'antd/lib'
import useAxiosAuth from '@/app/utils/hooks/useAxiosAuth'
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import RentingContractDropdown from './RentingContractDropdown'
import { sucessNotify } from '@/app/utils/toast'
import ExpandRowCollateral from './ExpandRowCollateral'
import SwitchIsReturn from './Switch'
import ExpandRowRecievingCar from './ExpandRowRecievingCar'
import Loading from '@/app/components/Loading'

export default function ContractTable(
    {
        contractData,
        filter,
        setRefresh
    }: {
        contractData?: ICustomerContract[],
        filter: any,
        setRefresh: React.Dispatch<React.SetStateAction<boolean>>
    }) {

    const [customerContractDetail, setCustomerContractDetail] = useState<ICustomerContract>()
    const [expandLoading, setExpandLoaing] = useState<any>({})
    const [expandedRowKeys, setExpandedRowKeys] = useState<any>([]);
    const { t } = useTranslation()
    const axiosAuth = useAxiosAuth()
    const [fileCarCondition, setFileCarCondition] = useState<UploadFile[]>([])

    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const columns: TableProps<ICustomerContract>['columns'] = [
        {
            title: 'Tên khách hàng',
            dataIndex: 'customer',
            key: 'id',
            render: (customer: IAccount) => <>{customer.first_name + ' ' + customer.last_name}</>
        },
        {
            title: 'Biển số xe',
            dataIndex: 'car',
            key: 'id',
            render: (car: ICar) => <>{car.license_plate}</>
        },
        {
            title: 'Ngày nhận xe',
            dataIndex: 'start_date',
            key: 'id',
            render: (date) => dayjs(date).format('DD/MM/YYYY')
        },
        {
            title: 'Ngày trả xe',
            dataIndex: 'end_date',
            key: 'id',
            render: (date) => dayjs(date).format('DD/MM/YYYY')
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'customer',
            key: 'id',
            render: (customer: IAccount) => <>{customer.phone_number}</>
        },
        {
            title: 'Loại thế chấp',
            dataIndex: 'collateral_type',
            key: 'id',
            render: (type) => t(`common:${type}`)
        },
        {
            title: '',
            dataIndex: 'action',
            key: 'id',
            render: (_, record) => {
                return <div style={{ position: 'relative' }}>
                    {
                        filter === 'ordered' &&
                        <OrderedContractDropdown
                            id={record.id}
                            approveCustomerContract={() => approveCustomerContract(record.id)}
                            rejectCustomerContract={rejectCustomerContract}
                        />
                    }
                    {
                        filter === 'completed' &&
                        <> <RemoveRedEyeOutlinedIcon />
                            <ReceiptLongOutlinedIcon /></>
                    }
                    {

                    }

                </div>

            }

        },
    ]

    useEffect(() => {

    }, [expandLoading])

    const approveCustomerContract = async (id: any) => {
        const response = await axiosAuth.put('/admin/contract', {
            customer_contract_id: id,
            action: "approve"
        })
        console.log(response);
        if (response.status === 200) {
            setRefresh(prev => !prev)
            sucessNotify('Cập nhật hợp đồng thành công')
        }
    }

    const rejectCustomerContract = () => {

    }

    const handleUpdate = async (id: any, type: any) => {
        const formData = new FormData()
        if (type === 'receivingCar') {
            const files = fileCarCondition.map(file => file.originFileObj)
            formData.append('document_category', 'RECEIVING_CAR_IMAGES')
            formData.append('customer_contract_id', id)
            files.forEach((file: any) => formData.append('files', file))
        }
        const response = await axiosAuth.put('/admin/contract/document', formData)
        console.log(response);
        // if (response.status === 200)


    }

    const handleUpload: UploadProps['onChange'] = ({ fileList: newFileList, file }) => {
        const isJPG = file.type === 'image/jpeg';
        if (!isJPG) {
            message.error('You can only upload JPG file!');
            return
        }
        setFileList(newFileList)
    }

    const handleRemove = () => {
        const { confirm } = Modal
        return new Promise((res, rej) => {
            confirm({
                title: 'Bạn có muốn xóa ảnh này?',
                onOk: () => {
                    res(true)
                },
                onCancel: () => {
                    rej(true)
                }
            })
        })
    }
    const getDataForExpand = async (id: any) => {
        const response = await axiosAuth.get(
            '/admin/contract/' + id
        )
        setCustomerContractDetail(response.data.data)
        setFileList(
            response.data
                .data.collateral_asset_images.map((img: any) =>
                ({
                    url: img.url,
                    status: 'done',
                    uid: img.id
                })))

        setFileCarCondition(
            response.data
                .data.receiving_car_images.map((img: any) =>
                ({
                    url: img.url,
                    status: 'done',
                    uid: img.id,
                    isUpload: true
                })))
    }
    return (
        <Table
            rowKey={(record) => record.id}
            expandable={{
                expandedRowKeys: expandedRowKeys,
                onExpand: async (expanded, record) => {
                    const keys = []
                    setExpandLoaing(true)
                    if (expanded) {
                        keys.push(record.id);
                        getDataForExpand(record.id)
                    }
                    setTimeout(() => setExpandLoaing(false), 1000)
                    setExpandedRowKeys(keys);
                },
                expandedRowRender: (record) => {
                    console.log(expandLoading);

                    return (
                        <>
                            {
                                expandLoading &&
                                <div className='flex justify-center'><Spin /></div>
                            }
                            {
                                !expandLoading &&
                                <>
                                    {
                                        record.collateral_type !== 'cash'
                                        &&
                                        <ExpandRowCollateral
                                            id={record.id}
                                            expandLoading={expandLoading}
                                            fileList={fileList}
                                            status={record.status}
                                        />
                                    }

                                    {
                                        expandLoading
                                        && <Skeleton.Image active />
                                    }
                                    <SwitchIsReturn
                                        isReturn={record.is_return_collateral_asset}
                                    />
                                    <ExpandRowRecievingCar
                                        id={record.id}
                                        fileList={fileCarCondition}
                                        status={record.status}
                                        expandLoading={expandLoading}
                                        setFileCarCondition={setFileCarCondition}
                                        getDataForExpand={getDataForExpand}
                                    />
                                </>

                            }
                        </>
                    )
                },
            }}
            columns={columns}
            dataSource={contractData}
        />
    )
}
