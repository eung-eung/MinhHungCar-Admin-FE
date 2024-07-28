'use client'
import { IAccount } from '@/app/models/Account.model'
import { ICar } from '@/app/models/Car.model'
import { IFeedback } from '@/app/models/Feedback.model'
import useAxiosAuth from '@/app/utils/hooks/useAxiosAuth'
import { Button, Modal, Table, TableProps, Tag } from 'antd'
import React, { useEffect, useState } from 'react'
import Star from './Star'
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import { errorNotify, sucessNotify } from '@/app/utils/toast'
import Dialog from '@/app/components/Modal'
import CarDialog from '../../cars/components/CarDialog'

export default function RatingTable() {
    const [feedbackList, setFeedbackList] = useState<IFeedback[]>()
    const axiosAuth = useAxiosAuth()
    const [refresh, setRefresh] = useState<boolean>(true)
    const [open, setOpen] = useState<boolean>(false)
    const [loadingDialog, setLoadingDialog] = useState<boolean>(true)
    const [carDetail, setCarDetail] = useState<ICar>()
    const handleUpdateFeedbackStatus = async (id: any, status: any) => {
        const { confirm } = Modal
        confirm({
            title: status === 'active' ? "Bạn có muốn gỡ khóa đánh giá này" : "Bạn có muốn khóa đánh giá này",
            cancelText: "Hủy",
            onOk: async () => {
                try {
                    const response = await axiosAuth.put('/admin/feedback', {
                        customer_contract_id: id,
                        new_status: status
                    })

                    if (response.status === 200) {
                        if (status === 'active') {
                            sucessNotify("Đã mở khóa")
                        }
                        if (status === 'inactive') {
                            sucessNotify("Đã khóa")
                        }
                        setRefresh(prev => !prev)
                    }

                } catch (error) {
                    errorNotify('Có lỗi xảy ra')
                }
            }
        })


    }
    const openCarDetail = async (id: any) => {
        setOpen(true)
        setLoadingDialog(true)
        try {
            const response = await axiosAuth.get("/car/" + id)
            setCarDetail(response.data.data)
            setLoadingDialog(false)
        } catch (error) {
            setLoadingDialog(false)
        }

    }
    const getFeedbackList = async () => {
        try {
            const response = await axiosAuth.get('/admin/feedbacks?offset=0&limit=10')
            const feedbacks: IFeedback[] = response.data.data.feedbacks
            const licensePlates = await Promise.all(feedbacks.map(async (fb: IFeedback) => {
                const response = await axiosAuth.get('/car/' + fb.car_id)
                return {
                    ...fb,
                    car: {
                        ...response.data.data
                    }
                }
            }))

            setFeedbackList(licensePlates)
        } catch (error) {
            console.log('error: ', error);

        }

    }
    const columns: TableProps<IFeedback>['columns'] = [
        {
            title: 'Tên khách hàng',
            dataIndex: 'customer',
            key: 'id',
            render: (customer: IAccount) => <>{customer.last_name + ' ' + customer.first_name}</>
        },
        {
            title: 'Biển số xe',
            dataIndex: 'car',
            key: 'id',
            render: (car: ICar) => <p onClick={() => { openCarDetail(car.id) }} style={{ color: 'blue', cursor: 'pointer' }}>{car.license_plate}</p>
        },
        {
            title: 'Điểm đánh giá',
            dataIndex: 'feedback_rating',
            key: 'id',
            render: (ratings: number) => <Star rating={ratings} />
        },
        {
            title: 'Ngày đánh giá',
            dataIndex: 'created_at',
            key: 'id',
            render: (createDay) => <p>{createDay}</p>
        },
        {
            title: 'Nội dung',
            dataIndex: 'feedback_content',
            key: 'id',
            render: (content) => <p>{content}</p>
        },
        {
            title: 'Trạng thái',
            dataIndex: 'feedback_status',
            key: 'id',
            render: (status) => <> {
                status === 'active'
                    ? <CheckCircleRoundedIcon
                        sx={{ color: "#04cf0c" }} />
                    : <CancelRoundedIcon
                        sx={{ color: "red" }} />}</>
        },
        {
            title: '',
            dataIndex: 'id',
            key: 'id',
            render: (_, record) => <>{record.feedback_status === 'active'
                ? <button className="btn btn-outline btn-error" onClick={() => handleUpdateFeedbackStatus(record.id, 'inactive')}>Khóa</button>
                : <button className="btn btn-outline btn-warning" onClick={() => handleUpdateFeedbackStatus(record.id, 'active')}>Gỡ khóa</button>}</>
        },
    ]

    useEffect(() => {
        getFeedbackList()
    }, [refresh])
    return (
        <>
            <Table
                columns={columns}
                dataSource={feedbackList}
            />
            <Dialog
                width='50%'
                loading={loadingDialog}
                open={open}
                setOpen={setOpen}
                title='Thông tin xe'
                isIntercept={false}
            >
                <CarDialog
                    detail={carDetail}
                />
            </Dialog>
        </>
    )
}
