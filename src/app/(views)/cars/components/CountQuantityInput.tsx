'use client'
import { ICar } from '@/app/models/Car.model'
import useAxiosAuth from '@/app/utils/hooks/useAxiosAuth'
import { Modal } from 'antd'
import React, { SetStateAction, useRef, useState } from 'react'

export default function CountQuantityInput(
    {
        warningCount,
        car,
        maxWarningCount,
        setRefresh
    }: {
        warningCount: any,
        car: ICar,
        maxWarningCount: any,
        setRefresh?: React.Dispatch<SetStateAction<boolean>>
    }) {
    const axiosAuth = useAxiosAuth()
    const [value, setValue] = useState<any>(warningCount)
    const input = useRef<HTMLInputElement>(null)
    const handleDecrease = async () => {
        const { confirm } = Modal
        if (value < 1) {
            return
        }
        if (input && input.current) {
            confirm({
                title: `Bạn có muốn giảm số lần giao trễ của xe ${car.car_model.brand} ${car.car_model.model} ${car.car_model.year}?`,
                onOk: async () => {
                    try {
                        const response = await axiosAuth.put('/admin/warning_count', {
                            car_id: car.id,
                            new_warning_count: value - 1
                        })
                        console.log('response: ', response);
                        setValue((prev: any) => value - 1)
                    } catch (error) {

                    }

                },
                cancelText: "Hủy",
                okText: "Có"
            })
        }

    }

    const handleIncrease = async () => {
        const { confirm } = Modal
        if (input && input.current && value < maxWarningCount) {
            confirm({
                title: `Bạn có muốn tăng số lần giao trễ của xe ${car.car_model.brand} ${car.car_model.model} ${car.car_model.year}?`,
                onOk: async () => {
                    try {
                        const response = await axiosAuth.put('/admin/warning_count', {
                            car_id: car.id,
                            new_warning_count: value + 1
                        })
                        console.log('response: ', response);

                        setValue((prev: any) => prev + 1)
                    } catch (error) {

                    }
                },
                cancelText: "Hủy",
                okText: "Có"
            })
        } else if (input && input.current && value >= maxWarningCount) {
            confirm({
                title: `${car.car_model.brand} ${car.car_model.model} ${car.car_model.year} sẽ bị dừng hoạt động, bạn có muốn tiếp tục?`,
                onOk: async () => {
                    try {
                        const response = await axiosAuth.put('/admin/warning_count', {
                            car_id: car.id,
                            new_warning_count: value + 1
                        })
                        setRefresh && setRefresh(prev => !prev)
                    } catch (error) {

                    }
                },
                cancelText: "Hủy",
                okText: "Có"
            })
        }

    }
    return (
        <div
            style={{
                display: "inline-flex",
                flexWrap: "nowrap",
                border: "1px solid rgb(200,200,200)",
                borderRadius: '3px'
            }}
        >
            <span
                onClick={handleDecrease}
                style={{
                    display: 'inline-block',
                    borderRight: '1px solid rgb(200,200,200)',
                    color: 'rgb(153,153,153)',
                    cursor: 'pointer',
                    width: '24px',
                    height: '24px',
                    textAlign: 'center'
                }}
            >-
            </span>
            <input
                ref={input}
                type='tel'
                disabled
                style={{
                    outline: 'none',
                    width: '32px',
                    background: 'transparent',
                    textAlign: 'center',
                    fontSize: '13px'
                }}
                value={value} />
            <span
                onClick={handleIncrease}
                style={{
                    display: 'inline-block',
                    borderLeft: '1px solid rgb(200,200,200)',
                    color: 'rgb(153,153,153)',
                    cursor: 'pointer',
                    width: '24px',
                    height: '24px',
                    textAlign: 'center'
                }}>+
            </span>
        </div>
    )
}
