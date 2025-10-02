import React from "react";
import Header from "../components/Header/Header";
import UploadSideBar from "../components/SideBar/UploadSideBar";
import { Outlet } from "react-router-dom";

function UploadLayout() {
  return (
    <div>
      <Header />
      <div className="flex">
        <div>
          <UploadSideBar />
        </div>
        <div className="w-full p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default UploadLayout;
