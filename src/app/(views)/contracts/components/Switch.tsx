import { Switch } from 'antd'
import React from 'react'

export default function SwitchIsReturn(
    {
        isReturn
    }: {
        isReturn: boolean
    }
) {
    return (
        <div
            className='flex mt-5 items-center'
            style={
                {
                    borderBottom: '0.5px solid #ccc'
                }
            }>
            <p
                className='text-base mt-3 mb-3 font-semibold mr-3'
                style={
                    {
                        color: "#9250fa"
                    }
                }
            >
                Hoàn trả:
            </p>
            <Switch
                style={{ opacity: 1 }}
                disabled
                checked={
                    isReturn
                        ? true
                        : false
                }
            />
        </div>
    )
}
