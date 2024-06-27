import { IAccount } from '@/app/models/Account.model'
import { ICar } from '@/app/models/Car.model'
import { ICustomerContract } from '@/app/models/CustomerContract'
import { Button, GetProp, Modal, Skeleton, Switch, Table, TableProps, UploadFile, message } from 'antd'
import React, { useState } from 'react'
import UploadImage from '../../cars/components/Upload'
import dayjs from 'dayjs'
import { useTranslation } from 'react-i18next'
import OrderedContractDropdown from './OrderedContractDropdown'
import { getBase64 } from '@/app/utils/getBase64'
import { UploadProps } from 'antd/lib'
import useAxiosAuth from '@/app/utils/hooks/useAxiosAuth'
type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];
export default function ContractTable(
    {
        contractData,
        filter
    }: {
        contractData?: ICustomerContract[],
        filter: any
    }) {
    const [previewOpen, setPreviewOpen] = useState<boolean>(false);
    const [previewImage, setPreviewImage] = useState<any>('');
    const [customerContractDetail, setCustomerContractDetail] = useState<any>()
    const [expandLoading, setExpandLoaing] = useState<any>({})
    const [expandedRowKeys, setExpandedRowKeys] = useState<any>([]);
    const { t } = useTranslation()
    const axiosAuth = useAxiosAuth()

    const approveCustomerContract = () => {

    }

    const rejectCustomerContract = () => {

    }
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
                            approveCustomerContract={approveCustomerContract}
                            rejectCustomerContract={rejectCustomerContract}
                        />
                    }
                    {/* {
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
                    {
                        filter === 'waiting_car_delivery' &&
                        <DeliveryCarDropdown
                            id={record.id}
                            handleOpenDetailDialog={handleOpenDetailDialog}
                            carDetail={carDetail}
                            loadingDialog={loadingDialog}
                            setOpen={setOpen}
                            setRefresh={setRefresh}
                        />
                    } */}
                </div>

            }

        },

    ]

    const [fileList, setFileList] = useState<UploadFile[]>([]
        // [
        // {
        //     uid: '-1',
        //     name: 'image.png',
        //     status: 'done',
        //     url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        // },
        // {
        //     uid: '-2',
        //     name: 'image.png',
        //     status: 'done',
        //     url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        // },
        // {
        //     uid: '-3',
        //     name: 'image.png',
        //     status: 'done',
        //     url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        // },
        // {
        //     uid: '-4',
        //     name: 'image.png',
        //     status: 'done',
        //     url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        // },
        // {
        //     uid: '-xxx',
        //     percent: 50,
        //     name: 'image.png',
        //     status: 'uploading',
        //     url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        // },
        // {
        //     uid: '-5',
        //     name: 'image.png',
        //     status: 'error',
        // },
        // ]
    );

    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as FileType);
        }

        setPreviewImage(file.url || (file.preview as string));
        setPreviewOpen(true);
    };

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

    return (
        <Table
            rowKey={(record) => record.id}
            expandable={{
                expandedRowKeys: expandedRowKeys,
                onExpand: async (expanded, record) => {
                    const keys = []
                    if (expanded) {
                        keys.push(record.id);
                        setExpandLoaing(true)
                        const response = await axiosAuth.get(
                            '/admin/contract/' + record.id
                        )
                        setCustomerContractDetail(
                            response.data.collateral_asset_images.map((img: any) => ({
                                url: img
                            })))
                        setExpandLoaing(false)

                    }
                    setExpandedRowKeys(keys);
                },
                expandedRowRender: (record) => {
                    return (
                        <>

                            <>
                                <h2 className='text-base mb-3 font-semibold '>Hình ảnh xe thế chấp</h2>
                                {
                                    !expandLoading &&
                                    <UploadImage
                                        id={record.id + record.collateral_type}
                                        fileList={
                                            customerContractDetail
                                        }
                                        handleChange={handleUpload}
                                        handlePreview={handlePreview}
                                        handleRemove={handleRemove}
                                        previewOpen={previewOpen}
                                        previewImage={previewImage}
                                        setPreviewImage={setPreviewImage}
                                        setPreviewOpen={setPreviewOpen}
                                    />
                                }
                                {
                                    expandLoading && <Skeleton.Image active />
                                }
                                <div className='flex mt-5 items-center'>
                                    <p className='text-base mt-3 mb-3 font-semibold mr-3'>Hoàn trả:</p>
                                    <Switch style={{ opacity: 1 }} disabled defaultChecked />
                                </div>
                                <h2 className='text-base mt-3 mb-3 font-semibold '>
                                    Tình trạng xe khi khách hàng nhận
                                </h2>
                                {/* <UploadImage
                                id={record.id + record.collateral_type}
                                fileList={fileList}
                                handleChange={handleUpload}
                                handlePreview={handlePreview}
                                handleRemove={handleRemove}
                                previewOpen={previewOpen}
                                previewImage={previewImage}
                                setPreviewImage={setPreviewImage}
                                setPreviewOpen={setPreviewOpen}
                            /> */}
                            </>

                        </>
                    )
                },
                // rowExpandable: (record) => record.brand
            }}
            columns={columns} dataSource={contractData} />
    )
}
