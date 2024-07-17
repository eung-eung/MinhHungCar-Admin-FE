'use client'
import React, { useEffect, useState } from 'react'
import { Viewer, Worker } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import type { ToolbarProps, ToolbarSlot, TransformToolbarSlot } from '@react-pdf-viewer/toolbar';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import useAxiosAuth from '@/app/utils/hooks/useAxiosAuth';
import { Button, Modal, Result, Spin, Tag, UploadFile } from 'antd';
import { errorNotify, sucessNotify } from '@/app/utils/toast';
import { ICustomerContract } from '@/app/models/CustomerContract';
import ExpandRowCollateral from '../components/ExpandRowCollateral';
import ExpandRowRecievingCar from '../components/ExpandRowRecievingCar';
import { useTranslation } from 'react-i18next';
import { formatCurrency } from '@/app/utils/formatCurrency';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import PriceCheckOutlinedIcon from '@mui/icons-material/PriceCheckOutlined';
import { useRouter } from 'next/navigation';
export default function ContractPage({
    params: { customerIdSlug }
}: {
    params: { customerIdSlug: any }
}) {
    const [pdfUrl, setPdfUrl] = useState<any>()
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<any>(false)
    const [fileCarCondition, setFileCarCondition] = useState<UploadFile[]>([])
    const [customerContractDetail, setCustomerContractDetail] = useState<ICustomerContract>()
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [openContractPdf, setOpenContractPdf] = useState<boolean>(false)
    const transform: TransformToolbarSlot = (slot: ToolbarSlot) => ({
        ...slot,
        Open: () => <></>,
        DownloadMenuItem: () => <></>,
        EnterFullScreen: () => <></>,
        EnterFullScreenMenuItem: () => <></>,
        SwitchTheme: () => <></>,
        SwitchThemeMenuItem: () => <></>,
        GoToNextPage: () => <></>,
        NumberOfPages: () => <></>,
        CurrentPageInput: () => <></>
    });
    const axiosAuth = useAxiosAuth()
    const [refresh, setRefresh] = useState<boolean>(true)
    const { t } = useTranslation()
    const router = useRouter()
    const renderToolbar = (Toolbar: (props: ToolbarProps) => React.ReactElement) => (
        <Toolbar>{renderDefaultToolbar(transform)}</Toolbar>
    );
    const defaultLayoutPluginInstance = defaultLayoutPlugin({
        renderToolbar,
    });
    const { renderDefaultToolbar } = defaultLayoutPluginInstance.toolbarPluginInstance;

    const getContractByCarId = async (id: any) => {
        setLoading(true)
        try {
            const response = await axiosAuth.get('/admin/contract/' + id)
            setPdfUrl(response.data.data.url)
            setLoading(false)
            setCustomerContractDetail(response.data.data)
        } catch (error: any) {
            setError(error.response.status)

        }

    }

    const approveCustomerContract = async (id: any) => {
        const { confirm } = Modal
        const contractResponse = await axiosAuth.get("/admin/contract/" + id)
        const contractDetail: ICustomerContract = contractResponse.data.data

        if (contractDetail.collateral_type === "cash"
            && contractDetail.receiving_car_images.length < 1
        ) {
            errorNotify("Vui lòng thêm ảnh trước khi bàn giao")
            return
        }
        if (contractDetail.collateral_type === "motorbike"
            &&
            (
                contractDetail.receiving_car_images.length < 1
                || contractDetail.collateral_asset_images.length < 1
            )) {
            errorNotify("Vui lòng thêm ảnh trước khi bàn giao")
            return
        }
        confirm({
            title: 'Bạn có muốn đưa vào đang thuê?',
            onOk: async () => {
                const response = await axiosAuth.put('/admin/contract', {
                    customer_contract_id: id,
                    action: "approve"
                })

                if (response.status === 200) {
                    setRefresh(prev => !prev)
                    sucessNotify('Cập nhật hợp đồng thành công')
                }
            },
            onCancel: () => {

            }
        })

    }

    const rejectCustomerContract = (id: any) => {
        const { confirm } = Modal
        confirm({
            title: "Bạn có muốn từ chối hợp đồng này?",
            cancelText: "Hủy",
            onOk: async () => {
                try {
                    const response = await axiosAuth.put("/admin/contract", {
                        customer_contract_id: id,
                        action: "reject"
                    })
                    if (response.status === 200) {
                        sucessNotify("Đã từ chối hợp đồng thành công")
                        setRefresh(prev => !prev)
                    }
                } catch (error) {
                    errorNotify("Đã có lỗi, vui lòng thử lại")
                }


            }
        })
    }
    const getContractDetailById = async (id: any) => {
        setLoading(true)
        try {
            const response = await axiosAuth.get(
                '/admin/contract/' + id
            )
            setPdfUrl(response.data.data.url)
            setCustomerContractDetail(response.data.data)
            setCustomerContractDetail(response.data.data)
            console.log(response.data.data);

            setFileList(
                response.data
                    .data.collateral_asset_images.map((img: any) =>
                    ({
                        url: img.url,
                        status: 'done',
                        uid: img.id,
                        isUpload: true
                    })))

            setFileCarCondition(
                response.data
                    .data.receiving_car_images.map((img: any) =>
                    ({
                        url: img.url,
                        status: 'done',
                        uid: img.id,
                        isUpload: true
                    })))
            setLoading(false)
        } catch (error) {
            console.log(error);
            setLoading(false)
            setError(true)
        }

    }
    useEffect(() => {
        getContractDetailById(customerIdSlug)
    }, [customerIdSlug, refresh])
    return (
        <>
            {
                loading &&
                <Spin size='large' style={{ position: 'absolute', left: '50%', top: '50%', transform: "translate(-50%,-50%)" }} />
            }
            {
                !loading &&
                <>
                    {
                        !error && <>
                            <div className='flex justify-between'>
                                <div>
                                    <p className='text-lg font-semibold mt-4 mb-4'>Thông tin hợp đồng của khách hàng
                                        <span className='italic'>{
                                            ' '
                                            + customerContractDetail?.customer.first_name
                                            + ' '
                                            + customerContractDetail?.customer.last_name
                                        }
                                        </span>
                                        {
                                            customerContractDetail?.status === 'ordered' &&
                                            <Tag color='blue' style={{ fontSize: 20, padding: 5, marginLeft: 10 }}>
                                                {t(`common:${customerContractDetail?.status}`)}
                                            </Tag>
                                        }
                                        {
                                            customerContractDetail?.status === 'renting' &&
                                            <Tag color='orange' style={{ fontSize: 20, padding: 5, marginLeft: 10 }}>
                                                {t(`common:${customerContractDetail?.status}`)}
                                            </Tag>
                                        }
                                        {
                                            customerContractDetail?.status === 'completed' &&
                                            <Tag color='green' style={{ fontSize: 20, padding: 5, marginLeft: 10 }}>
                                                {t(`common:${customerContractDetail?.status}`)}
                                            </Tag>
                                        }
                                        {
                                            customerContractDetail?.status === 'canceled' &&
                                            <Tag color='red' style={{ fontSize: 20, padding: 5, marginLeft: 10 }}>
                                                {t(`common:${customerContractDetail?.status}`)}
                                            </Tag>
                                        }
                                    </p>
                                    <p className='font-medium mt-4'>Loại xe:   {
                                        ' '
                                        + customerContractDetail?.car.car_model.brand
                                        + ' '
                                        + customerContractDetail?.car.car_model.model
                                        + ' '
                                        + customerContractDetail?.car.car_model.year
                                    }</p>
                                    <p className='font-medium mt-3'>Loại thế chấp:   {
                                        ' '
                                        + t(`common:${customerContractDetail?.collateral_type}`)
                                    }</p>
                                    {
                                        customerContractDetail?.collateral_type === 'cash' &&
                                        <p className='font-medium mt-3'>Số tiền đã thế chấp:   {
                                            ' '
                                            + formatCurrency(customerContractDetail.collateral_cash_amount)
                                        }</p>
                                    }
                                </div>
                                <div>
                                    {customerContractDetail?.status === 'ordered' &&
                                        <div>
                                            <button
                                                style={{
                                                    color: '#fff',
                                                    padding: '7px 20px',
                                                    outline: 'none',
                                                    border: 'none',
                                                    cursor: 'pointer',
                                                    background: 'red',
                                                    marginRight: '20px'
                                                }}
                                                onClick={() => rejectCustomerContract(parseInt(customerIdSlug))}
                                                className="inline-flex 
                                                animate-shimmer 
                                                items-center 
                                                justify-center 
                                                rounded-md border 
                                                bg-[length:200%_100%] 
                                                font-medium 
                                                text-slate-400 
                                                transition-colors 
                                                focus:outline-none 
                                                focus:ring-offset-2 focus:ring-offset-slate-50 mt-4"
                                            >
                                                Từ chối hợp đồng
                                                <CloseRoundedIcon sx={{ color: '#fff', fontSize: 16, marginLeft: 2 }} />
                                            </button>

                                            <button
                                                style={{
                                                    color: '#fff',
                                                    padding: '7px 20px',
                                                    outline: 'none',
                                                    border: 'none',
                                                    cursor: 'pointer',
                                                }}
                                                onClick={() => approveCustomerContract(parseInt(customerIdSlug))}
                                                className="inline-flex 
                                                animate-shimmer 
                                                items-center 
                                                justify-center 
                                                rounded-md border 
                                                border-slate-800 bg-[linear-gradient(110deg,#33bf4e,45%,#60ff7e,55%,#33bf4e)]
                                                bg-[length:200%_100%] 
                                                font-medium 
                                                text-slate-400 
                                                transition-colors 
                                                focus:outline-none 
                                                focus:ring-offset-2 focus:ring-offset-slate-50 mt-4"
                                            >
                                                Duyệt hợp đồng
                                                <CheckOutlinedIcon sx={{ color: '#fff', fontSize: 16, marginLeft: 2 }} />
                                            </button>
                                        </div>
                                    }
                                    <button
                                        style={{
                                            color: '#fff',
                                            padding: '7px 20px',
                                            outline: 'none',
                                            border: 'none',
                                            cursor: 'pointer',
                                            background: 'orange',
                                            marginRight: '20px'
                                        }}
                                        onClick={() => router.push('/contracts/payments/' + customerIdSlug)}
                                        className="inline-flex 
                                                animate-shimmer 
                                                items-center 
                                                justify-center 
                                                rounded-md border 
                                                bg-[length:200%_100%] 
                                                font-medium 
                                                text-slate-400 
                                                transition-colors 
                                                focus:outline-none 
                                                focus:ring-offset-2 focus:ring-offset-slate-50 mt-4"
                                    >
                                        Quản lý các khoản thanh toán của chuyến đi
                                        <PriceCheckOutlinedIcon sx={{ color: '#fff', fontSize: 20, marginLeft: 2 }} />
                                    </button>
                                </div>
                            </div>
                            {
                                customerContractDetail?.collateral_type !== 'cash'
                                &&
                                <div className='mt-4'> <ExpandRowCollateral
                                    getDataForExpand={getContractDetailById}
                                    id={customerIdSlug}
                                    expandLoading={loading}
                                    fileList={fileList}
                                    status={customerContractDetail?.status}
                                    setFileList={setFileList}
                                /></div>
                            }
                            {
                                <div className='mt-4 mb-7'>    <ExpandRowRecievingCar
                                    id={customerIdSlug}
                                    fileList={fileCarCondition}
                                    status={customerContractDetail?.status}
                                    expandLoading={loading}
                                    setFileCarCondition={setFileCarCondition}
                                    getDataForExpand={getContractDetailById}
                                />
                                </div>
                            }
                            <Button
                                className='mb-5'
                                onClick={() => setOpenContractPdf(prev => !prev)}>
                                {!openContractPdf ? 'Xem hợp đồng' : 'Đóng'}
                            </Button>
                        </>
                    }


                    {error &&
                        <Result
                            status='error'
                            title={error}
                            subTitle="Xin lỗi, không tìm thấy hợp đồng nào"
                        />}

                    {!error && openContractPdf &&
                        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                            <Viewer
                                fileUrl={pdfUrl}
                                plugins={[defaultLayoutPluginInstance]}
                            />
                        </Worker>
                    }
                </>
            }
        </>
    )
}
