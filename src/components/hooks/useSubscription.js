import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  fetchSubscribered,
  fetchSubscribers,
  subscriberChannel,
  unsubscribeChannel,
} from "../../Api/subcribption.js";

export const useChannelSubscriber = ({ id }) => {
  return useQuery({
    queryKey: ["channelSubscriber"],
    queryFn: () => fetchSubscribers({ id }),
    enabled: !!id,
  });
};

export const useChannelSubscribed = ({ id }) => {
  return useQuery({
    queryKey: ["channelSubscribed", id],
    queryFn: () => fetchSubscribered({ id }),
    enabled: !!id,
  });
};

export const useSubscribeChannel = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id }) => subscriberChannel({ id }),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["channelSubscriber"] });
      queryClient.invalidateQueries({ queryKey: ["channelSubscribed"] });
    },
  });
};

export const useUnsubscribeChannel = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id }) => unsubscribeChannel({ id }),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["channelSubscriber"] });
      queryClient.invalidateQueries({ queryKey: ["channelSubscribed"] });
    },
  });
};
