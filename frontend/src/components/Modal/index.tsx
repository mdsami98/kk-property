import React, { useState } from 'react';
import { Button, Modal } from 'antd';
interface CustomModalProps {
    title: string;
    children: React.ReactNode;
    open: boolean;
    setOpen: (isOpen: boolean) => void;
}
const CustomModal: React.FC<CustomModalProps> = ({
    title,
    children,
    open,
    setOpen
}) => {
    const handleCancel = () => {
        setOpen(false);
    };

    return (
        <>
            <Modal
                title={title}
                open={open}
                // onOk={handleCancel}
                onCancel={handleCancel}
                cancelButtonProps={{ style: { display: 'none' } }}
                okButtonProps={{ style: { display: 'none' } }}
            >
                {children}
            </Modal>
        </>
    );
};

export default CustomModal;
