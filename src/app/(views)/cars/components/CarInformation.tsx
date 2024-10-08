'use client'
import { ICar } from '@/app/models/Car.model'
import React, { SetStateAction } from 'react'
import { useTranslation } from 'react-i18next'
import classes from './CarDialog.module.css'
import { Button, InputNumber, Modal, Tag } from 'antd'
import { formatCurrency } from '@/app/utils/formatCurrency'
import useAxiosAuth from '@/app/utils/hooks/useAxiosAuth'
import { errorNotify } from '@/app/utils/toast'
import { IPartnerContractRule } from '@/app/models/ContractRule'
import CountQuantityInput from './CountQuantityInput'
import CarouselImages from './Carousel'
type IApproveRequest = {
    car_id: any,
    action: string
}
export default function CarInformation(
    {
        detail,
        setRefresh,
        showAction,
        contractRules
    }: {
        detail?: ICar,
        setRefresh?: React.Dispatch<SetStateAction<boolean>>
        showAction: boolean,
        contractRules?: IPartnerContractRule
    }) {
    const { t } = useTranslation()
    const axiosAuth = useAxiosAuth()
    const showContract = (id: any) => {
        window.open(`/cars/contract/${id}`, '_blank')
    }
    const showConfirmModal = (title: any) => {
        const { confirm } = Modal
        return new Promise((res, rej) => {
            confirm({
                title: title,
                onOk: () => {
                    res(true)
                },
                cancelText: "Hủy",
                onCancel: () => {
                    rej(true)
                }
            })
        })
    }
    const handleBringCarToActive = async (id: any) => {
        showConfirmModal("Bạn có muốn đưa xe vào hoạt động?")
            .then(async () => {
                try {
                    const response = await axiosAuth.put('/admin/car_application', {
                        car_id: id,
                        action: "approve_delivery"
                    } as IApproveRequest)
                    if (setRefresh) {
                        setRefresh(prev => !prev)
                    }
                } catch (error) {
                    console.log(error);
                }
            })
    }
    const handleApproveCar = async (id: any) => {
        showConfirmModal("Bạn có muốn duyệt xe này?")
            .then(async () => {
                try {
                    const response = await axiosAuth.put('/admin/car_application', {
                        car_id: id,
                        action: "approve_register"
                    } as IApproveRequest)
                    if (setRefresh) {
                        setRefresh(prev => !prev)
                    }
                } catch (error: any) {
                    console.log(error.response.data);
                    if (error.response.data.error_code === 10031) {
                        errorNotify('Garage hiện tại không đủ chỗ cho xe này')
                    }
                    // if (error.response.data.error === "not enough slot at garage") {
                    //     errorNotify('Không đủ chỗ trong garage')
                    // } else {

                    // }
                }

            })
    }

    const cancelCarContract = async (id: any) => {
        const { confirm } = Modal
        confirm({
            title: "Bạn có muốn hủy hợp đồng xe này?",
            cancelText: "Hủy",
            onOk: async () => {
                try {
                    const response = await axiosAuth.put("/admin/car/inactive", {
                        car_id: id
                    })
                    if (setRefresh) {
                        setRefresh(prev => !prev)
                    }
                } catch (error) {
                    console.log(error);
                    errorNotify("Xe đang được khách hàng thuê, vui lòng hủy sau khi khách hàng trả xe")
                }
            }
        })
    }

    const handleRejectCar = async (id: any) => {
        showConfirmModal("Bạn có muốn từ chối xe này?")
            .then(async () => {
                try {
                    const response = await axiosAuth.put('/admin/car_application', {
                        car_id: id,
                        action: "reject"
                    } as IApproveRequest)
                    if (response.status === 200) {
                        if (setRefresh) {
                            setRefresh(prev => !prev)
                        }
                    }
                } catch (error) {
                    console.log(error);

                }

            })

    }

    return (
        <>
            <p className='font-semibold	text-xl mb-8'>
                {detail?.car_model.brand
                    + ' '
                    + detail?.car_model.model
                    + ' '
                    + detail?.car_model.year
                }
            </p>
            {
                showAction &&
                detail?.status === 'pending_approval' &&
                <div className='flex justify-end'>
                    <Button
                        style={{
                            background: "red", marginRight: 10
                        }}
                        type='primary'
                        onClick={() => handleRejectCar(detail?.id)}>
                        Từ chối
                    </Button>
                    <Button
                        style={{
                            background: "#3ab73a",
                            marginLeft: 10
                        }}
                        type='primary'
                        onClick={() => handleApproveCar(detail?.id)}>
                        Duyệt
                    </Button>
                </div>
            }
            <div className='flex justify-end'>
                {
                    detail?.status === 'active' && <Button
                        style={{
                            background: "red",
                            borderColor: 'red',
                            color: "#fff"
                        }}
                        className='mr-4'
                        onClick={() => cancelCarContract(detail?.id)}
                    >Hủy hợp đồng</Button>
                }
                {(detail?.status === "active" || detail?.status === "waiting_car_delivery") &&
                    <Button
                        type='primary'
                        onClick={() => showContract(detail?.id)}>
                        Xem hợp đồng
                    </Button>
                }
            </div>
            {detail?.status === "active" && <div className='flex justify-between mt-4'>
                <p className={classes.label}>
                    Số lần giao xe trễ</p>
                <div> <CountQuantityInput
                    car={detail}
                    warningCount={detail.warning_count}
                    setRefresh={setRefresh}
                    maxWarningCount={detail.partner_contract_rule.max_warning_count}
                />
                    <span> / {detail.partner_contract_rule.max_warning_count}</span>
                </div>
            </div>
            }
            {/* item */}
            <div className={classes.inforItem}>
                <p className={classes.label}>
                    Biển số xe
                </p>
                <p className={classes.infor}>
                    {detail?.license_plate}
                </p>
            </div>

            {/* item */}
            <div className={classes.inforItem}>
                <p className={classes.label}>
                    Nơi đậu xe
                </p>
                <p className={classes.infor}>
                    {t(`common:${detail?.parking_lot}`)}
                </p>
            </div>
            {/* item */}
            <div className={classes.inforItem}>
                <p className={classes.label}>
                    Giá cho thuê
                </p>
                <p className={classes.infor}>
                    {formatCurrency(detail?.price)}
                </p>
            </div>
            {/* item */}
            <div className={classes.inforItem}>
                <p className={classes.label}>
                    Thời hạn thuê
                </p>
                <p className={classes.infor}>
                    {detail?.period} tháng
                </p>
            </div>
            {/* item */}
            <div className={classes.inforItem}>
                <p className={classes.label}>
                    Trạng thái xe
                </p>
                <p className={classes.infor}>
                    {
                        t('carStatus:temporary_inactive') === detail?.status &&
                        <Tag
                            style={{
                                margin: 0,
                                fontSize: 14,
                                padding: 3
                            }}
                            color='#5B4C40'>
                            {t(`common:${detail?.status}`)}
                        </Tag>
                    }
                    {
                        t('carStatus:active') === detail?.status &&
                        <Tag
                            style={{
                                margin: 0,
                                fontSize: 14,
                                padding: 3
                            }}
                            color='green'>
                            {t(`common:${detail?.status}`)}
                        </Tag>
                    }
                    {
                        t('carStatus:pending') === detail?.status &&
                        <Tag
                            style={{
                                margin: 0,
                                fontSize: 14,
                                padding: 3
                            }}
                            color='red'>
                            {t(`common:${detail?.status}`)}
                        </Tag>
                    }
                    {
                        t('carStatus:approved') === detail?.status &&
                        <Tag
                            style={{
                                margin: 0,
                                fontSize: 14,
                                padding: 3
                            }}
                            color='cyan'>
                            {t(`common:${detail?.status}`)}
                        </Tag>
                    }
                    {
                        t('carStatus:waiting') === detail?.status &&
                        <Tag
                            style={{
                                margin: 0,
                                fontSize: 14,
                                padding: 3
                            }}
                            color='magenta'>
                            {t(`common:${detail?.status}`)}
                        </Tag>
                    }
                    {
                        t('carStatus:inactive') === detail?.status &&
                        <Tag
                            style={{
                                margin: 0,
                                fontSize: 14,
                                padding: 3
                            }}
                            color='error'>
                            {t(`common:${detail?.status}`)}
                        </Tag>
                    }
                    {
                        t('carStatus:rejected') === detail?.status &&
                        <Tag
                            style={{
                                margin: 0,
                                fontSize: 14,
                                padding: 3
                            }}
                            color='error'>
                            {t(`common:${detail?.status}`)}
                        </Tag>
                    }
                </p>
            </div>
            {/* item */}
            <div className={classes.inforItem}>
                <p className={classes.label}>
                    Số ghế
                </p>
                <p className={classes.infor}>
                    {detail?.car_model.number_of_seats}
                </p>
            </div>
            {/* item */}
            <div className={classes.inforItem}>
                <p className={classes.label}>
                    Truyền động
                </p>
                <p className={classes.infor}>
                    {t(`common:${detail?.motion}`)}
                </p>
            </div>
            {/* item */}
            <div className={classes.inforItem}>
                <p className={classes.label}>
                    Nhiên liệu
                </p>
                <p className={classes.infor}>
                    {t(`common:${detail?.fuel}`)}
                </p>
            </div>
            {/* item */}
            <div className={classes.inforItem} style={{ alignItems: 'flex-start' }}>
                <p className={classes.label}>
                    Mô tả
                </p>
                <p className={classes.infor} style={{ height: '100px', overflow: 'auto' }}>
                    {detail?.description}
                </p>
            </div>


        </>
    )
}
