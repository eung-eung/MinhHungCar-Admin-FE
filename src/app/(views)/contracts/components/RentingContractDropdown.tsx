import { Button, Dropdown, Menu } from 'antd'
import React from 'react'
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
export default function RentingContractDropdown(
    {
        id
    }: {
        id: any
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
                                onClick: () => showCustomerContract(id)
                            },
                            {
                                key: '2',
                                label: 'Hoàn thành',
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
