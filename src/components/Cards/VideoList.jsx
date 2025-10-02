import { timesAgo } from "../../utils/timesago.js";

function VideoList({ url, title, duration, createdAt, views, description }) {
  return (
    <>
      <div className="flex flex-col sm:flex-row gap-3 m-3">
        <div className="relative w-full sm:w-1/3 max-w-sm aspect-[16/9] bg-gray-200 dark:bg-gray-700 rounded-md overflow-hidden">
          <img
            src={url || "/rectangle-32.png"}
            alt="thumbnail"
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-1 right-1 flex h-5 px-2 items-center justify-center rounded-full bg-black/80">
            <p className="text-xs text-white">{duration}</p>
          </div>
        </div>

        <div className="flex flex-col justify-start gap-1 text-gray-800 dark:text-gray-200 sm:flex-1">
          <span className="text-lg sm:text-xl font-semibold">{title}</span>
          <span className="text-sm text-gray-500">
            {views} views • {timesAgo(createdAt)}
          </span>
          <span className="text-sm sm:text-base">
            {description.split(" ").slice(0, 10).join(" ")}
            {description.split(" ").length > 10 ? "..." : ""}
          </span>
        </div>
      </div>
    </>
  );
}

export default VideoList;
