'use client'
import useAxiosAuth from '@/app/utils/hooks/useAxiosAuth';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

export default function CarDetail({
    params: { id }
}: {
    params: { id: any, }
}) {
    const router = useRouter()
    const axiosAuth = useAxiosAuth()
    const [notFound, setNotFound] = useState<boolean>(true)
    console.log(id);
    const getCarDetail = async () => {
        try {
            const response = await axiosAuth.get('/car/' + id[0])
            console.log(response.data.data);
            setNotFound(false)
        } catch (error) {
            console.log('error:', error);
            setNotFound(true)
        }

    }

    useEffect(() => {
        if ((id.length === 1) || (id.length < 3 && id[1] === 'nooverlay')) {
            getCarDetail()
        } else {
            setNotFound(true)
        }
    }, [id])
    return (
        <div>
            {notFound && <div>404</div>}
            {!notFound && <div>Thông tin xe</div>}
        </div>
    )
}
