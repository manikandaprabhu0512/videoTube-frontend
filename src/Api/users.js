import API from "./api";

export const fetchUserData = async () => {
  try {
    const res = await API.get(`/users/getCurrentUser`, {
      withCredentials: true,
    });

    return res?.data?.data || null;
  } catch (error) {
    const message = error?.response?.data?.message;

    if (error?.response?.status === 401 && message === "Token Expired") {
      const refreshed = await generateNewTokens();

      if (refreshed) {
        return fetchUserData();
      } else {
        return null;
      }
    }
    throw error;
  }
};

export const generateNewTokens = async () => {
  try {
    const res = await API.post(
      "/users/refreshToken",
      {},
      { withCredentials: true }
    );
    return true;
  } catch (error) {
    console.error(
      "🚨 Failed to refresh tokens:",
      error?.response?.data?.message
    );
    return false;
  }
};

export const getUserWatchHistory = async () => {
  try {
    const res = await API.get("/users/watchHistory", {
      withCredentials: true,
    });

    return res;
  } catch (error) {
    console.error("Error: ", error);
  }
};

export const registerUser = async (formData) => {
  console.log(formData);

  const formData1 = new FormData();
  formData1.append("username", formData.username);
  formData1.append("fullName", formData.fullName);
  formData1.append("email", formData.email);
  formData1.append("biography", formData.biography);
  formData1.append("password", formData.password);
  formData1.append("avatar", formData.avatarFile);
  formData1.append("coverImage", formData.coverFile);

  try {
    const res = await API.post("/users/register", formData1, {
      withCredentials: true,
      headers: { "Content-Type": "multipart / form-data" },
    });

    return res;
  } catch (error) {
    throw error || "Error Registering User";
  }
};

export const logoutuser = async () => {
  try {
    const res = await API.post("/users/logout", {}, { withCredentials: true });
    return res;
  } catch (error) {
    throw error || "Error Logging Out";
  }
};

export const updateAccountDetails = async ({
  fullName,
  username,
  email,
  biography,
}) => {
  if (!(fullName || username || email || biography))
    return alert("Required Credentials");

  try {
    const res = await API.patch(
      "/users/updateAccountDetails",
      { fullName, username, email, biography },
      {
        withCredentials: true,
      }
    );

    return res;
  } catch (error) {
    throw error;
  }
};

export const changePassword = async ({ oldPassword, newPassword }) => {
  try {
    const res = await API.post(
      "/users/changePassword",
      { oldPassword, newPassword },
      { withCredentials: true }
    );
    return res;
  } catch (error) {
    throw error;
  }
};

export const updateAvatar = async ({ avatarFile }) => {
  const formdata = new FormData();
  formdata.append("avatar", avatarFile);
  try {
    const res = await API.patch("/users/updateUserAvatar", formdata, {
      withCredentials: true,
      headers: { "Content-Type": "multipart / form-data" },
    });

    return res;
  } catch (error) {
    throw error;
  }
};

export const updateCoverImage = async ({ coverImage }) => {
  const formData = new FormData();
  formData.append("coverImage", coverImage);

  try {
    const res = await API.patch("/users/updateUserCoverImage", formData, {
      withCredentials: true,
      headers: { "Content-type": "multipart / form-data" },
    });
    return res;
  } catch (error) {
    throw error;
  }
};

export const removeAvatar = async () => {
  try {
    const res = await API.post(
      "/users/removeavatar",
      {},
      { withCredentials: true }
    );
    return res;
  } catch (error) {
    throw error;
  }
};

export const removeCoverImage = async () => {
  try {
    const res = await API.post(
      "/users/removecoverimage",
      {},
      {
        withCredentials: true,
      }
    );
  } catch (error) {
    throw error;
  }
};

export const getUserChannelDetails = async (channelname) => {
  try {
    const res = await API.get(`/users/c/${channelname}`);

    return res?.data?.data || null;
  } catch (error) {
    throw error;
  }
};

export const sendOtp = async ({ username, email }) => {
  try {
    const res = await API.post("/users/send-otp", { username, email });
    return res;
  } catch (error) {
    throw error;
  }
};

export const verifyRegistrationOTP = async ({ username, otp }) => {
  return await API.post("/users/verify-registration-otp", { username, otp });
};

export const verifyForgotPasswordOTP = async ({ username, otp }) => {
  return await API.post("/users/verify-reset-password-otp", { username, otp });
};

export const verifyEmail = async ({ email }) => {
  return await API.post("/users/verify-email", { email });
};

export const resetPassword = async ({ email, newPassword }) => {
  return await API.post("users/reset-password", { email, newPassword });
};
