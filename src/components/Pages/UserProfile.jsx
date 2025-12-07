import React, { useEffect, useState } from "react";
import { useCurrentUser, useUserChannelDetails } from "../hooks/useUser.js";
import Header from "../Header/Header.jsx";
import { Link, useParams } from "react-router-dom";
import Loader from "../Loader.jsx";
import {
  useChannelSubscribed,
  useChannelSubscriber,
} from "../hooks/useSubscription.js";
import { usefetchAllVideosByUser } from "../hooks/useVideo.js";
import { timesAgo } from "../../utils/timesago.js";
import SubscribeBtn from "../../utils/SubscribeBtn.jsx";
// import { handleSubscribe } from "../../utils/SubscribeFtn.jsx";

function UserProfile() {
  const { channelname } = useParams();

  const { data: user, isLoading: loadingUserDetails } = useCurrentUser();

  const { data: channel, isLoading: useUserChannelDetailsLoading } =
    useUserChannelDetails(channelname);

  const { data: subscribers, isLoading: fetchSubscriber } =
    useChannelSubscriber({ id: channel?._id });

  const { data: subscribed, isLoading: fetchSubscribed } = useChannelSubscribed(
    { id: channel?._id }
  );

  const { data: uservideos, isLoading: fetchingUserVideo } =
    usefetchAllVideosByUser(channel?.username);

  const isAnyLoading =
    useUserChannelDetailsLoading ||
    fetchSubscriber ||
    fetchSubscribed ||
    fetchingUserVideo;

  if (isAnyLoading) {
    return <Loader isLoading={true} />;
  }

  return (
    <div>
      <Header />
      <div className="relative w-full px-4 sm:px-6 lg:px-10 pt-3">
        <img
          className="w-full aspect-[16/5] sm:aspect-[16/6] md:aspect-[16/4] lg:aspect-[16/3] object-cover rounded-lg"
          src={channel.coverImage.url || "/samplecoverimage.png"}
          alt="cover image"
        />

        <div className="flex flex-col gap-4 p-4 sm:p-6 rounded-xl ">
          <div className="flex items-center gap-4">
            {/* Avatar */}
            <div className="flex-shrink-0">
              <img
                className="h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 lg:h-28 lg:w-28 rounded-full border-4 object-cover"
                src={channel.avatar.url || "/dummy-avatar.png"}
                alt="avatar"
              />
            </div>

            {/* Text Content */}
            <div className="flex flex-col gap-1 sm:gap-2">
              <p className="text-xl sm:text-2xl md:text-3xl font-bold">
                {channel.fullName}
              </p>
              <p className="text-xs sm:text-sm md:text-md text-gray-500 dark:text-gray-400">
                @{channelname} • {subscribers?.length} subscribers •{" "}
                {subscribed?.length} subscribed • {uservideos?.length} videos
              </p>
              <p className="text-sm sm:text-base md:text-lg text-gray-700 dark:text-gray-300">
                {channel.biography ||
                  "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Excepturi aperiam sint aliquam vero nemo veniam, vel nisi dolorum dolor aspernatur. Vero odio deserunt eligendi veniam labore illum quidem itaque quibusdam."}
              </p>
              <SubscribeBtn
                channelId={channel?._id}
                user={user}
                subscribers={subscribers}
              />
            </div>
          </div>
        </div>

        <div>Videos</div>
        <div className="flex space-x-4 overflow-x-auto px-5 py-2 scrollbar-hide">
          {uservideos.map((video) => (
            <div
              key={video._id}
              className="flex-shrink-0 w-64 sm:w-56 md:w-60 lg:w-64"
            >
              <Link to={`/watch/${video._id}`} className="block">
                <div className="flex flex-col">
                  {/* Thumbnail */}
                  <div className="aspect-video w-full rounded-md overflow-hidden">
                    <img
                      src={video.thumbnail.url}
                      alt={video.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Video info */}
                  <div className="mt-2 flex flex-col gap-1">
                    <p className="text-sm font-semibold line-clamp-2">
                      {video.title}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1">
                      {video.views} views • {timesAgo(video.createdAt)}
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-20"></div>
    </div>
  );
}

export default UserProfile;
