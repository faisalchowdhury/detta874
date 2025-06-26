import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

const Main = () => {
  return (
    <div className="flex text-start min-h-screen">
      <div className="">
        <Sidebar />
      </div>
      <div className="flex-1 pl-[280px]">
        <div className="sticky top-0 w-full pl-[24px]  z-10 ">
          <Header />
        </div>
        <div className="p-[24px] pt-0.5">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Main;
