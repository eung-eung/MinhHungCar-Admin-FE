import { Button, Dropdown, Menu, Modal } from 'antd'
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import useAxiosAuth from '@/app/utils/hooks/useAxiosAuth';
import { ICar } from '@/app/models/Car.model';
type IApproveRequest = {
    car_id: any,
    action: string
}
export default function DeliveryCarDropdown(
    {
        id,
        handleOpenDetailDialog,
        setRefresh
    }: {
        id: any,
        handleOpenDetailDialog: any,
        carDetail?: ICar,
        loadingDialog: boolean,
        setOpen: React.Dispatch<React.SetStateAction<boolean>>,
        setRefresh: React.Dispatch<React.SetStateAction<boolean>>
    }) {
    const axiosAuth = useAxiosAuth()


    const handleApproveCar = async (id: any) => {
        showConfirmModal("Bạn có muốn đưa xe vào hoạt động?")
            .then(async () => {
                const response = await axiosAuth.put('/admin/car_application', {
                    car_id: id,
                    action: "approve_delivery"
                } as IApproveRequest)
                setRefresh(prev => !prev)
            })
    }

    const handleRejectCar = async (id: any) => {
        showConfirmModal("Bạn có muốn từ chối xe này?")
            .then(async () => {
                const response = await axiosAuth.put('/admin/car_application', {
                    car_id: id,
                    action: "reject"
                } as IApproveRequest)
                console.log('response: ', response);
                if (response.status === 200) {

                    setRefresh(prev => !prev)
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
                                    handleOpenDetailDialog(id)
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
