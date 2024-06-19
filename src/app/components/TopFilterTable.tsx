import { ConfigProvider, DatePicker, Select } from 'antd'
import React from 'react'
import ArrowDropDownRoundedIcon from '@mui/icons-material/ArrowDropDownRounded';
import SearchInput from './SearchInput';

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
    const handleChangeDatepick = () => { }
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
            </ConfigProvider>
            {
                showSearch &&
                <SearchInput callback={handleSearch} placeholder={placeholder} />
            }
            {showDatepicker && <DatePicker
                format={{
                    format: 'YYYY-MM-DD',
                    type: 'mask',
                }}
                onChange={handleChangeDatepick}
            />}
        </div>
    )
}
