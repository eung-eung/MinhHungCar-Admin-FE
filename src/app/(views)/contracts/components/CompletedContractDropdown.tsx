import { Button, Dropdown, Menu } from 'antd'
import React from 'react'
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import { useRouter } from 'next/navigation';
export default function CompletedContractDropdown(
    {
        id
    }: {
        id: any
    }
) {
    const router = useRouter()
    const showCustomerContract = (id: any) => {
        window.open('/contracts/' + id, '_blank')
    }

    const openPaymentByContractId = (id: any) => {
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
                                label: 'Hợp đồng',
                                onClick: () => showCustomerContract(id)
                            },
                            {
                                key: '2',
                                label: 'Xem lịch sử thanh toán',
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
