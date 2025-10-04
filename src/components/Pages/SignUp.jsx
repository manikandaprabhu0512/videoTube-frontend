import { useMutation } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../Api/users.js";
import Loader from "../Loader";
import { useDispatch } from "react-redux";
import { showPopup } from "../../features/popup.js";
import { Change } from "../../assets/Icons";

function SignUp() {
  const [username, setUserName] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [biography, setBiography] = useState("");
  const [signupDisabled, setSignUpDisabled] = useState(true);
  const [firstPage, setFirstPage] = useState(true);
  const [secondPage, setSecondPage] = useState(false);
  const [thirdPage, setThridPage] = useState(false);
  const [fourthPage, setFourthPage] = useState(false);
  const [fivthPage, setFivithPage] = useState(false);
  const [terms, setTerms] = useState(false);

  const [conditions, setConditions] = useState(false);

  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);

  const [coverFile, setCoverFile] = useState(null);
  const [coverPreview, setCoverPreview] = useState(null);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Videotube | Sign Up";
  }, []);

  const { mutate: registerNewUser, isPending } = useMutation({
    mutationKey: ["registerUser"],
    mutationFn: registerUser,
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    registerNewUser(
      {
        username,
        fullName,
        email,
        password,
        biography,
        avatarFile,
        coverFile,
      },
      {
        onSuccess: () => {
          dispatch(
            showPopup({
              component: "Successful_Popup",
              props: {
                isOpen: true,
                message: "🎉 Registered successfully!",
              },
            })
          );
          navigate(`/`);
        },
        onError: () => {
          alert("User Already Exists");
          window.location.href = "/";
        },
      }
    );
  };

  useEffect(() => {
    if (
      username.trim().length > 0 &&
      fullName.trim().length > 0 &&
      email.trim().length > 0 &&
      password.trim().length > 0
    ) {
      setSignUpDisabled(false);
    } else {
      setSignUpDisabled(true);
    }
  }, [username, fullName, email, password]);

  const handleFirstPage = () => {
    setFirstPage(!firstPage);
    setSecondPage(!secondPage);
  };

  const handleSecondPage = () => {
    setSecondPage(!secondPage);
    setThridPage(!thirdPage);
  };

  const handlethirdpage = () => {
    setThridPage(!thirdPage);
    setFourthPage(!fourthPage);
  };

  const handlefourthpage = () => {
    setFourthPage(!fourthPage);
    setFivithPage(!fivthPage);
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setAvatarFile(file);
    setAvatarPreview(URL.createObjectURL(file));
  };

  const handleCoverChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setCoverFile(file);
    setCoverPreview(URL.createObjectURL(file));
  };

  if (isPending) return <Loader isLoading={true} />;

  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <form onSubmit={handleSubmit}>
          {firstPage && (
            <div className="bg-white dark:bg-[#121212] text-gray-500 dark:text-white border dark:border-gray-100 max-w-[340px] w-full mx-4 md:p-6 p-4 py-8 text-left text-sm rounded-xl shadow-[0px_0px_10px_0px] shadow-black/10">
              <h2 className="text-2xl font-bold mb-9 text-center text-gray-800 dark:text-white">
                Sign up to see videos from your favourite celebrities.
              </h2>
              <div className="flex items-center my-2 border bg-indigo-500/5 border-gray-500/10  rounded gap-1 pl-2">
                <input
                  className="w-full outline-none bg-transparent py-2.5 "
                  type="text"
                  placeholder="Username"
                  required
                  onChange={(e) => setUserName(e.target.value)}
                />
              </div>
              <div className="flex items-center mt-2 border bg-indigo-500/5 border-gray-500/10 rounded gap-1 pl-2">
                <input
                  className="w-full outline-none bg-transparent py-2.5"
                  type="text"
                  placeholder="Full Name"
                  required
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>
              <div className="flex items-center mt-2 border bg-indigo-500/5 border-gray-500/10 rounded gap-1 pl-2">
                <input
                  className="w-full outline-none bg-transparent py-2.5"
                  type="email"
                  placeholder="Email"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="flex items-center mt-2 mb-4 border bg-indigo-500/5 border-gray-500/10 rounded gap-1 pl-2">
                <input
                  className="w-full outline-none bg-transparent py-2.5"
                  type="password"
                  placeholder="Password"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button
                className="w-full mb-3 disabled:bg-indigo-300 bg-indigo-500 hover:bg-indigo-600/90 transition py-2.5 rounded text-white font-medium cursor-pointer"
                disabled={signupDisabled}
                onClick={handleFirstPage}
              >
                Sign Up
              </button>
              <p className="text-center mt-4">
                Have an account?{" "}
                <Link to={`/`} className="text-blue-500 underline">
                  Log in
                </Link>
              </p>
            </div>
          )}
          {secondPage && (
            <div className="bg-white dark:bg-[#121212] text-gray-500 dark:text-white border dark:border-gray-100 max-w-[340px] w-full mx-4 md:p-6 p-4 py-8 text-left text-sm rounded-xl shadow-[0px_0px_10px_0px] shadow-black/10">
              <h2 className="text-2xl font-bold mb-9 text-center text-gray-800 dark:text-white">
                Upload Your Avatar
              </h2>
              <div className="flex justify-center mb-4 items-center">
                <img
                  className="h-20 w-20 rounded-full"
                  src={avatarPreview || "/dummy-avatar.png"}
                  alt="userImage1"
                />
              </div>
              <div className="flex justify-center mb-4 items-center">
                {!avatarPreview ? (
                  <label
                    htmlFor="fileInput"
                    className="border bg-white dark:bg-[#121212] rounded-md text-sm w-80 border-indigo-600/60 p-8 flex flex-col items-center gap-4  cursor-pointer hover:border-indigo-500 transition"
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
                    <div className="flex flex-col justify-center items-center">
                      <p className="text-gray-500">
                        Drag & drop your files here
                      </p>
                      <p className="text-gray-400">
                        Or{" "}
                        <span className="text-indigo-500 underline">click</span>{" "}
                        to upload
                      </p>
                    </div>
                  </label>
                ) : (
                  <div>
                    <label
                      htmlFor="fileInput"
                      className="flex items-center justify-center gap-1"
                    >
                      <Change />
                      Change
                    </label>
                  </div>
                )}
                <input
                  id="fileInput"
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleAvatarChange}
                />
              </div>
              <button
                className="w-full mb-3 disabled:bg-indigo-300 bg-indigo-500 hover:bg-indigo-600/90 transition py-2.5 rounded text-white font-medium cursor-pointer"
                onClick={handleSecondPage}
              >
                {!avatarFile ? "Skip" : "Next"}
              </button>
              <p className="text-center mt-4">
                Have an account?{" "}
                <Link to={`/`} className="text-blue-500 underline">
                  Log in
                </Link>
              </p>
            </div>
          )}
          {thirdPage && (
            <div className="bg-white dark:bg-[#121212] text-gray-500 dark:text-white border dark:border-gray-100 max-w-[940px] w-full mx-4 md:p-6 p-4 py-8 text-left text-sm rounded-xl shadow-[0px_0px_10px_0px] shadow-black/10">
              <h2 className="text-2xl font-bold mb-9 text-center text-gray-800 dark:text-white">
                Upload Your Cover Image
              </h2>
              <div className="flex justify-center mb-4 items-center">
                <img
                  className="aspect-[3/1]"
                  src={coverPreview || "/dummy-avatar.png"}
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
                      <p className="text-gray-500">
                        Drag & drop your files here
                      </p>
                      <p className="text-gray-400">
                        Or{" "}
                        <span className="text-indigo-500 underline">click</span>{" "}
                        to upload
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
                onClick={handlethirdpage}
              >
                {!coverFile ? "Skip" : "Next"}
              </button>
              <p className="text-center mt-4">
                Have an account?{" "}
                <Link to={`/`} className="text-blue-500 underline">
                  Log in
                </Link>
              </p>
            </div>
          )}
          {fourthPage && (
            <div className="bg-white dark:bg-[#121212] text-gray-500 dark:text-white border dark:border-gray-100 max-w-[640px] w-full mx-4 md:p-6 p-4 py-8 text-left text-sm rounded-xl shadow-[0px_0px_10px_0px] shadow-black/10">
              <h2 className="text-2xl font-bold mb-9 text-center text-gray-800 dark:text-white">
                Biography
              </h2>
              <div className="flex w-full items-center my-2 mb-6 border bg-indigo-500/5 border-gray-500/10  rounded gap-1 pl-2">
                <textarea
                  className="w-[640px] h-[200px] outline-none bg-transparent py-2.5 italic text-md"
                  type="text"
                  placeholder="Biography"
                  required
                  onChange={(e) => {
                    const words = e.target.value.trim().split(/\s+/);
                    if (words.length <= 250) {
                      setBiography(e.target.value);
                    }
                  }}
                />
              </div>
              <button
                className="w-full mb-3 disabled:bg-indigo-300 bg-indigo-500 hover:bg-indigo-600/90 transition py-2.5 rounded text-white font-medium"
                disabled={!biography.length > 0}
                onClick={handlefourthpage}
              >
                Next
              </button>
            </div>
          )}
          {fivthPage && (
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
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Vero quasi qui in iure deleniti ad adipisci atque delectus
                    nostrum ullam! Tenetur accusamus reprehenderit voluptatum
                    deserunt maxime et magni quidem quisquam!
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
                    By signing up, you agree to our Terms , Privacy Policy and
                    Cookies Policy .
                  </p>
                </label>
              </div>
              <button
                type="submit"
                className="w-full mb-3 disabled:bg-indigo-300 bg-indigo-500 hover:bg-indigo-600/90 transition py-2.5 rounded text-white font-medium"
                disabled={!terms || !conditions}
              >
                Sign up
              </button>
            </div>
          )}
        </form>
      </div>
    </>
  );
}

export default SignUp;
