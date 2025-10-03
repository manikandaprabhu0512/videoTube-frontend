import { useQuery } from "@tanstack/react-query";
import { fetchSubscribers } from "../../Api/subcribption.js";

export const useChannelSubscriber = ({ id }) => {
  return useQuery({
    queryKey: ["channelSubscriber"],
    queryFn: () => fetchSubscribers({ id }),
  });
};
