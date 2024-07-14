'use client'
import { ICar } from '@/app/models/Car.model';
import useAxiosAuth from '@/app/utils/hooks/useAxiosAuth';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import CarouselImages from '../components/Carousel';
import classes from './index.module.css'
import CarInformation from '../components/CarInformation';
export default function CarDetail({
    params: { id }
}: {
    params: { id: any, }
}) {
    const router = useRouter()
    const axiosAuth = useAxiosAuth()
    const [notFound, setNotFound] = useState<boolean>(true)
    const [detail, setDetail] = useState<ICar>()
    const [refresh, setRefresh] = useState<boolean>(false)
    const getCarDetail = async () => {
        try {
            const response = await axiosAuth.get('/car/' + id[0])
            console.log(response.data.data);
            setNotFound(false)
            setDetail(response.data.data)
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
    }, [id, refresh])
    return (
        <div>
            {notFound && <div>404</div>}
            {
                !notFound && <div className={classes.detail}>
                    <div className={classes.leftDetail}>
                        <CarouselImages images={detail?.images} />
                    </div>
                    <div className={classes.rightDetail}>
                        <CarInformation
                            showAction={true}
                            detail={detail} setRefresh={setRefresh} />
                    </div>
                </div>
            }
        </div>
    )
}
