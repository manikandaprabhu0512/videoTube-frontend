import { useQuery } from "@tanstack/react-query";
import { getUserWatchHistory } from "../../Api/users.js";
import Loader from "../Loader";
import WatchHistoryCard from "../Cards/WatchHistoryCard";

function WatchHistory() {
  const { data: videos, isLoading } = useQuery({
    queryKey: ["watchHistory"],
    queryFn: getUserWatchHistory,
  });

  if (isLoading) return <Loader isLoading={true} />;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-3">Watch History</h1>
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
