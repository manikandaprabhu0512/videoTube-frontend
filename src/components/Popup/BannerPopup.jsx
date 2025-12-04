import { useState } from "react";

export default function BannerPopup() {
  const [Open, isOpen] = useState(true);

  if (!Open) return null;

  return (
    <>
      <div className="relative w-full py-2.5 font-medium text-sm text-white text-center bg-gradient-to-r from-[#4F39F6] to-[#FDFEFF]">
        <p>
          <a
            href="https://github.com/manikandaprabhu0512/Videogram"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1 rounded-md text-indigo-600 bg-white mr-2"
          >
            Github Link
          </a>
          Please Click for the code
        </p>
        <button
          type="button"
          onClick={() => isOpen(false)}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:opacity-80"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              y="12.532"
              width="17.498"
              height="2.1"
              rx="1.05"
              transform="rotate(-45.74 0 12.532)"
              fill="#4F39F6"
            />
            <rect
              x="12.533"
              y="13.915"
              width="17.498"
              height="2.1"
              rx="1.05"
              transform="rotate(-135.74 12.533 13.915)"
              fill="#4F39F6"
            />
          </svg>
        </button>
      </div>
    </>
  );
}
