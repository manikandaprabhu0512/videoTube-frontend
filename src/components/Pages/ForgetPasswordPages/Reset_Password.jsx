import { useState } from "react";
import { Eye, EyeOff, Lock, CheckCircle, XCircle } from "lucide-react";
import { useResetPassword } from "../../hooks/useUser";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { showPopup } from "../../../features/popup";

function Reset_Password({ email, nextStep, prevStep }) {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const hasMinLength = newPassword.length >= 8;
  const hasUpperCase = /[A-Z]/.test(newPassword);
  const hasLowerCase = /[a-z]/.test(newPassword);
  const hasNumber = /[0-9]/.test(newPassword);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(newPassword);
  const passwordsMatch =
    newPassword === confirmPassword && confirmPassword !== "";

  const isValidPassword =
    hasMinLength && hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { mutateAsync: resetPassword } = useResetPassword();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!isValidPassword) {
      setError("Please meet all password requirements");
      return;
    }

    if (!passwordsMatch) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      await resetPassword({ email, newPassword });
      navigate("/");
      dispatch(
        showPopup({
          component: "Successful_Popup",
          props: {
            isOpen: true,
            message: "Password Changed Successfully!!",
          },
        })
      );
    } catch (err) {
      setError("Failed to reset password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="dark:bg-[#121212] bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="w-8 h-8 text-indigo-600" />
          </div>
          <h1 className="text-3xl font-bold text-slate-500 dark:text-slate-200 mb-2">
            Reset Password
          </h1>
          <p className="text-slate-500 dark:text-slate-200">
            Create a strong new password for your account
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 flex items-start">
            <XCircle className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
            <span className="text-sm">{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="newPassword"
              className="block text-sm font-medium text-slate-500 dark:text-slate-400 mb-2"
            >
              New Password
            </label>
            <div className="relative">
              <input
                type={showNewPassword ? "text" : "password"}
                id="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
                placeholder="Enter new password"
                required
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showNewPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-slate-500 dark:text-slate-400 mb-2"
            >
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
                placeholder="Confirm new password"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showConfirmPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {newPassword && (
            <div className="bg-gray-50 rounded-lg p-4 space-y-2">
              <p className="text-sm font-medium text-gray-700 mb-3">
                Password must contain:
              </p>
              <div className="space-y-2">
                <RequirementItem
                  met={hasMinLength}
                  text="At least 8 characters"
                />
                <RequirementItem
                  met={hasUpperCase}
                  text="One uppercase letter"
                />
                <RequirementItem
                  met={hasLowerCase}
                  text="One lowercase letter"
                />
                <RequirementItem met={hasNumber} text="One number" />
                <RequirementItem
                  met={hasSpecialChar}
                  text="One special character (!@#$%^&*)"
                />
                {confirmPassword && (
                  <RequirementItem
                    met={passwordsMatch}
                    text="Passwords match"
                  />
                )}
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={loading || !isValidPassword || !passwordsMatch}
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition duration-200 shadow-lg hover:shadow-xl cursor-pointer"
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Resetting Password...
              </span>
            ) : (
              "Reset Password"
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <a
            href="/"
            className="text-sm text-indigo-600 hover:text-indigo-800 font-medium"
          >
            ← Back to Login
          </a>
        </div>
      </div>
    </div>
  );
}

function RequirementItem({ met, text }) {
  return (
    <div className="flex items-center text-sm">
      {met ? (
        <CheckCircle className="w-4 h-4 text-green-600 mr-2 flex-shrink-0" />
      ) : (
        <XCircle className="w-4 h-4 text-gray-400 mr-2 flex-shrink-0" />
      )}
      <span className={met ? "text-green-700" : "text-gray-600"}>{text}</span>
    </div>
  );
}

export default Reset_Password;
