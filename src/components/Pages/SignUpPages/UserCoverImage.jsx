import React, { useState } from "react";
import { Link } from "react-router-dom";

function UserCoverImage({ data, updateForm, nextStep, prevStep }) {
  const [coverPreview, setCoverPreview] = useState(null);

  const handleCoverChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    updateForm({ coverFile: file });
    setCoverPreview(URL.createObjectURL(file));
  };

  return (
    <div className="bg-white dark:bg-[#121212] text-gray-500 dark:text-white border dark:border-gray-100 max-w-[740px] w-full mx-4 md:p-6 p-4 py-8 text-left text-sm rounded-xl shadow-[0px_0px_10px_0px] shadow-black/10">
      <h2 className="text-2xl font-bold mb-9 text-center text-gray-800 dark:text-white">
        Upload Your Cover Image
      </h2>
      <div className="flex justify-center mb-4 items-center">
        <img
          className="aspect-[3/1]"
          src={coverPreview || "/samplecoverimage.png"}
          alt="userImage1"
        />
      </div>
      <div className="flex justify-center mb-4 items-center">
        <label
          htmlFor="fileInput"
          className="border bg-white dark:bg-[#121212] rounded-md text-sm w-full border-indigo-600/60 p-8 flex flex-col items-center gap-4  cursor-pointer hover:border-indigo-500 transition"
        >
          <svg
            width="44"
            height="44"
            viewBox="0 0 44 44"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M25.665 3.667H11a3.667 3.667 0 0 0-3.667 3.666v29.334A3.667 3.667 0 0 0 11 40.333h22a3.667 3.667 0 0 0 3.666-3.666v-22m-11-11 11 11m-11-11v11h11m-7.333 9.166H14.665m14.667 7.334H14.665M18.332 16.5h-3.667"
              stroke="#2563EB"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          {!coverPreview ? (
            <div className="flex flex-col justify-center items-center">
              <p className="text-gray-500">Drag & drop your files here</p>
              <p className="text-gray-400">
                Or <span className="text-indigo-500 underline">click</span> to
                upload
              </p>
            </div>
          ) : (
            <div className="flex flex-col justify-center items-center">
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                {coverPreview}
              </p>
            </div>
          )}
          <input
            id="fileInput"
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleCoverChange}
          />
        </label>
      </div>
      <button
        className="w-full mb-3 disabled:bg-indigo-300 bg-indigo-500 hover:bg-indigo-600/90 transition py-2.5 rounded text-white font-medium"
        onClick={nextStep}
      >
        {!coverPreview ? "Skip" : "Next"}
      </button>
      <p className="text-center mt-4">
        Have an account?{" "}
        <Link to={`/`} className="text-blue-500 underline">
          Log in
        </Link>
      </p>
    </div>
  );
}

export default UserCoverImage;
