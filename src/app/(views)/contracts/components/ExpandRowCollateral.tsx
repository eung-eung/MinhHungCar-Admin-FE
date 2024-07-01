import { Button, GetProp, Image, Upload, UploadProps } from 'antd'
import React, { useState } from 'react'
import UploadButton from '../../cars/components/UploadButton'
import { UploadFile } from 'antd/lib';
import { getBase64 } from '@/app/utils/getBase64';
import useAxiosAuth from '@/app/utils/hooks/useAxiosAuth';
type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];
export default function ExpandRowCollateral(
    {
        id,
        expandLoading,
        fileList,
        status
    }: {
        id: any,
        expandLoading: boolean,
        fileList: any,
        status: any

    }
) {
    const axiosAuth = useAxiosAuth()
    const [previewOpen, setPreviewOpen] = useState<boolean>(false);
    const [previewImage, setPreviewImage] = useState<any>('');
    const [fileListUploadToApi, setFileListUploadToApi] = useState<UploadFile[]>([])
    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as FileType);
        }

        setPreviewImage(file.url || (file.preview as string));
        setPreviewOpen(true);
    };
    const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
        // setFileListUploadToApi(prev => ([...prev, newFile]));
        setFileListUploadToApi(newFileList);
    }
    const handleUpdate = async (id: any, type: any) => {
        const formData = new FormData()
        const files = fileListUploadToApi.map(file => file.originFileObj)
        formData.append('document_category', 'COLLATERAL_ASSETS')
        formData.append('customer_contract_id', id)
        files.forEach((file: any) => formData.append('files', file))

        const response = await axiosAuth.put('/admin/contract/document', formData)
        console.log(response);
        // if (response.status === 200)


    }
    return (
        <>
            <h2 className='text-base mb-3 font-semibold '>Hình ảnh xe thế chấp</h2>
            {
                !expandLoading &&
                <Upload
                    showUploadList={{
                        showRemoveIcon: status === 'ordered' ? true : false
                    }}
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
            {
                status === 'ordered'
                && <Button
                    onClick={
                        () => handleUpdate(id, 'collateral')
                    }
                    className='mt-3'
                >
                    Lưu ảnh xe thế chấp
                </Button>
            }
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
