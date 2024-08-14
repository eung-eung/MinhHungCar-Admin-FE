'use client'
import { Button, ConfigProvider, DatePicker, DatePickerProps, Select } from 'antd'
import React, { SetStateAction, useState } from 'react'
import ArrowDropDownRoundedIcon from '@mui/icons-material/ArrowDropDownRounded';
import SearchInput from './SearchInput';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import GarageConfigDialog from '../(views)/cars/components/GarageConfigDialog';
import RefreshRoundedIcon from '@mui/icons-material/RefreshRounded';
import dayjs from 'dayjs';
import locale from 'antd/locale/vi_VN';
import 'dayjs/locale/vi';

dayjs.locale('vi');
type Option = {
    value: string,
    label: string
}

export default function TopFilterTable(
    {
        datepick,
        handleChange,
        handleSearch,
        optionList,
        defaultValue,
        placeholder,
        showSearch,
        showDatepicker,
        showGarageConfig,
        setRefresh,
        searchValue,
        handleChangeDatepick
    }: {
        datepick?: Date,
        handleChange?: any,
        handleSearch?: any,
        optionList: Option[],
        defaultValue: any,
        placeholder?: any,
        showSearch?: boolean,
        showDatepicker?: boolean,
        showGarageConfig?: boolean,
        setRefresh: React.Dispatch<React.SetStateAction<boolean>>,
        searchValue?: any,
        handleChangeDatepick?: any
    }) {
    const [open, setOpen] = useState<boolean>(false);

    const showGarageDiaglog = () => {
        setOpen(true)
    }
    const monthFormat = 'MM/YYYY';
    const handleDisableMonth: DatePickerProps['disabledDate'] = (current) => {
        return current && current > dayjs().startOf('month')
    };

    return (
        <div className='flex justify-between items-center pt-5 pb-5'>
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
            <div className='w-3/6 flex items-center mb-5 justify-end relative'>
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
            </div>
            {
                showDatepicker &&
                <ConfigProvider locale={locale}>
                    <DatePicker
                        allowClear={false}
                        onChange={handleChangeDatepick}
                        disabledDate={handleDisableMonth}
                        removeIcon={false}
                        defaultValue={dayjs(
                            (
                                datepick && (datepick.getMonth() + 1).toString().padStart(2, '0')
                                + '/'
                                + datepick?.getFullYear()
                            ),
                            monthFormat)}
                        format={monthFormat}
                        picker="month"
                    />
                </ConfigProvider>
            }
            {showGarageConfig && <GarageConfigDialog open={open} setOpen={setOpen} />}
        </div>
    )
}
