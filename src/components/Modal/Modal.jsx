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
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="mb-4">
            <h5 className="text-lg font-bold">Modal Title</h5>
            <button
              type="button"
              className="text-gray-500 hover:text-gray-700 focus:outline-none"
              onClick={onClose}
              aria-label="Close"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
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