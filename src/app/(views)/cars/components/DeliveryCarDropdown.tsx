'use client'
import { Button, Dropdown, Menu, Modal } from 'antd'
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import useAxiosAuth from '@/app/utils/hooks/useAxiosAuth';
import { ICar } from '@/app/models/Car.model';
import { useRouter } from 'next/navigation';
type IApproveRequest = {
    car_id: any,
    action: string
}
export default function DeliveryCarDropdown(
    {
        id,
        setRefresh
    }: {
        id: any,
        carDetail?: ICar,
        loadingDialog: boolean,
        setOpen: React.Dispatch<React.SetStateAction<boolean>>,
        setRefresh: React.Dispatch<React.SetStateAction<boolean>>
    }) {
    const axiosAuth = useAxiosAuth()
    const router = useRouter()

    const handleApproveCar = async (id: any) => {
        showConfirmModal("Bạn có muốn đưa xe vào hoạt động?")
            .then(async () => {
                try {
                    const response = await axiosAuth.put('/admin/car_application', {
                        car_id: id,
                        action: "approve_delivery"
                    } as IApproveRequest)
                    setRefresh(prev => !prev)
                } catch (error) {
                    console.log(error);

                }
            })
    }

    const handleRejectCar = async (id: any) => {
        showConfirmModal("Bạn có muốn từ chối xe này?")
            .then(async () => {
                try {
                    const response = await axiosAuth.put('/admin/car_application', {
                        car_id: id,
                        action: "reject"
                    } as IApproveRequest)
                    if (response.status === 200) {
                        setRefresh(prev => !prev)
                    }
                } catch (error) {
                    console.log(error);

                }
            })

    }

    const showCarContract = async (id: any) => {
        window.open('/cars/contract/' + id)
    }

    const showConfirmModal = (title: any) => {
        const { confirm } = Modal
        return new Promise((res, rej) => {
            confirm({
                title: title,
                onOk: () => {
                    res(true)
                },
                cancelText: "Hủy",
                onCancel: () => {
                    rej(true)
                }
            })
        })
    }

    return (
        <>
            <Dropdown
                dropdownRender={() => (
                    <Menu
                        items={[
                            {
                                key: '1',
                                label: 'Chi tiết',
                                onClick: () =>
                                    router.push('/cars/' + id)
                            },
                            {
                                key: '2',
                                label: 'Đưa vào hoạt động',
                                onClick: () =>
                                    handleApproveCar(id)
                            },
                            {
                                key: '3',
                                label: 'Hợp đồng',
                                onClick: () =>
                                    showCarContract(id)
                            },
                            // {
                            //     key: '3',
                            //     label: 'Từ chối',
                            //     onClick: () =>
                            //         handleRejectCar(id)
                            // },
                        ]}>

                    </Menu>
                )}

                placement="bottom" arrow>
                <Button><MoreHorizOutlinedIcon /></Button>
            </Dropdown>

        </>
    )
}
