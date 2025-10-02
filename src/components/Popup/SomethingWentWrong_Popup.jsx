import React, { useEffect } from "react";

function SomethingWentWrong_Popup({ message, isOpen, onClose }) {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div>
      <div className="flex fixed top-3 right-3 items-center justify-between text-red-600 max-w-80 w-full bg-white shadow h-10">
        <div className="h-full w-1.5 bg-red-600"></div>
        <div className="flex items-center">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            className="icon line"
          >
            <path
              style={{
                fill: "none",
                stroke: "currentColor",
                strokeLinecap: "round",
                strokeLinejoin: "round",
                strokeWidth: 1.95,
              }}
              d="M11.95 16.5h.1"
            />

            <path
              d="M3 12a9 9 0 0 1 9-9h0a9 9 0 0 1 9 9h0a9 9 0 0 1-9 9h0a9 9 0 0 1-9-9m9 0V7"
              style={{
                fill: "none",
                stroke: "currentColor",
                strokeLinecap: "round",
                strokeLinejoin: "round",
                strokeWidth: 1.5,
              }}
            />
          </svg>
          <p className="text-sm ml-2">{message}</p>
        </div>
        <button
          type="button"
          aria-label="close"
          className="active:scale-90 transition-all mr-3"
          onClick={onClose}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15 5L5 15M5 5L15 15"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default SomethingWentWrong_Popup;
