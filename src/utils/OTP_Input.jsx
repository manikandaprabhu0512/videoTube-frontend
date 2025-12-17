import React, { useEffect, useRef, useState } from "react";
import {
  useVerifyForgotPasswordOTP,
  useVerifyRegistrationOTP,
} from "../components/hooks/useUser";

function OTP_Input({ username, nextStep, prevStep, process }) {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputsRef = useRef([]);

  const handleChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const { mutateAsync: verifyRegistrationOTP } = useVerifyRegistrationOTP();

  const { mutateAsync: verifyForgotPasswordOTP } = useVerifyForgotPasswordOTP();

  const handleSubmit = async () => {
    const finalOtp = otp.join("");

    if (finalOtp.length !== 6) {
      alert("Please enter a valid 6-digit OTP.");
      return;
    }

    try {
      if (process === "forgotPasswordProcess") {
        await verifyForgotPasswordOTP({
          username,
          otp: finalOtp,
        });
      } else if (process === "registerUserProcess") {
        await verifyRegistrationOTP({
          username,
          otp: finalOtp,
        });
      }

      nextStep();
    } catch (error) {
      const msg = error?.response?.data?.message || "Invalid OTP";

      alert(msg);
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();

    const paste = e.clipboardData.getData("text").trim();

    if (!/^\d+$/.test(paste)) return;

    const digits = paste.split("").slice(0, 6);
    const newOtp = [...otp];

    digits.forEach((digit, i) => {
      newOtp[i] = digit;
    });

    setOtp(newOtp);
    const nextIndex = digits.length >= 6 ? 5 : digits.length;
    inputsRef.current[nextIndex]?.focus();
  };

  useEffect(() => {
    if (inputsRef.current[0]) {
      inputsRef.current[0].focus();
    }
  }, []);

  return (
    <div className="max-w-md mx-auto text-center dark:bg-[#121212] bg-white px-4 sm:px-8 py-10 rounded-xl shadow">
      <header className="mb-8">
        <h1 className="text-2xl font-bold mb-1 dark:text-white text-gray-800">
          Email Verification
        </h1>
        <p className="text-[15px] text-slate-500 dark:text-slate-400">
          Enter the 6-digit verification code that was sent to your email
          address.
        </p>
      </header>

      <div className="flex items-center justify-center gap-3">
        {otp.map((digit, index) => (
          <input
            key={index}
            type="text"
            className="w-14 h-14 text-center text-2xl font-extrabold text-slate-900 bg-slate-100 border border-transparent hover:border-slate-200 appearance-none rounded p-4 outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
            maxLength="1"
            value={digit}
            ref={(el) => (inputsRef.current[index] = el)}
            onChange={(e) => handleChange(e.target.value, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            onPaste={handlePaste}
          />
        ))}
      </div>

      <div className="max-w-[260px] mx-auto mt-4">
        <button
          type="button"
          className="w-full inline-flex justify-center whitespace-nowrap rounded-lg bg-indigo-500 px-3.5 py-2.5 text-sm font-medium text-white shadow-sm shadow-indigo-950/10 hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-300 transition-colors duration-150 cursor-pointer"
          onClick={handleSubmit}
        >
          Verify Account
        </button>
      </div>

      <div className="text-sm text-slate-500 dark:text-slate-400 mt-4">
        Didn't receive code?{" "}
        <button
          type="button"
          className="font-medium text-indigo-500 hover:text-indigo-600"
        >
          Resend
        </button>
      </div>
    </div>
  );
}

export default OTP_Input;
