import { IGarage, IGarageRequest } from '@/app/models/Garage.model'
import useAxiosAuth from '@/app/utils/hooks/useAxiosAuth'
import { Button, ConfigProvider, Input, Modal } from 'antd'
import { ChangeEvent, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Bounce, ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
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
    const [modalText, setModalText] = useState('Content of the modal');
    const { t } = useTranslation()

    const getGarageConfig = async () => {
        setLoading(true)
        const response = await axiosAuth.get('/garage_config')
        setGarageConfig(response.data)
        setLoading(false)
    }
    useEffect(() => {
        if (open) {
            getGarageConfig()
            console.log('zasd');
        }
    }, [open])

    const handleOk = async () => {
        setConfirmLoading(true);
        const config = {} as IGarageRequest
        config.max_7_seats = garageConfig?.max_7_seats
        config.max_4_seats = garageConfig?.max_4_seats
        config.max_15_seats = garageConfig?.max_15_seats
        console.log(config);

        const response = await axiosAuth.put('/garage_config', config)
        if (response.status === 200) {
            toast.success('Cập nhật thành công', {
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
        }
        setOpen(false);
        setConfirmLoading(false);

    };

    const handleCancel = () => {
        setOpen(false);
        setConfirmLoading(false);
    };

    const handleOnChange = (e: ChangeEvent<HTMLInputElement>, key: any) => {
        setGarageConfig((config: any) => ({
            ...config,
            [key]: parseInt(e.target.value)
        }))
    }

    return (
        <>

            <ConfigProvider
                theme={{
                    token: {
                        colorPrimary: "#9244f9"
                    }
                }}
            >


                <Modal
                    title="Số lượng xe tối đa trong bãi đỗ"
                    open={open}
                    onOk={handleOk}
                    confirmLoading={confirmLoading}
                    onCancel={handleCancel}
                    cancelText="Hủy"
                    maskClosable={false}
                    loading={loading}

                >
                    <div className='mt-5'>
                        {!loading &&
                            Object?.keys(garageConfig as IGarage).map((key) => <div className='flex items:center mb-4'>
                                <p className='flex-1/2 w-1/5'>{t(`common:${key}`)}</p>
                                <Input type='number' className='flex-1' size='middle' disabled={key === 'total' ? true : false} value={(garageConfig as IGarage)[key as KeyIGarage]} onChange={(e) => handleOnChange(e, key)} />
                            </div>)


                        }
                    </div>
                </Modal>
            </ConfigProvider>

        </>
    )
}
