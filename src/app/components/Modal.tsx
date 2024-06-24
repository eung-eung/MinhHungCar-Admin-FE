import React from 'react';
import { Button, Modal } from 'antd';

export default function Diaglog({ children, title, loading, open, setOpen, width }
    : {
        children: React.ReactNode,
        title: any,
        loading: any,
        open: any,
        setOpen: any,
        width: any
    }) {
    return (
        <>
            <Modal
                width={width}
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
