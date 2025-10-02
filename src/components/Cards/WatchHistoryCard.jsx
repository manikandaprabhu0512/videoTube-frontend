import React from "react";
import { Link } from "react-router-dom";
import { timesAgo } from "../../utils/timesago.js";

function WatchHistoryCard({
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
      <div className="p-2 bg-white rounded-lg w-full max-w-2xl dark:bg-[#0f0f0f]">
        <div className="flex gap-3">
          {/* Thumbnail */}
          <div className="relative w-48 aspect-video bg-gray-200 dark:bg-gray-700 rounded-md overflow-hidden">
            <img
              className="w-full h-full object-cover"
              src={url || "/rectangle-32.png"}
              alt="thumbnail"
            />
            <div className="absolute bottom-1 right-1 flex h-5 px-2 items-center justify-center rounded-full bg-black/80">
              <p className="text-xs text-white">{duration}</p>
            </div>
          </div>

          {/* Video info */}
          <div className="flex flex-col flex-1">
            <p className="text-gray-900 text-base font-semibold line-clamp-2 dark:text-white">
              {title}
            </p>
            <p className="text-gray-500 text-sm dark:text-gray-300">
              {username}
            </p>

            <div className="flex text-xs text-gray-500 dark:text-gray-300 space-x-2 mt-1">
              <span>{views} views</span>
              <span>•</span>
              <span>{timesAgo(createdAt)}</span>
            </div>

            {/* Avatar */}
            <div className="flex items-center mt-2">
              <span className="text-sm text-gray-700 dark:text-gray-300">
                {username}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default WatchHistoryCard;
