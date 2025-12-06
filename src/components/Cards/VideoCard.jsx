import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { timesAgo } from "../../utils/timesago.js";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";

function VideoCard({
  url,
  title,
  duration,
  channelname,
  views,
  createdAt,
  _id,
  avatar,
}) {
  const navigate = useNavigate();

  return (
    <Link to={`/watch/${_id}`}>
      <div className="sm:p-2 bg-white sm:rounded-lg w-full sm:max-w-sm md:max-w-md lg:max-w-lg dark:bg-[#0f0f0f]">
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

        <div className="flex mt-2 w-full px-2">
          <div className="relative mr-2 shrink-0">
            <img
              className="h-8 w-8 rounded-full"
              src={avatar || "/dummy-avatar.png"}
              alt="user avatar"
            />
          </div>

          <div className="w-full">
            {" "}
            <div className="flex justify-between items-center w-full">
              <p className="text-gray-900 text-lg font-semibold dark:text-white">
                {title}
              </p>
              <EllipsisVerticalIcon className="h-6 w-6 cursor-pointer flex-shrink-0" />
            </div>
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                navigate(`user/${channelname}`);
              }}
              className="text-gray-500 text-sm dark:text-gray-100 opacity-70 hover:underline"
            >
              {channelname}
            </button>
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
