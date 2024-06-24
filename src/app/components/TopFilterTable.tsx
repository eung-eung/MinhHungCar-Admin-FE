import { Button, DatePicker, Select } from 'antd'
import React, { SetStateAction, useState } from 'react'
import ArrowDropDownRoundedIcon from '@mui/icons-material/ArrowDropDownRounded';
import SearchInput from './SearchInput';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import GarageConfigDialog from '../(views)/cars/components/GarageConfigDialog';
import RefreshRoundedIcon from '@mui/icons-material/RefreshRounded';

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
        showDatepicker,
        showGarageConfig,
        setRefresh,
        searchValue
    }: {
        handleChange: any,
        handleSearch?: any,
        optionList: Option[],
        defaultValue: any,
        placeholder?: any,
        showSearch?: boolean,
        showDatepicker?: boolean,
        showGarageConfig?: boolean,
        setRefresh: React.Dispatch<React.SetStateAction<boolean>>,
        searchValue: any
    }) {
    const [open, setOpen] = useState<boolean>(false);
    const handleChangeDatepick = () => { }
    const showGarageDiaglog = () => {
        setOpen(true)
    }
    return (
        <div className='flex justify-between items-center mt-5'>
            <div className='flex items-center w-3/6 justify-start'>
                <Button
                    size='middle'
                    onClick={() => setRefresh(prev => !prev)}
                    type='default'
                    className='mr-5'>
                    <RefreshRoundedIcon />
                </Button>
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
            </div>
            <div className='w-3/6 flex items-center mb-5 justify-between relative'>
                {
                    showSearch &&
                    <SearchInput value={searchValue} callback={handleSearch} placeholder={placeholder} />
                }
                {showGarageConfig &&
                    <Button
                        type='primary'
                        onClick={showGarageDiaglog}
                        style={{
                            height: '100%',
                            padding: 10,
                            marginLeft: 10
                        }}>
                        <p>Bãi xe</p>
                        <SettingsOutlinedIcon />
                    </Button>
                }
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
            {showGarageConfig && <GarageConfigDialog open={open} setOpen={setOpen} />}
        </div>
    )
}
