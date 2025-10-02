import React, { use, useEffect, useState } from "react";
import {
  updateUserDetails,
  useCurrentUser,
  useRemoveAvatar,
  useRemoveCoverImage,
  useUpdateAvatar,
  useUpdateCoverImage,
} from "../hooks/Users.Hook";
import {
  ArrowIcon,
  Change,
  DeleteBtn,
  HomeIcon,
  Image,
} from "../../assets/Icons";
import Loader from "../Loader";
import Header from "../Header/Header";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { showPopup } from "../../features/popup";

function Settings() {
  const dispatch = useDispatch();

  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [biography, setBiography] = useState("");
  const [coverImage, setCoverImage] = useState(null);
  const [avatar, setAvatar] = useState(null);

  const [editFullNameBtn, setEditFullNameBtn] = useState(false);
  const [editUserNameBtn, setEditUserNameBtn] = useState(false);
  const [editEmailBtn, setEditEmailBtn] = useState(false);
  const [editBiographyBtn, setEditBiographyBtn] = useState(false);

  const { data: user, isLoading } = useCurrentUser();

  const { mutate: updateUserAccountDetails, isPending: updateUserLoading } =
    updateUserDetails();
  const { mutate: updateUserAvatar, isPending: updateUserAvatarLoading } =
    useUpdateAvatar();
  const { mutate: removeUserAvatar, isPending: removeUserAvatarLoading } =
    useRemoveAvatar();
  const { mutate: updateCoverImage, isPending: updateCoverImageLoading } =
    useUpdateCoverImage();
  const { mutate: removeCoverImage, isPending: removeCoverImageLoading } =
    useRemoveCoverImage();

  useEffect(() => {
    if (!user) return;
    setFullName(user.fullName);
    setUsername(user.username);
    setEmail(user.email);
    setBiography(user.biography);
  }, [user]);

  const handleFullNameEdit = async () => {
    if (editFullNameBtn && fullName !== user.fullName) {
      updateUserAccountDetails(
        {
          fullName: fullName,
        },
        {
          onSuccess: () => {
            setEditFullNameBtn(!editFullNameBtn);
            dispatch(
              showPopup({
                component: "Successful_Popup",
                props: {
                  isOpen: true,
                  message: "✅ Fullname Updated Successfully",
                },
              })
            );
          },
          onError: () => {
            alert("Failed to Update Full Name");
          },
        }
      );
    } else {
      setEditFullNameBtn(!editFullNameBtn);
    }
  };

  const handleUserNameEdit = async () => {
    if (editUserNameBtn && username !== user.username) {
      updateUserAccountDetails(
        {
          username: username,
        },
        {
          onSuccess: () => {
            setEditUserNameBtn(!editUserNameBtn);
            dispatch(
              showPopup({
                component: "Successful_Popup",
                props: {
                  isOpen: true,
                  message: "✅ Username Updated Successfully",
                },
              })
            );
          },
          onError: (error) => {
            dispatch(
              showPopup({
                component: "SomethingWentWrong_Popup",
                props: {
                  isOpen: true,
                  message: error.response.data.message || "Username Taken",
                },
              })
            );
          },
        }
      );
    } else {
      setEditUserNameBtn(!editUserNameBtn);
    }
  };

  const handleEmailEdit = async () => {
    if (editEmailBtn && email !== user.email) {
      updateUserAccountDetails(
        {
          email: email,
        },
        {
          onSuccess: () => {
            setEditEmailBtn(!editEmailBtn);
            dispatch(
              showPopup({
                component: "Successful_Popup",
                props: {
                  isOpen: true,
                  message: "✅ Email Updated Successfully",
                },
              })
            );
          },
          onError: (error) => {
            dispatch(
              showPopup({
                component: "SomethingWentWrong_Popup",
                props: {
                  isOpen: true,
                  message:
                    error.response.data.message || "Email Already Exists",
                },
              })
            );
          },
        }
      );
    } else {
      setEditEmailBtn(!editEmailBtn);
    }
  };

  const handleBiographyEdit = async () => {
    if (editBiographyBtn && biography !== user.biography) {
      updateUserAccountDetails(
        {
          biography: biography,
        },
        {
          onSuccess: () => {
            setEditBiographyBtn(!editBiographyBtn);
            dispatch(
              showPopup({
                component: "Successful_Popup",
                props: {
                  isOpen: true,
                  message: "✅ Biography Updated Successfully",
                },
              })
            );
          },
          onError: (error) => {
            dispatch(
              showPopup({
                component: "SomethingWentWrong_Popup",
                props: {
                  isOpen: true,
                  message:
                    error.response.data.message || "Error Updating Biography",
                },
              })
            );
          },
        }
      );
    } else {
      setEditBiographyBtn(!editBiographyBtn);
    }
  };

  useEffect(() => {
    if (!avatar) return;
    updateUserAvatar(
      { avatarFile: avatar },
      {
        onSuccess: () => {
          dispatch(
            showPopup({
              component: "Successful_Popup",
              props: {
                isOpen: true,
                message: "✅ Avatar Changed Successfully",
              },
            })
          );
        },
        onError: (error) => {
          dispatch(
            showPopup({
              component: "SomethingWentWrong_Popup",
              props: {
                isOpen: true,
                message: error.response.data.message || "Error Updating Avatar",
              },
            })
          );
        },
      }
    );
  }, [avatar]);

  const handleRemoveAvatar = () => {
    if (!user.avatar.url) return;
    removeUserAvatar(
      {},
      {
        onSuccess: () => {
          dispatch(
            showPopup({
              component: "Successful_Popup",
              props: {
                isOpen: true,
                message: "✅ Avatar Removed Successfully",
              },
            })
          );
        },
        onError: () => {
          dispatch(
            showPopup({
              component: "SomethingWentWrong_Popup",
              props: {
                isOpen: true,
                message: "Error Removing Avatar!",
              },
            })
          );
        },
      }
    );
  };

  useEffect(() => {
    if (!coverImage) return;
    updateCoverImage(
      { coverImageFile: coverImage },
      {
        onSuccess: () => {
          dispatch(
            showPopup({
              component: "Successful_Popup",
              props: {
                isOpen: true,
                message: "✅ Cover Image Changed Successfully",
              },
            })
          );
        },
        onError: (error) => {
          dispatch(
            showPopup({
              component: "SomethingWentWrong_Popup",
              props: {
                isOpen: true,
                message:
                  error.response.data.message || "Error Updating Cover Image",
              },
            })
          );
        },
      }
    );
  }, [coverImage]);

  const handleRemoveCoverImage = () => {
    if (!user.coverImage.url) return;
    removeCoverImage(
      {},
      {
        onSuccess: () => {
          dispatch(
            showPopup({
              component: "Successful_Popup",
              props: {
                isOpen: true,
                message: "✅ Cover Image Removed Successfully",
              },
            })
          );
        },
        onError: () => {
          dispatch(
            showPopup({
              component: "SomethingWentWrong_Popup",
              props: {
                isOpen: true,
                message: "Error Removing Cover Image!",
              },
            })
          );
        },
      }
    );
  };

  if (
    isLoading ||
    updateUserLoading ||
    updateUserAvatarLoading ||
    removeUserAvatarLoading ||
    updateCoverImageLoading ||
    removeCoverImageLoading
  )
    return <Loader isLoading={true} />;

  if (!user) return <p>No User Found</p>;

  return (
    <div>
      <Header />
      {/* BreadCrumbs */}
      <div class="flex flex-wrap justify-center items-center space-x-2 text-md font-medium">
        <button type="button" aria-label="Home">
          <HomeIcon />
        </button>
        <ArrowIcon />
        <Link to={`/${user.username}/settings`} className="hover:underline">
          Settings
        </Link>
        <ArrowIcon />
        <span>Profile</span>
      </div>
      {/* Cover Image */}
      <div className="relative w-full px-4 sm:px-6 lg:px-10 pt-3">
        <div className="relative group w-full">
          <img
            className="w-full aspect-[16/5] sm:aspect-[16/6] md:aspect-[16/4] lg:aspect-[16/3] object-cover rounded-b-lg"
            src={user.coverImage.url || "/samplecoverimage.png"}
            alt="cover image"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 text-white font-medium opacity-0 group-hover:opacity-100 group-hover:cursor-pointer transition-opacity">
            <div className="flex gap-10">
              <label className="flex items-center gap-2 cursor-pointer">
                <Change />
                <span className="pl-2">Change</span>
                <input
                  id="dropzone-file"
                  name="coverImage"
                  type="file"
                  accept="image/*"
                  required
                  className="hidden"
                  onChange={(e) => setCoverImage(e.target.files[0])}
                />
              </label>

              {user.coverImage.url && (
                <button
                  type="button"
                  className="flex items-center gap-2"
                  onClick={handleRemoveCoverImage}
                >
                  <DeleteBtn />
                  <span className="pl-2">Remove</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Avatar */}
        <div className="absolute left-1/2 transform -translate-x-1/2  -bottom-12 md:-bottom-20">
          <img
            className="h-24 w-24 sm:h-28 sm:w-28 md:h-32 md:w-32 lg:h-40 lg:w-40 rounded-full border-4 border-white object-cover shadow-md"
            src={user.avatar.url || "/dummy-avatar.png"}
            alt="avatar"
          />
        </div>
      </div>
      <div className="flex justify-center gap-10 mt-25 mb-5">
        <div>
          <label
            type="button"
            className="flex items-center gap-2 cursor-pointer"
          >
            <Image />
            <span>Change</span>
            <input
              id="dropzone-file"
              name="coverImage"
              type="file"
              accept="image/*"
              required
              className="hidden"
              onChange={(e) => setAvatar(e.target.files[0])}
            />
          </label>
        </div>
        <button
          className={`flex items-center gap-2 cursor-pointer ${
            !user.avatar.url && "pointer-events-none opacity-50"
          }`}
          onClick={handleRemoveAvatar}
        >
          <DeleteBtn />
          <span>Remove</span>
        </button>
      </div>
      {/* User Details */}
      <div className="flex justify-center mb-3">
        <h2>Account Details:</h2>
      </div>
      <div className="flex w-full justify-center">
        <div className=" w-3/4 border border-gray-300 rounded-lg bg-white dark:bg-[#121212]">
          <ul>
            {/* Full Name */}
            <li className="flex justify-between gap-5 items-center p-4 border-b border-gray-200">
              <div className="flex-1">
                <p className="font-medium">Full Name</p>
                {editFullNameBtn ? (
                  <input
                    type="text"
                    id="title"
                    name="title"
                    className={`w-full text-sm p-2 mt-2 ${
                      editFullNameBtn
                        ? "dark:bg-gray-800 bg-slate-300 rounded-md"
                        : ""
                    }`}
                    value={fullName}
                    readOnly={!editFullNameBtn}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                ) : (
                  <p className="text-sm">{user.fullName}</p>
                )}
              </div>
              <div>
                <button
                  className="text-blue-600 font-medium hover:underline cursor-pointer"
                  onClick={handleFullNameEdit}
                >
                  {editFullNameBtn ? "Save" : "Edit"}
                </button>
              </div>
            </li>
            {/* User Name */}
            <li className="flex justify-between gap-5 items-center p-4 border-b border-gray-200">
              <div className="flex-1">
                <p className="font-medium">User Name</p>
                {editUserNameBtn ? (
                  <input
                    type="text"
                    id="title"
                    name="title"
                    className={`w-full text-sm p-2 mt-2 ${
                      editUserNameBtn
                        ? "dark:bg-gray-800 bg-slate-300 rounded-md"
                        : ""
                    }`}
                    value={username}
                    readOnly={!editUserNameBtn}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                ) : (
                  <p className="text-sm">{user.username}</p>
                )}
              </div>
              <button
                className="text-blue-600 font-medium hover:underline cursor-pointer"
                onClick={handleUserNameEdit}
              >
                {editUserNameBtn ? "Save" : "Edit"}
              </button>
            </li>
            {/* Email */}
            <li className="flex justify-between gap-5 items-center p-4 border-b border-gray-200">
              <div className="flex-1">
                <p className="font-medium">Email</p>
                {editEmailBtn ? (
                  <input
                    type="text"
                    id="title"
                    name="title"
                    className={`w-full text-sm p-2 mt-2 ${
                      editEmailBtn
                        ? "dark:bg-gray-800 bg-slate-300 rounded-md"
                        : ""
                    }`}
                    value={email}
                    readOnly={!editEmailBtn}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                ) : (
                  <p className="text-sm">{user.email}</p>
                )}
              </div>
              <button
                className="text-blue-600 font-medium hover:underline cursor-pointer"
                onClick={handleEmailEdit}
              >
                {editEmailBtn ? "Save" : "Edit"}
              </button>
            </li>
            {/* Password */}
            <li className="flex justify-between gap-5 items-center p-4 border-b border-gray-200">
              <div className="flex-1">
                <p className="font-medium">Password</p>
                <p className="text-sm">************</p>
              </div>
              <Link
                to={"/change-password"}
                className="text-blue-600 font-medium hover:underline cursor-pointer"
              >
                Edit
              </Link>
            </li>
            {/* Biography */}
            <li className="flex justify-between gap-5 items-center p-4">
              <div className="flex-1">
                <p className=" font-medium">Biography</p>
                {editBiographyBtn ? (
                  <textarea
                    type="text"
                    id="title"
                    name="title"
                    className={`w-full h-30 text-sm p-2 mt-2 ${
                      editBiographyBtn
                        ? "dark:bg-gray-800 bg-slate-300 rounded-md"
                        : ""
                    }`}
                    value={biography}
                    readOnly={!editBiographyBtn}
                    onChange={(e) => setBiography(e.target.value)}
                  />
                ) : (
                  <p className="text-sm">
                    {user.biography || "No biography available"}
                  </p>
                )}
              </div>
              <button
                className="text-blue-600 font-medium hover:underline cursor-pointer"
                onClick={handleBiographyEdit}
              >
                {editBiographyBtn ? "Save" : "Edit"}
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div className="mt-10"> </div>
    </div>
  );
}

export default Settings;
