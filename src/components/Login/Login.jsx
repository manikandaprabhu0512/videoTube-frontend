import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../features/auth.js";
import { useEffect, useState } from "react";
import API from "../../Api/api.js";
import Loader from "../Loader";
import { showPopup } from "../../features/popup.js";
import z from "zod";
import { useFormik } from "formik";

const loginSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .regex(/^[a-zA-Z0-9_.-]+$/, "Invalid username format"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters"),
});

const validate = (values) => {
  const result = loginSchema.safeParse(values);
  if (result.success) return {};

  const errors = {};
  result.error.issues.forEach((issue) => {
    const field = issue.path[0];
    errors[field] = issue.message;
  });

  return errors;
};

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [authChecked, setAuthChecked] = useState(true);

  useEffect(() => {
    document.title = "Videogram - Login";
  }, []);

  const status = useSelector((state) => state.auth.status);

  useEffect(() => {
    if (!status) {
      setAuthChecked(false);
    }
  }, [status]);

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const res = await API.post("/users/login", {
        username: values.username,
        password: values.password,
      });

      if (res.status === 200) {
        localStorage.setItem("auth", JSON.stringify(res.data.data));
        dispatch(login({ username: values.username }));
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
      const status = error?.response?.status;
      const message = error?.response?.data?.message;

      // User Not Found
      if (status === 404) {
        return dispatch(
          showPopup({
            component: "SomethingWentWrong_Popup",
            props: {
              isOpen: true,
              message: "❌ User Not Found!",
            },
          })
        );
      }

      // Wrong Password
      if (status === 401 && message === "Invalid Password") {
        return dispatch(
          showPopup({
            component: "SomethingWentWrong_Popup",
            props: {
              isOpen: true,
              message: "❌ Wrong Password!",
            },
          })
        );
      }

      // Wrong Credentials
      if (status === 400) {
        return dispatch(
          showPopup({
            component: "SomethingWentWrong_Popup",
            props: {
              isOpen: true,
              message: "Wrong Credentials!",
            },
          })
        );
      }

      // Unexpected errors
      dispatch(
        showPopup({
          component: "SomethingWentWrong_Popup",
          props: {
            isOpen: true,
            message: "Something went wrong!",
          },
        })
      );
    } finally {
      setSubmitting(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      username: "test_user",
      password: "test_user",
    },
    validate: validate,
    onSubmit: handleSubmit,
  });

  if (authChecked) return <Loader isLoading={true} />;

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        className="bg-white dark:bg-[#121212] dark:text-white border dark:border-gray-100 text-gray-500 max-w-[340px] w-full mx-4 md:p-6 p-4 py-8 text-left text-sm rounded-xl shadow-[0px_0px_10px_0px] shadow-black/10"
        onSubmit={formik.handleSubmit}
      >
        <div className="flex items-center justify-center mb-4">
          <img
            src="/App_Logo_Dark_Mode.png"
            alt="Logo"
            className="block dark:hidden"
            width={200}
            height={40}
          />

          <img
            src="/App_Logo_Light_Mode.png"
            alt="Logo Dark"
            className="hidden dark:block"
            width={200}
            height={40}
          />
        </div>
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
            id="username"
            name="username"
            type="text"
            placeholder="Username"
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
          />
        </div>
        {formik.touched.username && formik.errors.username && (
          <span className="text-sm text-red-600">{formik.errors.username}</span>
        )}
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
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
          />
        </div>
        {formik.touched.password && formik.errors.password && (
          <span className="text-sm text-red-600">{formik.errors.password}</span>
        )}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-1">
            <input
              id="checkbox"
              type="checkbox"
              onChange={(e) => setShowPassword(e.target.checked)}
            />
            <label htmlFor="checkbox">Show Password</label>
          </div>
          <Link
            to={`account/forgot-password`}
            className="text-blue-600 underline"
          >
            Forgot Password
          </Link>
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
