import React from 'react';
import { Modal } from 'antd';

interface CustomModalProps {
  title: string;
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const CustomModal: React.FC<CustomModalProps> = ({ title, open, onClose, children }) => {
  return (
    <Modal
      title={title}
      open={open}
      onCancel={onClose}
      footer={null}
      closable
    >
      {children}
    </Modal>
  );
};

export default CustomModal;
