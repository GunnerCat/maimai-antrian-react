import React, { useState } from 'react';

const Modal = ({ isOpen, onClose, onQueue }) => {
  const [name, setName] = useState('');

  const handleQueue = () => {
    onQueue(name);
    setName('');
  };

  return (
    <div
      className={`fixed z-10 inset-0 overflow-y-auto ${
        isOpen ? 'block' : 'hidden'
      }`}
      tabIndex="-1"
    >
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-480 bg-white rounded-lg shadow-lg p-6">
          <div className="mb-4">
            <h5 className="text-lg font-bold">Modal Title</h5>
          </div>
          <div className="mb-4">
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Username"
              aria-label="Username"
              aria-describedby="ba"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              className="mr-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none"
              onClick={onClose}
            >
              Close
            </button>
            <button
              type="button"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none"
              onClick={handleQueue}
            >
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;