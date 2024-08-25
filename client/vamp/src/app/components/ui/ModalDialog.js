import React from 'react';
import Modal from 'react-modal';

const ModalDialog = ({ isOpen, onRequestClose, onAnswer }) => {
  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">We Need Your Help!</h2>
      <p className="mb-4">Please answer the following question:</p>
      <p className="mb-4">Are you willing to donate blood this month?</p>
      <div className="flex space-x-4">
        <button className="bg-green-500 text-white py-2 px-4 rounded" onClick={() => onAnswer(true)}>
          Yes
        </button>
        <button className="bg-red-500 text-white py-2 px-4 rounded" onClick={() => onAnswer(false)}>
          No
        </button>
      </div>
    </Modal>
  );
};

export default ModalDialog;