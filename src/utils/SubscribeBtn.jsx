import React, { useEffect, useState } from "react";
import {
  useSubscribeChannel,
  useUnsubscribeChannel,
} from "../components/hooks/useSubscription";

function SubscribeBtn({ channelId, user, subscribers }) {
  const [channelSubscribed, setChannelSubscribed] = useState(false);

  const { mutate: subscribeChannel } = useSubscribeChannel();

  const { mutate: unsubscribeChannel } = useUnsubscribeChannel();

  const handleSubscribe = () => {
    if (channelSubscribed) {
      unsubscribeChannel(
        { id: channelId },
        {
          onSuccess: () => {
            setChannelSubscribed(false);
          },
        }
      );
    } else {
      subscribeChannel(
        { id: channelId },
        {
          onSuccess: () => {
            setChannelSubscribed(true);
          },
          onError: () => {
            alert("Failed to Subscribe to the Channel");
          },
        }
      );
    }
  };

  useEffect(() => {
    subscribers?.map((subscriber) => {
      if (subscriber?.username === user?.username) {
        setChannelSubscribed(true);
      }
    });
  }, [subscribers]);

  return (
    <div>
      <button
        type="button"
        className={`w-18 sm:w-20 md:w-24 p-1 sm:p-1.5 text-xs sm:text-sm rounded-full shadow active:scale-95 transition-all mt-2 cursor-pointer ${
          channelId === user?._id ? "hidden" : ""
        } ${
          channelSubscribed
            ? "text-black bg-white dark:text-white dark:bg-gray-800"
            : "text-white bg-gray-800 dark:text-black dark:bg-white"
        }`}
        onClick={handleSubscribe}
      >
        <span className="text-center">
          {channelSubscribed ? "Subscribed" : "Subscribe"}
        </span>
      </button>
    </div>
  );
}

export default SubscribeBtn;
