import React, { useRef } from "react";
import { Outlet } from "react-router-dom";
// import { Header, HomeSideBar } from "../components";
import Header from "../components/Header/Header";
import Sidebar from "../components/SideBar/Testing";
import { useSelector } from "react-redux";
import BannerPopup from "../components/Popup/BannerPopup";

function VideoGramLayout() {
  const Open = useSelector((state) => state.sidebar.visible);

  return (
    <div className="flex h-screen flex-col">
      <div className="sticky top-0 z-40 bg-white">
        <BannerPopup />
        <Header />
      </div>

      <div className="flex flex-1 overflow-hidden">
        <aside
          className={`sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto z-100`}
        >
          <Sidebar />
        </aside>

        <main className={`flex-1 overflow-y-auto p-3`}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default VideoGramLayout;
