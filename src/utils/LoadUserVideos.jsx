import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { fetchAllVideosByUserName } from "../Api/videos";
import VideoList from "../components/Cards/VideoList";
import Loader from "../components/Loader";

function LoadUserVideos({ isPublished, header }) {
  const user = JSON.parse(localStorage.getItem("auth"));

  const { data: videos, isLoading } = useQuery({
    queryKey: ["videobyusername"],
    queryFn: () => fetchAllVideosByUserName(user.username),
  });

  if (isLoading) return <Loader isLoading={true} />;
  if (!videos) return <p>No User Found</p>;

  return (
    <div>
      <div>
        <h1 className="text-3xl font-bold mb-3">{header}</h1>
        <hr className="m-2"></hr>
      </div>
      {videos.data.data.length === 0 ? (
        <p>No Videos Found</p>
      ) : (
        <ul>
          {videos.data.data.filter((video) => video.isPublished === isPublished)
            .length === 0 ? (
            <p className="text-gray-500 dark:text-gray-300">No videos found</p>
          ) : (
            videos.data.data
              .filter((video) => video.isPublished === isPublished)
              .map((video) => (
                <div key={video._id}>
                  <li>
                    <Link to={`/edit/${video._id}`}>
                      <VideoList
                        url={video.thumbnail.url}
                        title={video.title}
                        duration={video.duration}
                        description={video.description}
                        views={video.views}
                        createdAt={video.createdAt}
                      />
                    </Link>
                  </li>
                </div>
              ))
          )}
        </ul>
      )}
    </div>
  );
}

export default LoadUserVideos;
