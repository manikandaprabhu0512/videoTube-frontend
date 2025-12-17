import React, { useState } from "react";
import { useSendOTP, useVerifyEmail } from "../../hooks/useUser";
import { Link } from "react-router-dom";

function EmailEntry({ nextStep, username, setUsername, email, setEmail }) {
  const [validEmail, setValidEmail] = useState(true);

  const { mutateAsync: verifyEmail } = useVerifyEmail();

  const { mutate: sendUserOTP } = useSendOTP();

  const handleVerifyEmail = async () => {
    try {
      const res = await verifyEmail({ email });
      setValidEmail(true);
      setUsername(res.data.data.username);
      sendUserOTP({
        username: res.data.data.username,
        email: email,
      });
      nextStep();
    } catch (error) {
      console.log("FAILED:", error.response?.data || error);
      setValidEmail(false);
    }
  };
  return (
    <div className="flex justify-center items-center min-h-screen px-4">
      <div className="bg-gray-900/60 backdrop-blur-xl border border-gray-700 shadow-lg rounded-xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-semibold text-white text-center">
          Forgot Your Password?
        </h1>
        <p className="text-slate-400 text-center mt-2 text-sm">
          Enter the email associated with your account, and we will send you an
          OTP to reset your password.
        </p>

        <div className="mt-8">
          <label
            htmlFor="email"
            className="block mb-1 text-slate-300 font-medium"
          >
            Email Address
          </label>

          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">
              <svg
                width="18"
                height="18"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
              >
                <path d="M3 5l9 6 9-6"></path>
                <path d="M3 19V5l9 6 9-6v14H3z"></path>
              </svg>
            </span>

            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              className={`w-full pl-10 pr-3 py-2.5 bg-gray-800 border border-gray-700 
                     rounded-md text-slate-200 placeholder-slate-500
                     focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 
                     transition ${validEmail ? "" : "border-red-500"}`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          {!validEmail && (
            <p className="text-red-500 text-sm mt-1">
              Please enter a valid email address.
            </p>
          )}

          <button
            type="submit"
            className="w-full mt-6 py-2.5 font-medium rounded-md 
                   bg-indigo-600 text-white hover:bg-indigo-700 
                   transition focus:outline-none focus:ring-2 focus:ring-indigo-500"
            onClick={handleVerifyEmail}
          >
            Send OTP
          </button>
        </div>

        {/* Footer */}
        <p className="text-slate-500 text-center text-sm mt-6">
          Remember your password?{" "}
          <Link
            to="/"
            className="text-indigo-400 hover:text-indigo-300 underline"
          >
            Login Here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default EmailEntry;
