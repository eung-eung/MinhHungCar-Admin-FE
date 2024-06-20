import { IGarage } from '@/app/models/Garage.mode'
import useAxiosAuth from '@/app/utils/hooks/useAxiosAuth'
import { Modal } from 'antd'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
type GarageConfig = {
    key: string;
    value: number
}
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
    const [garageConfig, setGarageConfig] = useState<GarageConfig[]>()
    const [loading, setLoading] = useState<boolean>(true)
    const [modalText, setModalText] = useState('Content of the modal');
    const { t } = useTranslation()

    const getGarageConfig = async () => {
        setLoading(true)
        const response = await axiosAuth.get('/garage_config')
        const reponseToArray = Object.keys(response.data).map
            (
                key => ({
                    key: key,
                    value: response.data[key]
                })
            )


        setGarageConfig(reponseToArray)
        setLoading(false)
    }
    useEffect(() => {
        if (open) {
            console.log('zo');
            getGarageConfig()
        }
    }, [open])

    const handleOk = () => {
        setModalText('The modal will be closed after two seconds');
        setConfirmLoading(true);
        setTimeout(() => {
            setOpen(false);
            setConfirmLoading(false);
        }, 2000);
    };

    const handleCancel = () => {
        console.log('Clicked cancel button');
        setOpen(false);
    };
    return (
        <>
            <Modal
                title="Số lượng xe tối đa trong bãi đỗ"
                open={open}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
                maskClosable={false}
                loading={loading}
            >
                <div>
                    {garageConfig?.map(config => <div>
                        <p>{t(`common:${config.key}`)}</p>
                        <p>{config.value}</p>
                    </div>)}
                </div>
            </Modal></>
    )
}
