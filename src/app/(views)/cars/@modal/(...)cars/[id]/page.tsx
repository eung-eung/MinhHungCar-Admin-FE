'use client'

import React, { Fragment, useEffect, useState } from 'react'

import Dialog from '@/app/components/Modal'
import useAxiosAuth from '@/app/utils/hooks/useAxiosAuth'
import { ICar } from '@/app/models/Car.model'
import { Transition } from '@headlessui/react'
import { useRouter } from 'next/navigation'
import Modal from '../../../components/Modal'


export default function InterceptingCarDetail({
    params: { id }
}: {
    params: { id: any }
}) {
    const axiosAuth = useAxiosAuth()
    const [loadingDialog, setLoadingDialog] = useState<boolean>(true);
    const [carDetail, setCarDetail] = useState<ICar>()
    const [open, setOpen] = useState<boolean>(false);

    const handleOpenDetailDialog = async (id: any) => {
        // setOpen(true);
        setLoadingDialog(true);
        const carDetail = await axiosAuth.get(`/car/${id}`)
        const detail: ICar = carDetail.data.data
        setCarDetail(detail)
        setLoadingDialog(false)

    };
    const router = useRouter()
    const handleClose = () => router.back()

    useEffect(() => {
        console.log('zosss');
        handleOpenDetailDialog(id)
    }, [id])
    return (
        <>
            <Modal>
                <p>é</p>
            </Modal>
        </>
    )
}
