import React from "react";
import { Outlet } from "react-router-dom";
// import { Header, HomeSideBar } from "../components";
import Header from "../components/Header/Header";
import HomeSideBar from "../components/SideBar/HomeSideBar";
import Sidebar from "../components/SideBar/Testing";
import { useSelector } from "react-redux";

function VideoGramLayout() {
  const Open = useSelector((state) => state.sidebar.visible);

  return (
    <div className="flex flex-col h-screen">
      <div className="fixed top-0 left-0 right-0 z-50 ">
        <Header />
      </div>
      <div className="flex pt-20 h-full">
        <div className="fixed z-10 h-full overflow-y-auto">
          {/* <Sidebar /> */}
        </div>
        <div
          className={`flex-1 ${Open ? "sm:p-3" : "md:ml-30 lg:ml-50 xl:ml-58"}`}
        >
          <Outlet />
        </div>
      </div>
      {/* <div className="mt-10 sm:hidden"></div> */}
    </div>
  );
}

export default VideoGramLayout;
