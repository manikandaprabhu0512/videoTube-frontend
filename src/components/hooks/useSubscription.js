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
    refetchInterval: 1,
    refetchOnWindowFocus: true,
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
  return useMutation({
    mutationFn: ({ id }) => subscriberChannel({ id }),
  });
};

export const useUnsubscribeChannel = () => {
  return useMutation({
    mutationFn: ({ id }) => unsubscribeChannel({ id }),
  });
};
