import { Button, GetProp, Image, Modal, Upload, UploadProps } from 'antd'
import React, { SetStateAction, useState } from 'react'
import UploadButton from '../../cars/components/UploadButton'
import { UploadFile } from 'antd/lib';
import { getBase64 } from '@/app/utils/getBase64';
import useAxiosAuth from '@/app/utils/hooks/useAxiosAuth';
import { errorNotify, sucessNotify } from '@/app/utils/toast';
type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];
export default function ExpandRowCollateral(
    {
        id,
        expandLoading,
        fileList,
        status,
        setFileList,
        getDataForExpand
    }: {
        id: any,
        expandLoading: boolean,
        fileList: any,
        status: any,
        setFileList: React.Dispatch<SetStateAction<UploadFile[]>>,
        getDataForExpand: (id: any) => void

    }
) {
    const axiosAuth = useAxiosAuth()
    const [loadingUpdate, setLoadingUpdate] = useState<boolean>(false)
    const [previewOpen, setPreviewOpen] = useState<boolean>(false);
    const [previewImage, setPreviewImage] = useState<any>('');
    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as FileType);
        }

        setPreviewImage(file.url || (file.preview as string));
        setPreviewOpen(true);
    };
    const handleChange: UploadProps['onChange'] = ({ file, fileList: newFileList }) => {
        const isJPG = file.type === ('image/jpeg' || 'image/png');
        if (isJPG) {
            setFileList(newFileList);
        } else {
            setFileList((prev: any) => prev)
        }

    }

    const handleUpload: UploadProps['beforeUpload'] = ({ type, }) => {
        const isJPG = type === 'image/jpeg' || 'image/png';
        if (!isJPG) {
            errorNotify('Bạn chỉ được thêm ảnh dạng jpg/png');
        }
        return true
    }

    const handleUpdate = async (id: any) => {
        setLoadingUpdate(true)
        const formData = new FormData()
        const files = fileList.map((file: UploadFile) => file.originFileObj)
        formData.append('document_category', 'COLLATERAL_ASSETS')
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
                    setFileList((prev: any) => {
                        const newList = prev.filter((_file: any) => _file.uid !== file.uid)
                        return newList
                    })
                },
                onCancel: () => {

                }
            })
        }
    }

    return (
        <>
            <h2
                style={{ color: "#9250fa" }}
                className='text-base mb-3 font-semibold '
            >Hình ảnh xe thế chấp
            </h2>
            {
                !expandLoading &&
                <Upload
                    showUploadList={{
                        showRemoveIcon: (
                            status === 'ordered'
                            && !loadingUpdate
                        )
                            ? true : false
                    }}
                    listType="picture-card"
                    fileList={fileList}
                    beforeUpload={handleUpload}
                    onPreview={handlePreview}
                    onChange={handleChange}
                    onRemove={handleRemove}
                    itemRender={(originNode, file: any) => {
                        return <div
                            style={{
                                border: !file.isUpload
                                    ? "1px solid rgb(34, 197, 94)"
                                    : "1px solid #ccc"
                            }}
                            className={originNode.props.className}
                        >
                            {originNode.props.children}
                        </div>
                    }}
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
                    loading={loadingUpdate}
                    disabled={loadingUpdate ||
                        fileList.filter((file: any) => !file.isUpload).length < 1}
                    onClick={
                        () => handleUpdate(id)
                    }
                    className='mt-3'
                >
                    Lưu
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
