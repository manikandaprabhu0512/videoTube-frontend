import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { login } from "../../features/auth.js";
import { useEffect, useState } from "react";
import API from "../../Api/api.js";
import Loader from "../Loader";
import { showPopup } from "../../features/popup.js";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [authChecked, setAuthChecked] = useState(true);
  useEffect(() => {
    document.title = "Videotube - Login";
  }, []);

  const status = useSelector((state) => state.auth.status);

  useEffect(() => {
    if (!status) {
      setAuthChecked(false);
    }
  }, [status]);

  if (authChecked) return <Loader isLoading={true} />;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post(
        "/users/login",
        {
          username: username,
          password: password,
        },
        { withCredentials: true }
      );

      if (res.status === 200) {
        localStorage.setItem("auth", JSON.stringify(res.data.data));
        dispatch(login({ username: username }));
        navigate(`/`, { replace: true });
        window.location.reload();
      }
      if (res.status == 400) {
        dispatch(
          showPopup({
            component: "SomethingWentWrong_Popup",
            props: {
              isOpen: true,
              message: "Wrong Credentials!",
            },
          })
        );
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        dispatch(
          showPopup({
            component: "SomethingWentWrong_Popup",
            props: {
              isOpen: true,
              message: "❌ User Not Found!",
            },
          })
        );
      } else if (
        error.response &&
        error.response.status === 401 &&
        error.response.data.message === "Invalid Password"
      ) {
        dispatch(
          showPopup({
            component: "SomethingWentWrong_Popup",
            props: {
              isOpen: true,
              message: "❌ Wrong Password!",
            },
          })
        );
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        className="bg-white dark:bg-[#121212] dark:text-white border dark:border-gray-100 text-gray-500 max-w-[340px] w-full mx-4 md:p-6 p-4 py-8 text-left text-sm rounded-xl shadow-[0px_0px_10px_0px] shadow-black/10"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-9 text-center text-gray-800 dark:text-white ">
          Welcome Back
        </h2>
        <div className="flex items-center my-2 border bg-indigo-500/5 border-gray-500/10 rounded gap-1 pl-2">
          <svg
            width="18"
            height="18"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="m2.5 4.375 3.875 2.906c.667.5 1.583.5 2.25 0L12.5 4.375"
              stroke="#6B7280"
              strokeOpacity=".6"
              strokeWidth="1.3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M11.875 3.125h-8.75c-.69 0-1.25.56-1.25 1.25v6.25c0 .69.56 1.25 1.25 1.25h8.75c.69 0 1.25-.56 1.25-1.25v-6.25c0-.69-.56-1.25-1.25-1.25Z"
              stroke="#6B7280"
              strokeOpacity=".6"
              strokeWidth="1.3"
              strokeLinecap="round"
            />
          </svg>
          <input
            className="w-full outline-none bg-transparent py-2.5"
            type="text"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="flex items-center mt-2 mb-4 border bg-indigo-500/5 border-gray-500/10 rounded gap-1 pl-2">
          <svg
            width="13"
            height="17"
            viewBox="0 0 13 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13 8.5c0-.938-.729-1.7-1.625-1.7h-.812V4.25C10.563 1.907 8.74 0 6.5 0S2.438 1.907 2.438 4.25V6.8h-.813C.729 6.8 0 7.562 0 8.5v6.8c0 .938.729 1.7 1.625 1.7h9.75c.896 0 1.625-.762 1.625-1.7zM4.063 4.25c0-1.406 1.093-2.55 2.437-2.55s2.438 1.144 2.438 2.55V6.8H4.061z"
              fill="#6B7280"
            />
          </svg>
          <input
            className="w-full outline-none bg-transparent py-2.5"
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-1">
            <input
              id="checkbox"
              type="checkbox"
              onChange={(e) => setShowPassword(e.target.checked)}
            />
            <label htmlFor="checkbox">Show Password</label>
          </div>
          <a className="text-blue-600 underline" href="#">
            Forgot Password
          </a>
        </div>
        <button
          type="submit"
          className="w-full mb-3 bg-indigo-500 hover:bg-indigo-600/90 transition py-2.5 rounded text-white font-medium cursor-pointer"
        >
          Log In
        </button>
        <p className="text-center mt-4">
          Don't have an account?{" "}
          <Link to={`account/signup`} className="text-blue-500 underline">
            Signup
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
