// src/components/Modal.jsx
import React from 'react';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
      <div className="bg-white rounded-lg shadow-lg z-10 p-4">
        <button className="absolute top-0 right-0 m-2" onClick={onClose}>X</button>
        {children}
      </div>
    </div>
  );
};

export default Modal;