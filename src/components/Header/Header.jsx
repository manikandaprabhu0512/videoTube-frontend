import Loader from "../Loader";
import { useDispatch } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";
import { useCurrentUser } from "../hooks/useUser";
import { toggleSideBar } from "../../features/sidebar";
import { useState } from "react";
import ErrorPage from "../Pages/Service_Unavailavle";

function Header() {
  const dispatch = useDispatch();
  const [dropDown, setDropDown] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const { data: user, isLoading: userLoading, isError } = useCurrentUser();

  const handleSearch = (e) => {
    setSearchParams({ q: e.target.value });
  };

  if (userLoading) return <Loader isLoading={true} />;

  if (isError) {
    return (
      <div>
        <ErrorPage />
      </div>
    );
  }

  return (
    <nav className="flex items-center justify-between gap-2 sm:gap-5 h-20 md:px-10 lg:px-15 xl:px-20 bg-white dark:bg-[#0f0f0f] transition-all">
      <div className="flex items-center gap-4 ">
        <button onClick={() => dispatch(toggleSideBar())}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-8 p-1 rounded-md transition dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 active:bg-slate-200 dark:active:bg-slate-500"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
            />
          </svg>
        </button>
      </div>
      <Link to={`/`}>
        <img
          src="/App_Logo_Dark_Mode.png"
          alt="Logo"
          className="block dark:hidden"
          width={250}
          height={70}
        />

        <img
          src="/App_Logo_Light_Mode.png"
          alt="Logo Dark"
          className="hidden dark:block"
          width={250}
          height={70}
        />
      </Link>
      <div className="flex justify-end sm:justify-center w-full">
        <div className="hidden sm:block w-full lg:w-1/2 lg:mt-0">
          <div className="flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full">
            <input
              className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500"
              type="text"
              placeholder="Search"
              onChange={handleSearch}
              value={searchParams.get("q") || ""}
            />
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.836 10.615 15 14.695"
                stroke="#7A7B7D"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                clipRule="evenodd"
                d="M9.141 11.738c2.729-1.136 4.001-4.224 2.841-6.898S7.67.921 4.942 2.057C2.211 3.193.94 6.281 2.1 8.955s4.312 3.92 7.041 2.783"
                stroke="#7A7B7D"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
        <div className="sm:hidden flex items-center">
          <button className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition">
            <svg
              width="20"
              height="20"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.836 10.615 15 14.695"
                stroke="#7A7B7D"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                clipRule="evenodd"
                d="M9.141 11.738c2.729-1.136 4.001-4.224 2.841-6.898S7.67.921 4.942 2.057C2.211 3.193.94 6.281 2.1 8.955s4.312 3.92 7.041 2.783"
                stroke="#7A7B7D"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
      <div>
        <div className="flex flex-col w-32 text-sm">
          <button
            className="w-full px-4 py-2 active:scale-95 transition text-sm text-gray-500 dark:text-white rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center gap-1"
            onClick={() => setDropDown(!dropDown)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            <span>Create</span>
          </button>

          {dropDown && (
            <ul className="overflow-hidden absolute right-10 top-14 text-sm text-gray-500 dark:text-white bg-gray-200 dark:bg-slate-800 w-40 rounded-lg shadow-md mt-2 py-1 z-99">
              <li className="px-4 py-2 hover:bg-gray-500/10 cursor-pointer">
                <Link className="flex items-start gap-2" to="/upload/video">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-5 h-5 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z"
                    />
                  </svg>

                  {/* "Create" text (hidden on mobile, shown on sm+) */}
                  <span>Upload Video</span>
                </Link>
              </li>
              <li className="px-4 py-2 hover:bg-gray-500/10 cursor-pointer">
                Copy link
              </li>
              <li className="px-4 py-2 hover:bg-gray-500/10 cursor-pointer">
                Edit file
              </li>
              <li className="px-4 py-2 hover:bg-red-500/10 text-red-500 cursor-pointer">
                Delete file
              </li>
            </ul>
          )}
        </div>
      </div>
      <div className="flex-shrink-0">
        <Link to={`/settings`} className="relative">
          <img
            className="h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 rounded-full object-cover"
            src={user.avatar.url || "/dummy-avatar.png"}
            alt="user avatar"
          />
        </Link>
      </div>
    </nav>
  );
}

export default Header;
