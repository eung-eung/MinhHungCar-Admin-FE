import { IGarage, IGarageRequest } from '@/app/models/Garage.model'
import useAxiosAuth from '@/app/utils/hooks/useAxiosAuth'
import { Button, Flex, Modal, Tag } from 'antd'
import { ChangeEvent, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Bounce, ToastContainer, toast } from 'react-toastify'
import WarehouseRoundedIcon from '@mui/icons-material/WarehouseRounded';
import 'react-toastify/dist/ReactToastify.css';
import { Input } from '../../login/components/Input'
import { removeKeys } from '@/app/utils/removeKeysFromObject'
type KeyIGarage = keyof IGarage;

export default function GarageConfigDialog(
    {
        open,
        setOpen
    }: {
        open: boolean,
        setOpen: React.Dispatch<React.SetStateAction<boolean>>
    }) {
    const axiosAuth = useAxiosAuth()
    const [confirmLoading, setConfirmLoading] = useState<boolean>(false);
    const [garageConfig, setGarageConfig] = useState<IGarage>()
    const [loading, setLoading] = useState<boolean>(true)
    const { t } = useTranslation()
    const [error, setError] = useState<any>({
        max_4_seats: false,
        max_7_seats: false,
        max_15_seats: false
    })
    const keysToRemove = ["current_4_seats", "current_7_seats", "current_15_seats", "current_total"];
    const getGarageConfig = async () => {
        setLoading(true)
        const response = await axiosAuth.get('/admin/garage_config')
        const filterData = removeKeys(response.data, keysToRemove)
        setGarageConfig(filterData)
        setLoading(false)
    }
    useEffect(() => {
        if (open) {
            getGarageConfig()
        }
    }, [open])

    const handleOk = async () => {
        setConfirmLoading(true);
        const config = {} as IGarageRequest
        config.max_7_seats = parseInt(garageConfig?.max_7_seats)
        config.max_4_seats = parseInt(garageConfig?.max_4_seats)
        config.max_15_seats = parseInt(garageConfig?.max_15_seats)

        try {
            const response = await axiosAuth.put('/admin/garage_config', config)
            if (response.status === 200) {
                toast.success('Cập nhật thành công', {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                })
            }
            setOpen(false);
            setConfirmLoading(false);
        } catch (error: any) {
            if (error.response.status === 400) {
                toast.error('Cập nhật thất bại', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                })
                setConfirmLoading(false);
            }
        }


    };

    const handleCancel = () => {
        setOpen(false);
        setConfirmLoading(false);
        setError((prev: any) => ({
            ...prev,
            max_4_seats: false,
            max_7_seats: false,
            max_15_seats: false
        }))
    };

    const handleOnChange = (e: ChangeEvent<HTMLInputElement>, key: any) => {
        const numberRegex = /^\d+$/;
        if (!numberRegex.test(e.target.value)) {
            setError((prev: any) => ({
                ...prev, [key]: true
            }))
        } else {
            setError((prev: any) => ({
                ...prev, [key]: false
            }))
        }
        setGarageConfig((config: any) => ({
            ...config,
            [key]: (e.target.value)
        }))
    }
    return (
        <>
            <Modal
                title={
                    <Tag
                        style={{
                            verticalAlign: 'middle'
                        }}
                        icon={
                            <WarehouseRoundedIcon
                                color='warning' />
                        }
                        color='orange'>
                        Tổng số lượng xe tối đa trong bãi: {garageConfig?.total}
                    </Tag>}
                open={open}
                onOk={handleOk}
                okText='Cập nhật'
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
                cancelText="Hủy"
                maskClosable={false}
                loading={loading}
            >
                <div className='mt-5'>
                    {!loading &&
                        Object?.keys(garageConfig as IGarage).map((key) => {
                            if (key === 'total') return
                            return <div className='mb-5'>
                                <p className='flex-1/2 w-1/5'>{t(`common:${key}`)}</p>
                                <div className='flex flex-col'>
                                    <Input
                                        type='text'
                                        value={(garageConfig as IGarage)[key as KeyIGarage]}
                                        onChange={(e) => handleOnChange(e, key)}
                                    />
                                    {
                                        error[key]
                                            ? <Tag color='red'>
                                                {t(`common:${key}`) + ' phải là số'}
                                            </Tag>
                                            :
                                            ''
                                    }
                                </div>

                            </div>
                        })


                    }
                </div>
            </Modal>
        </>
    )
}
