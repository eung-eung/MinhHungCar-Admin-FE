import { Image, Upload } from 'antd'
import React from 'react'
import UploadButton from './UploadButton'

export default function UploadImage(
    {
        fileList,
        handleChange,
        handlePreview,
        handleRemove,
        previewImage,
        previewOpen,
        setPreviewImage,
        setPreviewOpen
    }: {
        fileList: any,
        handleChange: any,
        handlePreview: any,
        handleRemove: any,
        previewImage: any,
        previewOpen: any,
        setPreviewOpen: any,
        setPreviewImage: any
    }) {

    return (
        <>
            <Upload
                action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                listType="picture-card"
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleChange}
                onRemove={handleRemove}
            >
                {fileList.length >= 8 ? null : <UploadButton />}
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
