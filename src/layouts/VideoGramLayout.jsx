import React from "react";
import { Outlet } from "react-router-dom";
import { Header, HomeSideBar } from "../components";

function VideoGramLayout() {
  return (
    <div>
      <Header />
      <div className="flex">
        <div>
          <HomeSideBar />
        </div>
        <div className="w-full p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default VideoGramLayout;
