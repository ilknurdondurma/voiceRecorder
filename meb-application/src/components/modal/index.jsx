import React from 'react';

function Modal({ show, handleClose, children }) {
  return (
    <>
      {show && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="fixed inset-0 bg-black/70 opacity-50" onClick={handleClose}></div>
          <div className="bg-white p-8 max-w-md mx-auto rounded-md z-10 relative w-1/2 sm:w-full">
            <button
              onClick={handleClose}
              className="absolute top-2 right-2 text-gray-500 cursor-pointer"
            >
              Close
            </button>
            {children}
          </div>
        </div>
      )}
    </>
  );
}

export default Modal;
