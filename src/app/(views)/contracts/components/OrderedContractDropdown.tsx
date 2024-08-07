import { Button, Dropdown, Menu } from 'antd'
import React from 'react'
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import { useRouter } from 'next/navigation';
import nProgress from 'nprogress';
export default function OrderedContractDropdown(
    {
        id,
        approveCustomerContract,
        rejectCustomerContract
    }: {
        id: any,
        approveCustomerContract: (id: any) => void,
        rejectCustomerContract: (id: any) => void
    }
) {
    const router = useRouter()
    const showCustomerContract = (id: any) => {
        router.push('/contracts/' + id)
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
                                onClick: () => {
                                    nProgress.start()
                                    showCustomerContract(id)
                                }
                            },
                            {
                                key: '2',
                                label: 'Đồng ý cho thuê',
                                onClick: () =>
                                    approveCustomerContract(id)
                            },
                            {
                                key: '3',
                                label: 'Từ chối cho thuê',
                                onClick: () =>
                                    rejectCustomerContract(id)
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
