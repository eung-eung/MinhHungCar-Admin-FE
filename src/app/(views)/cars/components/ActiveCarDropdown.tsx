'use client'
import { Button, Dropdown, Menu, Modal } from 'antd'
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import { useRouter } from 'next/navigation';
import nProgress from 'nprogress';
import useAxiosAuth from '@/app/utils/hooks/useAxiosAuth';
import { errorNotify } from '@/app/utils/toast';

export default function ActiveCarDropdown(
    {
        id,
    }: {
        id: any,
    }
) {
    const axiosAuth = useAxiosAuth()
    const showCarContract = async (id: any) => {
        window.open('/cars/contract/' + id)
    }
    const cancelCarContract = async (id: any) => {
        const { confirm } = Modal
        confirm({
            title: "Bạn có muốn hủy hợp đồng xe này?",
            cancelText: "Hủy",
            onOk: async () => {
                try {
                    const response = await axiosAuth.put("/admin/car/inactive", {
                        car_id: id
                    })
                } catch (error) {
                    console.log(error);
                    errorNotify("Xe đang được khách hàng thuê, vui lòng hủy sau khi khách hàng trả xe")
                }
            }
        })
    }
    const router = useRouter()
    return (
        <Dropdown
            dropdownRender={() => (
                <Menu
                    items={[
                        {
                            key: '1',
                            label: 'Chi tiết',
                            onClick: () => {
                                nProgress.start()
                                router.push('/cars/' + id)
                            }
                        },
                        {
                            key: '2',
                            label: 'Hợp đồng',
                            onClick: () =>
                                showCarContract(id)
                        },
                        {
                            key: '3',
                            label: 'Hủy hợp đồng',
                            onClick: () =>
                                cancelCarContract(id)
                        },
                    ]}>

                </Menu>
            )}

            placement="bottom" arrow>
            <Button><MoreHorizOutlinedIcon /></Button>
        </Dropdown>
    )
}
