// src/components/Modal.js
import React from 'react';

const Modal = ({ hall, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-lg p-6 max-w-lg w-full">
        <h3 className="text-xl font-semibold">{hall.name}</h3>
        <p className="mt-4 text-gray-700">{hall.description}</p>
        <div className="mt-4 flex justify-end">
          <button 
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={onClose}
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;