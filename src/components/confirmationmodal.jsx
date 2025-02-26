import React from 'react';
import { FaTimes } from 'react-icons/fa';
import { PopupBG, PopupContainer } from '../css/GeneralInterface';

const ConfirmationModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className={PopupBG}>
        <div className={`${PopupContainer}  p-6 max-w-sm w-full relative`} >

          <button className="absolute top-3 right-3 text-gray-500 hover:text-gray-800" onClick={onClose}>
            <FaTimes />
          </button>
          <h2 className="text-xl font-semibold mb-4">Confirm Deletion</h2>
          <p className="text-gray-700 mb-6">Are you sure you want to remove this item from your cart?</p>
          <div className="flex justify-end space-x-3">
            <button
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              onClick={onConfirm}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
      );
};

      export default ConfirmationModal;
