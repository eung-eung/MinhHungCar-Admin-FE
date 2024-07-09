'use client'
import { IFeedback } from '@/app/models/Feedback.model'
import useAxiosAuth from '@/app/utils/hooks/useAxiosAuth'
import { TableProps } from 'antd'
import React, { useEffect, useState } from 'react'

export default function RatingTable() {
    const [feedbackList, setFeedbackList] = useState<IFeedback[]>()
    const axiosAuth = useAxiosAuth()

    const getFeedbackList = async () => {
        const response = await axiosAuth.get('/admin/feedbacks?offset=0&limit=10')
        console.log(response.data.data.feedbacks);
        setFeedbackList(response.data.data.feedbacks)
    }
    const columns: TableProps<IFeedback>['columns'] = [
        {
            title: 'Tên khách hàng',
            dataIndex: '',
            key: 'id',
            render: (model: any) => <>{model.brand}</>
        },

    ]

    useEffect(() => {
        getFeedbackList()
    }, [])
    return (
        <div>RatingTable</div>
    )
}
