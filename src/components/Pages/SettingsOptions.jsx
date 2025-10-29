import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../../features/themeChange";
import { showPopup } from "../../features/popup.js";
import { Link } from "react-router-dom";
import { useCurrentUser } from "../hooks/useUser.js";
import Loader from "../Loader";

function SettingsOptions() {
  const dispatch = useDispatch();

  const { data: user, isLoading } = useCurrentUser();

  const darkMode = useSelector((state) => state.theme.darkMode);

  const handlelogout = () => {
    dispatch(
      showPopup({
        component: "Alert_Popup",
        props: {
          isOpen: true,
          message: "Are you Sure?",
          actionType: "LOGOUT_USER",
          btnName: "Logout",
          popMsg: "Logout",
        },
      })
    );
  };

  if (isLoading) return <Loader isLoading={true} />;

  return (
    <div className="px-4">
      <h2 className="text-2xl font-bold mt-5 mb-9 text-center text-gray-800 dark:text-white">
        Privacy & Settings
      </h2>
      <div className="border border-gray-300 rounded-lg mx-2 bg-white dark:bg-[#121212]">
        <ul>
          <li className="flex justify-between items-center p-4 border-b border-gray-200">
            <div>
              <p className="font-medium">Account Details</p>
              <p className="text-sm">Change username, password, avatar</p>
            </div>
            <Link
              to={`/settings/profile/${user.username}`}
              className="text-blue-600 font-medium hover:underline"
            >
              Edit
            </Link>
          </li>
          <li className="flex justify-between items-center p-4 border-b border-gray-200">
            <div>
              <p className="font-medium">Change Theme</p>
              <p className="text-sm">Apperence</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer text-gray-900 dark:text-white gap-3">
              <input
                type="checkbox"
                className="sr-only peer"
                onChange={() => dispatch(toggleTheme())}
                checked={darkMode}
              />
              <div className="w-16 h-8 bg-black rounded-full peer peer-checked:bg-slate-300 transition-colors duration-200"></div>
              <span className="dot absolute left-1 top-1 w-6 h-6 bg-white rounded-full transition-transform duration-200 ease-in-out peer-checked:translate-x-8"></span>
              {darkMode ? "Dark Mode" : "Light Mode"}
            </label>
          </li>
          <li className="flex justify-between items-center p-4">
            <div>
              <p className=" font-medium text-red-600">Sign out</p>
              <p className="text-sm ">Log out the account</p>
            </div>
            <button
              className="text-blue-600 font-medium hover:underline cursor-pointer"
              onClick={handlelogout}
            >
              Log out
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default SettingsOptions;
