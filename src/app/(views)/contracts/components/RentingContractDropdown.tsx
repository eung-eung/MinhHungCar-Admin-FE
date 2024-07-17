import { Button, Dropdown, Menu } from 'antd'
import React from 'react'
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import { useRouter } from 'next/navigation';
import nProgress from 'nprogress';
export default function RentingContractDropdown(
    {
        id
    }: {
        id: any
    }
) {
    const router = useRouter()
    const showCustomerContract = (id: any) => {
        router.push('/contracts/' + id)
    }

    const openPaymentByContractId = (id: any) => {
        nProgress.start();
        router.push('/contracts/payments/' + id)
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
                                onClick: () => showCustomerContract(id)
                            },
                            {
                                key: '2',
                                label: 'Hoàn thành',
                                onClick: () => openPaymentByContractId(id)
                            },

                        ]}>

                    </Menu>
                )}

                placement="bottom" arrow>
                <Button><MoreHorizOutlinedIcon /></Button>
            </Dropdown>

        </>
    )
}
