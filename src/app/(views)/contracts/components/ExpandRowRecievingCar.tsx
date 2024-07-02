import { getBase64 } from '@/app/utils/getBase64';
import { Button, ConfigProvider, GetProp, Image, Modal, Upload, UploadProps, message } from 'antd'
import { UploadFile } from 'antd/lib';
import React, { use, useState } from 'react'
import UploadButton from '../../cars/components/UploadButton';
import useAxiosAuth from '@/app/utils/hooks/useAxiosAuth';
import { errorNotify, sucessNotify } from '@/app/utils/toast';
type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

export default function ExpandRowRecievingCar(
    {
        id,
        fileList,
        status,
        expandLoading,
        setFileCarCondition,
        getDataForExpand
    }: {
        id: any,
        fileList: any,
        status: any,
        expandLoading: boolean,
        setFileCarCondition: any,
        getDataForExpand: (id: any) => void
    }
) {
    const [loadingUpdate, setLoadingUpdate] = useState<boolean>(false)
    const axiosAuth = useAxiosAuth()
    const [previewOpen, setPreviewOpen] = useState<boolean>(false);
    const [previewImage, setPreviewImage] = useState<any>('');
    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as FileType);
        }

        setPreviewImage(file.url || (file.preview as string));
        setPreviewOpen(true);
    };
    const handleChange: UploadProps['onChange'] = ({ file, fileList: newfileList }) => {
        const isJPG = file.type === 'image/jpeg';
        if (isJPG) {
            setFileCarCondition(newfileList)
        } else {
            setFileCarCondition((prev: any) => prev)
        }
    }
    const handleUpdate = async (id: any) => {
        setLoadingUpdate(true)
        const formData = new FormData()
        const files = fileList.filter((file: any) => !file.isUpload).map((file: any) => file.originFileObj)
        formData.append('document_category', 'RECEIVING_CAR_IMAGES')
        formData.append('customer_contract_id', id)
        files.forEach((file: any) => formData.append('files', file))

        const response = await axiosAuth.put('/admin/contract/document', formData)
        setLoadingUpdate(false)
        if (response.status === 200) {
            sucessNotify('Thêm ảnh thành công')
            getDataForExpand(id)
        } else {
            errorNotify('Thêm thất bại, vui lòng thử lại')
        }
    }
    const handleRemove = async (file: any) => {
        const { confirm } = Modal
        if (file.isUpload) {
            confirm({
                title: 'Bạn có muốn xóa ảnh này?',
                onOk: async () => {
                    const response = await axiosAuth.put('/admin/contract/image', {
                        customer_contract_image_id: file.uid,
                        new_status: "inactive"
                    })
                    setFileCarCondition((prev: any) => {
                        const newList = prev.filter((_file: any) => _file.uid !== file.uid)
                        return newList
                    })


                },
                onCancel: () => {

                }
            })
        }


    }
    const handleUpload: UploadProps['beforeUpload'] = ({ type, }) => {
        const isJPG = type === 'image/jpeg';
        if (!isJPG) {
            errorNotify('Bạn chỉ được thêm ảnh jpg');

        }
        return true
    }
    return (

        <>
            <h2 className='text-base mt-3 mb-3 font-semibold '>
                Tình trạng xe khi khách hàng nhận
            </h2>
            <ConfigProvider
                theme={{
                    token: {
                        colorBorder: '#3434'
                    },
                }}>

                {!expandLoading
                    && <Upload
                        showUploadList={{
                            showRemoveIcon: (
                                status === 'ordered'
                                && !loadingUpdate
                            )
                                ? true : false
                        }}
                        itemRender={(originNode, file: any) => {
                            return <div
                                style={{
                                    border: !file.isUpload
                                        ? "1px solid rgb(34, 197, 94)"
                                        : "1px solid #ccc"
                                }}
                                className={originNode.props.className}
                            >
                                {originNode.props.children}</div>


                        }}
                        beforeUpload={handleUpload}
                        onRemove={handleRemove}
                        listType="picture-card"
                        fileList={fileList}
                        onPreview={handlePreview}
                        onChange={handleChange}
                    >
                        {
                            fileList.length >= 6
                                ? null
                                : status === 'ordered'
                                && <UploadButton />
                        }
                    </Upload>
                }
            </ConfigProvider>
            {status === 'ordered'
                && <Button
                    loading={loadingUpdate}
                    disabled={loadingUpdate ||
                        fileList.filter((file: any) => !file.isUpload).length < 1}
                    onClick={
                        () => handleUpdate(id)
                    }
                    className='mt-3'
                >
                    Lưu
                </Button>}
            {previewImage && (
                <Image
                    wrapperStyle={{ display: 'none' }}
                    preview={{
                        visible: previewOpen,
                        onVisibleChange: (visible) => setPreviewOpen(visible),
                        afterOpenChange: (visible) => !visible && setPreviewImage(''),
                    }}
                    src={previewImage}
                />
            )}
        </>
    )
}
