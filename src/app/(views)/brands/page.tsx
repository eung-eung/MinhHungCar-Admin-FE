'use client'
import { ICarModel } from '@/app/models/CarModel.model'
import useAxiosAuth from '@/app/utils/hooks/useAxiosAuth'
import React, { useEffect, useState } from 'react'
import BrandsTable from './components/BrandsTable'
import { Button } from 'antd'
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import Dialog from '@/app/components/Modal'
import CreateBrandDialog from './components/CreateBrandDialog'
export default function Brands() {
    const [data, setData] = useState<ICarModel[]>()
    const [currentPage, setCurrentPage] = useState<any>(1)
    const BASE_OFFSET = 0;
    const [totalPage, setTotalPage] = useState<any>()
    const [refresh, setRefresh] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [pageLimit, setPageLimit] = useState<any>(10)
    const axiosAuth = useAxiosAuth()
    const [loadingDialog, setLoadingDialog] = useState<boolean>(true)
    const [open, setOpen] = useState<boolean>(false)
    const handleOpen = () => {
        setOpen(true)
        setLoadingDialog(false)
    }
    const getData = async () => {
        try {
            setIsLoading(true)
            const response = await axiosAuth.get(`/admin/car_models?offset=${BASE_OFFSET + (currentPage - 1) * pageLimit}&limit=${pageLimit}`)
            setData(response.data.data.models)
            setTotalPage(response.data.data.total)
            setIsLoading(false)
        } catch (error) {
            console.log(error);

        }

    }
    useEffect(() => {
        getData()
    }, [pageLimit, currentPage, refresh])
    return (
        <div>
            <Dialog
                width='45%'
                loading={loadingDialog}
                setOpen={setOpen}
                title="Tên xe mới"
                open={open}
                isIntercept={false}
            >
                <CreateBrandDialog
                    setCurrentPage={setCurrentPage}
                    setOpen={setOpen}
                    setRefresh={setRefresh}
                />
            </Dialog>
            <Button className='mb-4 mt-4' onClick={handleOpen}>
                <AddCircleOutlineRoundedIcon />
                Thêm
            </Button>
            <BrandsTable
                setCurrentPage={setCurrentPage}
                setPageLimit={setPageLimit}
                total={totalPage}
                data={data}
                isLoading={isLoading}
            />
        </div>
    )
}
