'use client'
import React, { useEffect, useState } from 'react'
import { Viewer, Worker } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import type { ToolbarProps, ToolbarSlot, TransformToolbarSlot } from '@react-pdf-viewer/toolbar';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import useAxiosAuth from '@/app/utils/hooks/useAxiosAuth';
import { Result } from 'antd';



export default function ContractPage({
    params: { customerIdSlug }
}: {
    params: { customerIdSlug: any }
}) {
    const [pdfUrl, setPdfUrl] = useState<any>()
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<any>(false)
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
            setPdfUrl(response.data.url)
            setLoading(false)
        } catch (error: any) {
            setError(error.response.status)

        }

    }

    useEffect(() => {
        getContractByCarId(customerIdSlug)
    }, [customerIdSlug])
    return (
        <>
            {error &&
                <Result
                    status='error'
                    title={error}
                    subTitle="Xin lỗi, không tìm thấy hợp đồng nào"
                />}
            {!loading && !error &&
                <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                    <Viewer
                        fileUrl={pdfUrl}
                        plugins={[defaultLayoutPluginInstance]}
                    />
                </Worker>
            }
        </>
    )
}
