import React from "react";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      <div className="relative bg-white dark:bg-[#1f1f1f] rounded-lg shadow-xl w-11/12 sm:w-2/3 md:w-1/2 lg:w-2/3 max-h-[80vh] flex flex-col z-10">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-7 text-gray-500 hover:text-gray-800"
        >
          ✖
        </button>
        <div className="p-4 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
