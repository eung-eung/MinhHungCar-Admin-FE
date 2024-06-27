import { Button, Dropdown, Menu } from 'antd'
import React from 'react'
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
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
    const showCustomerContract = (id: any) => {
        window.open('/contracts/' + id, '_blank')
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
                                onClick: () =>
                                    showCustomerContract(id)
                            },
                            {
                                key: '2',
                                label: 'Đưa vào đang thuê',
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
