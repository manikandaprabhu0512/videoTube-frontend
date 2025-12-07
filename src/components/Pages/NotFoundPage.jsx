import { Link } from "react-router-dom";

export default function ErrorPage() {
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen dark:bg-gray-800 bg-gray-100">
        <img
          src="/Not_Found_Image.png"
          alt="notfound"
          width={300}
          height={300}
        />

        <div className="mt-4 text-center">
          <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">
            Oops! Page not found
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Or this feature has not been added yet.
          </p>

          <a
            href="/"
            className="inline-block mt-4 px-5 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Go Back Home
          </a>
        </div>
      </div>
    </>
  );
}
