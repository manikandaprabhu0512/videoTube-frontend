import React from "react";
import { Outlet } from "react-router-dom";
// import { Header, HomeSideBar } from "../components";
import Header from "../components/Header/Header";
import HomeSideBar from "../components/SideBar/HomeSideBar";

function VideoGramLayout() {
  return (
    <div>
      <Header />
      <div>
        <div>{/* <HomeSideBar /> */}</div>
        <div>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default VideoGramLayout;
