'use client'
import React, { ReactElement, useEffect, useState } from 'react'
import { Viewer, Worker } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import type { ToolbarProps, ToolbarSlot, TransformToolbarSlot } from '@react-pdf-viewer/toolbar';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import useAxiosAuth from '@/app/utils/hooks/useAxiosAuth';

export default function ContractPage({
    params: { carIdSlug }
}: {
    params: { carIdSlug: any }
}) {
    const [pdfUrl, setPdfUrl] = useState<any>()
    const [loading, setLoading] = useState<boolean>(true)
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
        const response = await axiosAuth.get('/admin/partner_contract?car_id=' + id)
        console.log('aa');
        console.log(response.data.url);
        setPdfUrl(response.data.url)
        setLoading(false)
    }

    useEffect(() => {
        getContractByCarId(carIdSlug)
    }, [carIdSlug])
    return (
        <>
            {!loading &&
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
