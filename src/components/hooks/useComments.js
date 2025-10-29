import { useMutation, useQuery } from "@tanstack/react-query";
import { addVideoComments, getVideoComments } from "../../Api/comment";

export const useGetVideoComments = (videoid) => {
  return useQuery({
    queryKey: ["videoComments", videoid],
    queryFn: () => getVideoComments(videoid),
  });
};

export const useAddVideoComment = () => {
  return useMutation({
    mutationFn: ({ videoid, content }) =>
      addVideoComments({ videoid, content }),
  });
};
