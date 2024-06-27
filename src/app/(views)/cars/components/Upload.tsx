import { Image, Upload, message } from 'antd'
import React from 'react'
import UploadButton from './UploadButton'
import useAxiosAuth from '@/app/utils/hooks/useAxiosAuth'

export default function UploadImage(
    {
        id,
        fileList,
        handleChange,
        handlePreview,
        handleRemove,
        previewImage,
        previewOpen,
        setPreviewImage,
        setPreviewOpen
    }: {
        id: any,
        fileList?: any,
        handleChange: any,
        handlePreview: any,
        handleRemove: any,
        previewImage: any,
        previewOpen: any,
        setPreviewOpen: any,
        setPreviewImage: any
    }) {
    const axiosAuth = useAxiosAuth()
    const handleUploadImage = async (file: any) => {
        const formData = new FormData()
        formData.append('document_category', 'COLLATERAL_ASSETS')
        formData.append('customer_contract_id', '4')
        formData.append('files', file.file)
        const response = await axiosAuth.put('/admin/contract/document', formData)
        console.log(response);

    }
    return (
        <>
            <Upload
                id={id}
                customRequest={handleUploadImage}
                listType="picture-card"
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleChange}
                onRemove={handleRemove}
            >
                <UploadButton />
                {/* {fileList.length >= 5 ? null : <UploadButton />} */}
            </Upload>
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
