'use client'

import { Button, Dropdown, GetProp, Menu, Modal, Switch, Table, UploadFile, UploadProps } from 'antd'
import React, { useState } from 'react'
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import { getBase64 } from '@/app/utils/getBase64';
import UploadImage from '../cars/components/Upload';
import TopFilterTable from '@/app/components/TopFilterTable';

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

export default function Contracts() {
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const columns = [
        {
            title: 'Tên khách hàng',
            dataIndex: 'customerName',
            key: 'customerName',
        },
        {
            title: 'Biển số xe',
            dataIndex: 'carNumber',
            key: 'carNumber',
        },
        {
            title: 'Ngày nhận xe',
            dataIndex: 'startDate',
            key: 'startDate',
        },
        {
            title: 'Ngày trả xe',
            dataIndex: 'endDate',
            key: 'endDate',
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'phoneNumber',
            key: 'phoneNumber',
        },
        {
            title: 'Loại thế chấp',
            dataIndex: 'collateralType',
            key: 'collateralType',
        },
        {
            title: '',
            dataIndex: 'action',
            key: 'action',
            render: () => {
                return <div>
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
    const contractData = [
        {
            key: 1,
            customerName: 'Nguyễn Văn A',
            carNumber: 'Audi 2023',
            startDate: '20/05/2024',
            endDate: '29/05/2024',
            phoneNumber: '0391102281',
            collateralType: 'Tiền mặt'
        },
        {
            key: 2,
            customerName: 'Nguyễn Văn A',
            carNumber: 'Audi 2023',
            startDate: '20/05/2024',
            endDate: '29/05/2024',
            phoneNumber: '0391102281',
            collateralType: 'Tiền mặt'
        },
        {
            key: 3,
            customerName: 'Nguyễn Văn A',
            carNumber: 'Audi 2023',
            startDate: '20/05/2024',
            endDate: '29/05/2024',
            phoneNumber: '0391102281',
            collateralType: 'Tiền mặt'
        },
        {
            key: 4,
            customerName: 'Nguyễn Văn A',
            carNumber: 'Audi 2023',
            startDate: '20/05/2024',
            endDate: '29/05/2024',
            phoneNumber: '0391102281',
            collateralType: 'Tiền mặt'
        },
    ]
    const [fileList, setFileList] = useState<UploadFile[]>([
        {
            uid: '-1',
            name: 'image.png',
            status: 'done',
            url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        },
        {
            uid: '-2',
            name: 'image.png',
            status: 'done',
            url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        },
        {
            uid: '-3',
            name: 'image.png',
            status: 'done',
            url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        },
        {
            uid: '-4',
            name: 'image.png',
            status: 'done',
            url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        },
        {
            uid: '-xxx',
            percent: 50,
            name: 'image.png',
            status: 'uploading',
            url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        },
        {
            uid: '-5',
            name: 'image.png',
            status: 'error',
        },
    ]);

    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as FileType);
        }

        setPreviewImage(file.url || (file.preview as string));
        setPreviewOpen(true);
    };

    const handleUpload: UploadProps['onChange'] = ({ fileList: newFileList }) =>
        setFileList(newFileList);

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
    const handleSearch = () => {

    }

    const handleChange = () => {

    }

    return (
        <>
            <TopFilterTable
                placeholder='Tìm kiếm theo biển số xe/tên khách hàng'
                defaultValue='waiting'
                handleChange={handleChange}
                optionList={[
                    { label: 'Đã đặt', value: 'waiting' },
                    { label: 'Đang thuê', value: 'working' },
                    { label: 'Hoàn thành', value: 'completed' },
                    { label: 'Đã hủy', value: 'cancel' },
                ]}
                handleSearch={handleSearch}
                showGarageConfig={false}

            />
            <Table
                expandable={{
                    expandedRowRender: (record) => {
                        return (
                            <>
                                <h2 className='text-base mb-3 font-semibold '>Hình ảnh xe thế chấp</h2>
                                <UploadImage
                                    fileList={fileList}
                                    handleChange={handleUpload}
                                    handlePreview={handlePreview}
                                    handleRemove={handleRemove}
                                    previewOpen={previewOpen}
                                    previewImage={previewImage}
                                    setPreviewImage={setPreviewImage}
                                    setPreviewOpen={setPreviewOpen}
                                />
                                <div className='flex mt-5 items-center'>
                                    <p className='text-base mt-3 mb-3 font-semibold mr-3'>Hoàn trả:</p>
                                    <Switch defaultChecked />
                                </div>
                                <h2 className='text-base mt-3 mb-3 font-semibold '>
                                    Tình trạng xe khi khách hàng nhận
                                </h2>
                                <UploadImage
                                    fileList={fileList}
                                    handleChange={handleUpload}
                                    handlePreview={handlePreview}
                                    handleRemove={handleRemove}
                                    previewOpen={previewOpen}
                                    previewImage={previewImage}
                                    setPreviewImage={setPreviewImage}
                                    setPreviewOpen={setPreviewOpen}
                                />

                            </>
                        )
                    },
                    // rowExpandable: (record) => record.brand
                }}
                columns={columns} dataSource={contractData} />
        </>
    )
}
