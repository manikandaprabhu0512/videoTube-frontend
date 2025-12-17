import { useState } from "react";

function TermsAndConditions({ prevStep, handleSubmit }) {
  const [terms, setTerms] = useState(false);
  const [conditions, setConditions] = useState(false);

  return (
    <div className="bg-white dark:bg-[#121212] text-gray-500 dark:text-white border dark:border-gray-100 max-w-[640px] w-full mx-4 md:p-6 p-4 py-8 text-left text-sm rounded-xl shadow-[0px_0px_10px_0px] shadow-black/10">
      <h2 className="text-2xl font-bold mb-9 text-center text-gray-800 dark:text-white">
        Terms & Conditions
      </h2>
      <div className="mb-4">
        <label class="flex gap-3 items-center cursor-pointer relative">
          <div>
            <input
              type="checkbox"
              class="hidden peer"
              onChange={() => setTerms(!terms)}
            />
            <span class="w-5 h-5 border border-slate-300 rounded relative flex items-center justify-center peer-checked:border-blue-600"></span>
            <svg
              class="absolute hidden peer-checked:inline left-1 top-1/2 transform -translate-y-1/2"
              width="11"
              height="8"
              viewBox="0 0 11 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="m10.092.952-.005-.006-.006-.005A.45.45 0 0 0 9.43.939L4.162 6.23 1.585 3.636a.45.45 0 0 0-.652 0 .47.47 0 0 0 0 .657l.002.002L3.58 6.958a.8.8 0 0 0 .567.242.78.78 0 0 0 .567-.242l5.333-5.356a.474.474 0 0 0 .044-.65Zm-5.86 5.349V6.3Z"
                fill="#2563EB"
                stroke="#2563EB"
                stroke-width=".4"
              />
            </svg>
          </div>
          <p className="text-start">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero quasi
            qui in iure deleniti ad adipisci atque delectus nostrum ullam!
            Tenetur accusamus reprehenderit voluptatum deserunt maxime et magni
            quidem quisquam!
          </p>
        </label>
      </div>
      <div className="mb-6">
        <label class="flex gap-3 items-center cursor-pointer relative">
          <div>
            <input
              type="checkbox"
              class="hidden peer"
              onChange={() => setConditions(!conditions)}
            />
            <span class="w-5 h-5 border border-slate-300 rounded relative flex items-center justify-center peer-checked:border-blue-600"></span>
            <svg
              class="absolute hidden peer-checked:inline left-1 top-1/2 transform -translate-y-1/2"
              width="11"
              height="8"
              viewBox="0 0 11 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="m10.092.952-.005-.006-.006-.005A.45.45 0 0 0 9.43.939L4.162 6.23 1.585 3.636a.45.45 0 0 0-.652 0 .47.47 0 0 0 0 .657l.002.002L3.58 6.958a.8.8 0 0 0 .567.242.78.78 0 0 0 .567-.242l5.333-5.356a.474.474 0 0 0 .044-.65Zm-5.86 5.349V6.3Z"
                fill="#2563EB"
                stroke="#2563EB"
                stroke-width=".4"
              />
            </svg>
          </div>
          <p className="text-start">
            By signing up, you agree to our Terms , Privacy Policy and Cookies
            Policy .
          </p>
        </label>
      </div>
      <button
        type="submit"
        className="w-full mb-3 disabled:bg-indigo-300 bg-indigo-500 hover:bg-indigo-600/90 transition py-2.5 rounded text-white font-medium"
        disabled={!terms || !conditions}
        onClick={handleSubmit}
      >
        Sign up
      </button>
    </div>
  );
}

export default TermsAndConditions;
