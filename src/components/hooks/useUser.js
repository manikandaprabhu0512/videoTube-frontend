import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import {
  changePassword,
  fetchUserData,
  getUserChannelDetails,
  getUserWatchHistory,
  logoutuser,
  removeAvatar,
  removeCoverImage,
  updateAccountDetails,
  updateAvatar,
  updateCoverImage,
} from "../../Api/users";
import { useDispatch } from "react-redux";
import { showPopup } from "../../features/popup";
import { addWatchHistory } from "../../Api/videos";
const queryClient = new QueryClient();

export const useNewTokens = () => {
  return useMutation({
    mutationFn: generateNewTokens,
  });
};

export const useCurrentUser = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: fetchUserData,
    enabled: !!localStorage.getItem("auth"),
  });
};

export const useUserChannelDetails = (channelname) => {
  return useQuery({
    queryKey: ["channel", channelname],
    queryFn: () => getUserChannelDetails(channelname),
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

export const useGetUserWatchHistory = () => {
  return useQuery({
    queryKey: ["watchHistory"],
    queryFn: getUserWatchHistory,
  });
};

export const useAddUserWatchHistory = () => {
  return useMutation({
    mutationKey: ["addWatchHistory"],
    mutationFn: addWatchHistory,
  });
};
