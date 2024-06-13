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
            {/* <Button type="primary" onClick={showLoading}>
                {buttonContent}
            </Button> */}
            <Modal
                title={title}
                footer={
                    <Button type="primary" onClick={() => setOpen(false)}>
                        Đóng
                    </Button>
                }
                loading={loading}
                open={open}
                onCancel={() => setOpen(false)}
            >
                {children}
            </Modal>
        </>
    );
};
