import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import {
  changePassword,
  fetchUserData,
  logoutuser,
  removeAvatar,
  removeCoverImage,
  updateAccountDetails,
  updateAvatar,
  updateCoverImage,
} from "../../Api/users";
import { useDispatch } from "react-redux";
import { showPopup } from "../../features/popup";
const queryClient = new QueryClient();

export const useCurrentUser = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: fetchUserData,
    enabled: !!localStorage.getItem("auth"),
    retry: false,
  });
};

export const userlogout = () => {
  const dispatch = useDispatch();
  return useMutation({
    mutationFn: logoutuser,
    onSuccess: async () => {
      localStorage.removeItem("auth");
      localStorage.removeItem("theme");

      queryClient.clear();

      window.location.href = "/";

      dispatch(
        showPopup({
          component: "Successful_Popup",
          props: {
            isOpen: true,
            message: "🗑️ Logged Out!!",
          },
        })
      );
    },
    onError: () => {
      alert("Failed Logout");
    },
  });
};

export const updateUserDetails = () => {
  return useMutation({
    mutationFn: ({ fullName, username, email, biography }) =>
      updateAccountDetails({ fullName, username, email, biography }),
  });
};

export const useChangeUserPassword = () => {
  return useMutation({
    mutationFn: ({ oldPassword, newPassword }) =>
      changePassword({ oldPassword, newPassword }),
  });
};

export const useUpdateAvatar = () => {
  return useMutation({
    mutationFn: ({ avatarFile }) => updateAvatar({ avatarFile }),
  });
};

export const useUpdateCoverImage = () => {
  return useMutation({
    mutationFn: ({ coverImageFile }) =>
      updateCoverImage({ coverImage: coverImageFile }),
  });
};

export const useRemoveAvatar = () => {
  return useMutation({
    mutationFn: removeAvatar,
  });
};

export const useRemoveCoverImage = () => {
  return useMutation({
    mutationFn: removeCoverImage,
  });
};
