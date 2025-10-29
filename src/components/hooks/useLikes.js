import { useMutation, useQuery } from "@tanstack/react-query";
import { getVideoLikes, toggleVideoLikes } from "../../Api/likes";

export const useGetVideoLikes = (videoid) => {
  return useQuery({
    queryKey: ["videoLikes", videoid],
    queryFn: () => getVideoLikes(videoid),
  });
};

export const useToggleVideoLikes = () => {
  return useMutation({
    mutationFn: (videoid) => toggleVideoLikes(videoid),
  });
};
