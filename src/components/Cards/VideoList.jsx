import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { timesAgo } from "../../utils/timesago.js";

function VideoList({
  url,
  title,
  duration,
  createdAt,
  views,
  description,
  onClickFn,
  children,
}) {
  return (
    <>
      <div className="flex flex-col sm:flex-row gap-4 p-4  rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
        {/* Thumbnail */}
        <div className="relative w-full sm:w-1/3 aspect-video rounded-md overflow-hidden flex-shrink-0">
          <img
            src={url || "/rectangle-32.png"}
            alt="thumbnail"
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
          <div className="absolute bottom-2 right-2 px-2 py-0.5 bg-black/70 rounded-full text-xs text-white font-medium">
            {duration}
          </div>
        </div>

        {/* Video Details */}
        <div className="flex flex-col justify-between sm:flex-1">
          <div>
            <div className="w-full flex justify-between">
              <h3 className="text-lg sm:text-xl font-semibold line-clamp-2 text-start">
                {title}
              </h3>
              <EllipsisVerticalIcon className="h-6 w-6 cursor-pointer flex-shrink-0" />
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 text-start">
              {views} views • {timesAgo(createdAt)}
            </p>
            {description && (
              <p className="text-sm sm:text-base text-start text-gray-700 dark:text-gray-300 mt-2 line-clamp-3">
                {description}
              </p>
            )}
          </div>
        </div>
        {children}
      </div>
    </>
  );
}

export default VideoList;
