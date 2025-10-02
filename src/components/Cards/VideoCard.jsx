import React from "react";
import { Link } from "react-router-dom";
import { timesAgo } from "../../utils/timesago.js";

function VideoCard({
  url,
  title,
  duration,
  username,
  views,
  createdAt,
  _id,
  avatar,
}) {
  return (
    <Link to={`/watch/${_id}`}>
      <div className="p-2 bg-white rounded-lg w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg dark:bg-[#0f0f0f]">
        <div className="relative w-full aspect-video bg-gray-200 dark:bg-gray-700 rounded-md overflow-hidden">
          <img
            className="w-full h-full object-cover"
            src={url || "/rectangle-32.png"}
            alt="thumbnail"
          />
          <div className="absolute bottom-1 right-1 flex h-5 px-2 items-center justify-center rounded-full bg-black/80">
            <p className="text-xs text-white">{duration}</p>
          </div>
        </div>
        <div className="flex mt-2">
          <div className="relative mr-2">
            <img
              className="h-8 w-8 rounded-full"
              src={avatar}
              alt="userImage2"
            />
          </div>
          <div>
            <p className="text-gray-900 text-lg font-semibold dark:text-white">
              {title}
            </p>
            <p className="text-gray-500 text-sm dark:text-gray-100 opacity-70">
              {username}
            </p>
            <div className="flex">
              <p className="text-gray-500 text-sm dark:text-gray-100 opacity-70">
                {views} views
              </p>
              <p className="text-gray-500 text-sm ml-2 dark:text-gray-100 opacity-70">
                {timesAgo(createdAt)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default VideoCard;
