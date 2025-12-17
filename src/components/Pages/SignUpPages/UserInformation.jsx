import React, { useEffect, useState } from "react";
import z from "zod";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import { useSendOTP } from "../../hooks/useUser";
import { useDispatch } from "react-redux";
import { showPopup } from "../../../features/popup";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import Input_bar from "../../../utils/Input_bar";

const signUpSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .regex(/^[a-z0-9_]+$/, "Invalid username"),
  fullName: z
    .string()
    .min(3, "Full name must be at least 3 characters")
    .regex(/^[a-zA-Z0-9_ ]+$/, "Invalid full name"),
  email: z.email("Invalid email address"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters"),
});

const validate = (values) => {
  const result = signUpSchema.safeParse(values);
  if (result.success) return {};

  const errors = {};
  result.error.issues.forEach((issue) => {
    const field = issue.path[0];
    errors[field] = issue.message;
  });

  return errors;
};

function UserInformation({ data, updateForm, nextStep }) {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      email: "",
      fullName: "",
    },
    validate,
  });

  useEffect(() => {
    formik.setValues(data);
  }, [data]);

  const { mutate: sendUserOTP } = useSendOTP();

  const handleSubmit = () => {
    updateForm({
      username: formik.values.username,
      fullName: formik.values.fullName,
      email: formik.values.email,
      password: formik.values.password,
    });
    sendUserOTP({
      username: formik.values.username,
      email: formik.values.email,
    });
    dispatch(
      showPopup({
        component: "Successful_Popup",
        props: {
          isOpen: true,
          message: "OTP has been shared!",
        },
      })
    );
    nextStep();
  };

  return (
    <div className="bg-white dark:bg-[#121212] text-gray-500 dark:text-white border dark:border-gray-100 max-w-[340px] w-full mx-4 md:p-6 p-4 py-8 text-left text-sm rounded-xl shadow-[0px_0px_10px_0px] shadow-black/10">
      <h2 className="text-2xl font-bold mb-9 text-center text-gray-800 dark:text-white">
        Sign up to see videos from your favourite celebrities.
      </h2>
      <div className="flex items-center mt-2 border bg-indigo-500/5 border-gray-500/10  rounded gap-1 pl-2">
        <Input_bar
          id="username"
          name="username"
          type="text"
          placeholder="Username"
          required
          value={formik.values.username.toLowerCase()}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
      </div>
      {formik.touched.username && formik.errors.username && (
        <span className="text-sm text-red-600">{formik.errors.username}</span>
      )}
      <div className="flex items-center mt-2 border bg-indigo-500/5 border-gray-500/10 rounded gap-1 pl-2">
        <Input_bar
          id="fullName"
          name="fullName"
          type="text"
          placeholder="Full Name"
          required
          value={formik.values.fullName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
      </div>
      {formik.touched.fullName && formik.errors.fullName && (
        <span className="text-sm text-red-600">{formik.errors.fullName}</span>
      )}
      <div className="flex items-center mt-2 border bg-indigo-500/5 border-gray-500/10 rounded gap-1 pl-2">
        <Input_bar
          id="email"
          name="email"
          type="email"
          placeholder="Email"
          required
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
      </div>
      {formik.touched.email && formik.errors.email && (
        <span className="text-sm text-red-600">{formik.errors.email}</span>
      )}
      <div className="flex items-center mt-2 border bg-indigo-500/5 border-gray-500/10 rounded gap-1 pl-2">
        <Input_bar
          id="password"
          name="password"
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          required
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.values.password.length > 0 ? (
          showPassword ? (
            <EyeIcon
              className="w-5 h-5 mr-2 text-gray-500 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            />
          ) : (
            <EyeSlashIcon
              className="w-5 h-5 mr-2 text-gray-500 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            />
          )
        ) : null}
      </div>
      {formik.touched.password && formik.errors.password && (
        <span className="text-sm text-red-600">{formik.errors.password}</span>
      )}
      <button
        disabled={!(formik.isValid && formik.dirty)}
        className="w-full my-3 disabled:bg-indigo-300 bg-indigo-500 hover:bg-indigo-600/90 transition py-2.5 rounded text-white font-medium cursor-pointer"
        onClick={handleSubmit}
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
  );
}

export default UserInformation;
