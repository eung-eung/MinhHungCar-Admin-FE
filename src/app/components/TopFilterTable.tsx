import { Button, ConfigProvider, DatePicker, Select } from 'antd'
import React, { useState } from 'react'
import ArrowDropDownRoundedIcon from '@mui/icons-material/ArrowDropDownRounded';
import SearchInput from './SearchInput';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import GarageConfigDialog from '../(views)/cars/components/GarageConfigDialog';
type Option = {
    value: string,
    label: string
}

export default function TopFilterTable(
    {
        handleChange,
        handleSearch,
        optionList,
        defaultValue,
        placeholder,
        showSearch,
        showDatepicker
    }: {
        handleChange: any,
        handleSearch?: any,
        optionList: Option[],
        defaultValue: any,
        placeholder?: any,
        showSearch?: boolean,
        showDatepicker?: boolean
    }) {
    const [open, setOpen] = useState<boolean>(false);
    const handleChangeDatepick = () => { }
    const showGarageDiaglog = () => {
        setOpen(true)
    }
    return (
        <div className='flex justify-between items-center mt-5'>
            <ConfigProvider
                theme={{
                    token: {
                        colorBgContainer: '#fff',
                        colorBorder: '#fff',
                        colorPrimaryHover: '#fff',
                        colorIcon: '#6C69FF',
                        colorPrimary: '#6C69FF'
                    },
                    components: {
                        Select: {
                            fontSize: 14,
                            optionSelectedColor: '#6C69FF'
                        },
                        Button: {
                            defaultHoverBorderColor: '#9244f9',
                            defaultHoverBg: '#fff',
                            defaultHoverColor: '#9244f9',
                            defaultBg: '#9244f9',
                            defaultColor: '#fff',
                        },


                    },
                }}
            >
                <Select
                    suffixIcon={<ArrowDropDownRoundedIcon sx={{ color: '#6C69FF' }} />}
                    variant='borderless'
                    defaultValue={defaultValue}
                    style={{
                        width: 200,
                        borderBottom: '2px solid #6C69FF',

                    }}
                    onChange={handleChange}
                    options={optionList}
                />

                <div className='w-3/6 flex items-center mb-5 justify-between relative'>
                    {
                        showSearch &&
                        <SearchInput callback={handleSearch} placeholder={placeholder} />
                    }
                    <Button
                        onClick={showGarageDiaglog}
                        style={{
                            height: '100%',
                            padding: 10,

                        }}>
                        <p>Bãi xe</p>
                        <SettingsOutlinedIcon />
                    </Button>
                    {
                        showDatepicker && <DatePicker
                            format={{
                                format: 'YYYY-MM-DD',
                                type: 'mask',
                            }}
                            onChange={handleChangeDatepick}
                        />
                    }
                </div>

            </ConfigProvider>
            <GarageConfigDialog open={open} setOpen={setOpen} />
        </div>
    )
}
