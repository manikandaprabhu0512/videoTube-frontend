import { useQuery } from "@tanstack/react-query";
import { getUserWatchHistory } from "../../Api/users.js";
import Loader from "../Loader";
import WatchHistoryCard from "../Cards/WatchHistoryCard";
import { useGetUserWatchHistory } from "../hooks/useUser.js";

function WatchHistory() {
  const { data: videos, isLoading } = useGetUserWatchHistory();

  if (isLoading) return <Loader isLoading={true} />;

  return (
    <div className="pl-5 md:pl-0">
      <h1 className="text-3xl font-bold ml-3 mb-3">Watch History</h1>
      <hr className="m-2"></hr>
      <div className="">
        {videos.data.data.map((video) => (
          <div key={video._id}>
            <WatchHistoryCard
              url={video.thumbnail.url}
              title={video.title}
              duration={video.duration}
              username={video.owner.username}
              views={video.views}
              createdAt={video.createdAt}
              _id={video._id}
              avatar={video.owner.avatar.url}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default WatchHistory;
