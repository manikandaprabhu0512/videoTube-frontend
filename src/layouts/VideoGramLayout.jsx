import React from "react";
import { Outlet } from "react-router-dom";
// import { Header, HomeSideBar } from "../components";
import Header from "../components/Header/Header";
import HomeSideBar from "../components/SideBar/HomeSideBar";

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
