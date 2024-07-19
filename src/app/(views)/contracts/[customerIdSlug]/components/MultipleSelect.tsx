import { Select } from 'antd'
import React from 'react'

export default function MultipleSelect(
    {
        handleChange,
        options,
        placeholder
    }: {
        handleChange: (value: string) => void,
        options: any,
        placeholder: any
    }) {
    return (
        <Select
            mode="multiple"
            allowClear
            style={{ width: '70%' }}
            placeholder={placeholder}
            onChange={handleChange}
            options={options}
        />
    )
}
