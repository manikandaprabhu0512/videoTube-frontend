import React from "react";
import { Header } from "../components";
import CreaterSideBar from "../components/SideBar/CreaterSideBar";
import { Outlet } from "react-router-dom";

function CreaterLayout() {
  return (
    <div>
      <Header />
      <div className="flex">
        <div>
          <CreaterSideBar />
        </div>
        <div className="w-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default CreaterLayout;
