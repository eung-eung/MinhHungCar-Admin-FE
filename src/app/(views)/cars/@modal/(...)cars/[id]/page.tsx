'use client'

import React, { Fragment, useEffect, useState } from 'react'

import Dialog from '@/app/components/Modal'
import useAxiosAuth from '@/app/utils/hooks/useAxiosAuth'
import { ICar } from '@/app/models/Car.model'
import { Transition } from '@headlessui/react'
import { useRouter } from 'next/navigation'
import Modal from '../../../components/Modal'
import CarDialog from '../../../components/CarDialog'
import { IContractRule } from '@/app/models/ContractRule'


export default function InterceptingCarDetail({
    params: { id }
}: {
    params: { id: any }
}) {
    const axiosAuth = useAxiosAuth()
    const [loadingDialog, setLoadingDialog] = useState<boolean>(true);
    const [carDetail, setCarDetail] = useState<ICar>()
    const [open, setOpen] = useState<boolean>(false);
    const [refresh, setRefresh] = useState<boolean>(false)
    const [contractRules, setContractRules] = useState<IContractRule>()
    const handleOpenDetailDialog = async (id: any) => {
        // setOpen(true);
        setLoadingDialog(true);
        const carDetail = await axiosAuth.get(`/car/${id}`)
        const contractRules = await axiosAuth.get('/admin/contract_rule')
        const detail: ICar = carDetail.data.data
        setContractRules(contractRules.data.data)
        setCarDetail(detail)
        setLoadingDialog(false)
    };
    useEffect(() => {
        handleOpenDetailDialog(id)
    }, [id, refresh])
    return (
        <>
            <Dialog
                width='50%'
                loading={loadingDialog}
                open={true}
                setOpen={setOpen}
                title='Thông tin xe'
                isIntercept={true}
            >
                <CarDialog
                    contractRules={contractRules}
                    setRefresh={setRefresh}
                    detail={carDetail}
                />
            </Dialog>
        </>
    )
}
