import { useState } from "react";
import Loader from "../Loader";
import { ArrowIcon, HomeIcon } from "../../assets/Icons";
import { Link, useNavigate } from "react-router-dom";
import { useChangeUserPassword, useCurrentUser } from "../hooks/useUSer.js";
import { useDispatch } from "react-redux";
import { showPopup } from "../../features/popup.js";

function ChangePassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data: user, isLoading } = useCurrentUser();

  const { mutate: changePasswordMutate, isLoading: changingPassword } =
    useChangeUserPassword();

  const handleChangePassword = () => {
    changePasswordMutate(
      {
        oldPassword,
        newPassword,
        confirmPassword,
      },
      {
        onSuccess: () => {
          dispatch(
            showPopup({
              component: "Successful_Popup",
              props: {
                isOpen: true,
                message: "Password Changed Successfully",
              },
            })
          );
          navigate(`/${user.username}/settings/profile`);
        },
        onError: () => {
          alert("Password Change Failed");
        },
      }
    );
  };

  if (isLoading || changingPassword) return <Loader isLoading={true} />;

  if (!user) return <p>No User Found</p>;

  return (
    <div className="flex flex-col gap-5 h-screen">
      <div className="mt-20 space-y-5">
        <div className="flex flex-wrap  justify-center items-center space-x-2 text-md font-medium">
          <button type="button" aria-label="Home">
            <HomeIcon />
          </button>
          <ArrowIcon />
          <Link to={`/${user.username}/settings`} className="hover:underline">
            Settings
          </Link>
          <ArrowIcon />
          <Link
            to={`/${user.username}/settings/profile`}
            className="hover:underline"
          >
            Profile
          </Link>
          <ArrowIcon />
          <span>Password</span>
        </div>
        <div className="flex justify-center items-center">
          <div className="bg-white dark:bg-[#121212] text-gray-500 dark:text-white border dark:border-gray-100 max-w-[340px] w-full mx-4 md:p-6 p-4 py-8 text-left text-sm rounded-xl shadow-[0px_0px_10px_0px] shadow-black/10">
            <h2 className="text-2xl font-bold mb-9 text-center text-gray-800 dark:text-white">
              Change Password
            </h2>
            <div className="mb-4">
              <label
                htmlFor="oldPassword"
                className="block text-sm font-medium text-gray-700 dark:text-gray-200"
              >
                Old Password
              </label>
              <div className="flex items-center mt-2 border bg-indigo-500/5 border-gray-500/10 rounded gap-1 pl-2">
                <input
                  id="oldPassword"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your old password"
                  required
                  className="w-full outline-none bg-transparent py-2.5"
                  onChange={(e) => setOldPassword(e.target.value)}
                />
              </div>
            </div>
            <div className="mb-4">
              <label
                htmlFor="newPassword"
                className="block text-sm font-medium text-gray-700 dark:text-gray-200"
              >
                New Password
              </label>
              <div
                className={`flex items-center mt-2 border bg-indigo-500/5 border-gray-500/10 rounded gap-1 pl-2 ${
                  newPassword.length > 0 &&
                  (newPassword == oldPassword ? "border-2 border-red-600" : "")
                }`}
              >
                <input
                  id="newPassword"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your New password"
                  required
                  className="w-full outline-none bg-transparent py-2.5"
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              {newPassword.length > 0 &&
                (newPassword === oldPassword ? (
                  <span className="text-xs italic p-1 text-red-600">
                    Same Password
                  </span>
                ) : (
                  ""
                ))}
            </div>
            <div className="mb-4">
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700 dark:text-gray-200"
              >
                Confirm New Password
              </label>
              <div
                className={`flex items-center mt-2 border bg-indigo-500/5 border-gray-500/10 rounded gap-1 pl-2 ${
                  confirmPassword.length > 0 &&
                  (newPassword !== confirmPassword
                    ? "border-2 border-red-600"
                    : "border-2 border-green-600")
                }`}
              >
                <input
                  id="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  placeholder="Confirm your New password"
                  required
                  className="w-full outline-none bg-transparent py-2.5"
                  disabled={
                    newPassword.length === 0 || newPassword === oldPassword
                  }
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              {confirmPassword.length > 0 &&
                (newPassword !== confirmPassword ? (
                  <span className="text-xs italic p-1 text-red-600">
                    Password don't match
                  </span>
                ) : (
                  <span className="text-xs italic p-1 text-green-600">
                    Password match
                  </span>
                ))}
            </div>
            <div className="flex items-center gap-1 my-2">
              <input
                id="checkbox"
                type="checkbox"
                checked={showPassword}
                onChange={(e) => setShowPassword(e.target.checked)}
              />
              <label htmlFor="checkbox">Show password</label>
            </div>
            <button
              className={`w-full my-3 disabled:bg-indigo-300 bg-indigo-500 hover:bg-indigo-600/90 transition py-2.5 rounded text-white font-medium cursor-pointer`}
              disabled={
                !oldPassword ||
                !newPassword ||
                !confirmPassword ||
                newPassword !== confirmPassword ||
                oldPassword === newPassword
              }
              onClick={handleChangePassword}
            >
              Change Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChangePassword;
