import React from "react";
import { Header, UploadSideBar } from "../components";
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
