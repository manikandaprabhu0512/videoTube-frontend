import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { showPopup } from "../../features/popup";
import {
  deleteVideo,
  fetchAllVideos,
  fetchAllVideosByUserName,
  fetchVideoById,
} from "../../Api/videos";
import { useNavigate } from "react-router-dom";

export const useFetchAllVideos = (query) => {
  return useInfiniteQuery({
    queryKey: ["videos", query],
    queryFn: ({ pageParam = 1 }) =>
      fetchAllVideos({ page: pageParam, limit: 5, query }),
    getNextPageParam: (lastPage) => {
      return lastPage.hasMore ? lastPage.nextPage : undefined;
    },
  });
};

export const usefetchAllVideosByUser = (username) => {
  return useQuery({
    queryKey: ["userVideos", username],
    queryFn: () => fetchAllVideosByUserName(username),
    enabled: !!username,
  });
};

export const usedeleteVideo = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: ({ videoId }) => deleteVideo({ videoId }),
    onSuccess: () => {
      dispatch(
        showPopup({
          component: "Successful_Popup",
          props: {
            isOpen: true,
            message: "🗑️ Video Deleted Successfully!!",
          },
        })
      );
      navigate("/");
    },
    onError: () => {
      alert("Failed");
    },
  });
};

export const useFetchVideoById = (videoid) => {
  return useQuery({
    queryKey: ["videobyid"],
    queryFn: () => fetchVideoById(videoid),
    refetchOnWindowFocus: false,
    retry: false,
  });
};
