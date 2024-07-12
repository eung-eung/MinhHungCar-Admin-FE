import { Button, Dropdown, Menu } from 'antd'
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import { useRouter } from 'next/navigation';

export default function ActiveCarDropdown(
    {
        id,
    }: {
        id: any,
    }
) {
    const showCarContract = async (id: any) => {
        window.open('/cars/contract/' + id)
    }
    const cancelCarContract = (id: any) => {

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
                            onClick: () =>
                                router.push('/cars/' + id)
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
