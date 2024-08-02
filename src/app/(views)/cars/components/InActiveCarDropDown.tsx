'use client'
import { Button, Dropdown, Menu } from 'antd'
import { useRouter } from 'next/navigation'
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import React from 'react'

export default function InActiveCarDropDown({
    id
}: {
    id: any
}) {
    const router = useRouter()
    const showCarContract = async (id: any) => {
        window.open('/cars/contract/' + id)
    }
    return (
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
                            label: 'Hợp đồng',
                            onClick: () =>
                                showCarContract(id)
                        }
                    ]}>

                </Menu>
            )}

            placement="bottom" arrow>
            <Button><MoreHorizOutlinedIcon /></Button>
        </Dropdown>
    )
}
