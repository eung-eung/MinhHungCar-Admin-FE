'use client'
import React from 'react';
import { Button, Modal } from 'antd';
import { useRouter } from 'next/navigation';

export default function Dialog({ children, title, loading, open, setOpen, width }
    : {
        children: React.ReactNode,
        title: any,
        loading: any,
        open: any,
        setOpen: any,
        width: any
    }) {
    const router = useRouter()
    const handleClose = () => router.back()
    return (
        <>
            <Modal
                width={width}
                title={title}
                footer={null}
                loading={loading}
                open={open}
                onCancel={handleClose}
            >
                {children}
            </Modal>
        </>
    );
};
