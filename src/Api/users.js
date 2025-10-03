import API from "./api";

export const fetchUserData = async () => {
  try {
    const res = await API.get(`/users/getCurrentUser`);

    return res.data.data;
  } catch (error) {
    throw error || null;
  }
};

export const getUserWatchHistory = async () => {
  try {
    const res = await API.get("/users/watchHistory", { withCredentials: true });

    return res;
  } catch (error) {
    console.error("Error: ", error);
  }
};

export const registerUser = async ({
  username,
  fullName,
  email,
  password,
  avatarFile,
  coverFile,
  biography,
}) => {
  console.log(avatarFile);

  const formData = new FormData();
  formData.append("username", username);
  formData.append("fullName", fullName);
  formData.append("email", email);
  formData.append("biography", biography);
  formData.append("password", password);
  formData.append("avatar", avatarFile);
  formData.append("coverImage", coverFile);

  try {
    const res = await API.post("/users/register", formData, {
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
