import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getVideoLikes, toggleVideoLikes } from "../../Api/likes";

export const useGetVideoLikes = (videoid) => {
  return useQuery({
    queryKey: ["videoLikes", videoid],
    queryFn: () => getVideoLikes(videoid),
    refetchInterval: 1000,
  });
};

export const useToggleVideoLikes = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (videoid) => toggleVideoLikes(videoid),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["videoLikes"] });
    },
  });
};
