import { Button, Dropdown, Menu } from 'antd'
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import { useRouter } from 'next/navigation';
import { SetStateAction } from 'react';

export default function ReplaceCarDropdown(
    {
        handleOpenDetailDialog,
        handleOpenAccountDetailDialog,
        changeCarForCustomer,
        setOpenContractPdf
    }: {
        handleOpenDetailDialog: () => void,
        handleOpenAccountDetailDialog: () => void,
        changeCarForCustomer: () => void,
        setOpenContractPdf: React.Dispatch<SetStateAction<boolean>>
    }
) {
    const router = useRouter()
    return (
        <Dropdown
            dropdownRender={() => (
                <Menu
                    items={[
                        {
                            key: '1',
                            label: 'Chi tiết',
                            onClick: () =>
                                handleOpenDetailDialog()
                        },
                        {
                            key: '2',
                            label: 'Thông tin đối tác',
                            onClick: () =>
                                handleOpenAccountDetailDialog()
                        },
                        {
                            key: '3',
                            label: 'Chọn để thay thế',
                            onClick: () =>
                                changeCarForCustomer()
                        },
                    ]}>

                </Menu>
            )}

            placement="bottom" arrow>
            <Button><MoreHorizOutlinedIcon /></Button>
        </Dropdown>
    )
}
