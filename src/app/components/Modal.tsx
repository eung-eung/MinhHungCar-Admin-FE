import React from 'react';
import { Button, Modal } from 'antd';

export default function Diaglog({ children, title, loading, showLoading, open, setOpen }
    : {
        children: React.ReactNode,
        title: any,
        loading: any,
        showLoading: any,
        open: any,
        setOpen: any
    }) {
    return (
        <>
            <Modal
                width='50%'
                title={title}
                footer={null}
                loading={loading}
                open={open}
                onCancel={() => setOpen(false)}
            >
                {children}
            </Modal>
        </>
    );
};
