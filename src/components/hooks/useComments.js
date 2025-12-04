import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addVideoComments, getVideoComments } from "../../Api/comment";

export const useGetVideoComments = (videoid) => {
  return useQuery({
    queryKey: ["videoComments", videoid],
    queryFn: () => getVideoComments(videoid),
  });
};

export const useAddVideoComment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ videoid, content }) =>
      addVideoComments({ videoid, content }),
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ["videoComments"] });
    },
  });
};
