import React from "react";

function Biography({ data, updateForm, nextStep, prevStep }) {
  return (
    <div className="bg-white dark:bg-[#121212] text-gray-500 dark:text-white border dark:border-gray-100 max-w-[640px] w-full mx-4 md:p-6 p-4 py-8 text-left text-sm rounded-xl shadow-[0px_0px_10px_0px] shadow-black/10">
      <h2 className="text-2xl font-bold mb-9 text-center text-gray-800 dark:text-white">
        Biography
      </h2>
      <div className="flex flex-col w-full items-center my-2 mb-6 border bg-indigo-500/5 border-gray-500/10  rounded gap-1 p-2">
        <div className="w-full sm:w-48 md:w-56 lg:w-72 xl:w-124">
          <textarea
            className="w-full h-40 sm:h-48 md:h-56 lg:h-64 xl:h-72 outline-none bg-transparent py-2.5 italic text-md"
            placeholder="Biography"
            value={data.biography}
            onChange={(e) => {
              const value = e.target.value;
              const words = value.trim().split(/\s+/);
              if (words.length <= 100)
                updateForm({ ...data, biography: value });
            }}
          />

          <div
            className={`text-right text-sm mt-1 ${
              data.biography.trim().split(/\s+/).length >= 100
                ? "text-red-600 font-semibold"
                : "text-gray-500"
            }`}
          >
            {data.biography.trim() === ""
              ? 0
              : data.biography.trim().split(/\s+/).length}{" "}
            / 100 words
          </div>
        </div>
      </div>

      <button
        className="w-full mb-3 disabled:bg-indigo-300 bg-indigo-500 hover:bg-indigo-600/90 transition py-2.5 rounded text-white font-medium"
        disabled={updateForm?.biography?.length < 1}
        onClick={nextStep}
      >
        Next
      </button>
    </div>
  );
}

export default Biography;
