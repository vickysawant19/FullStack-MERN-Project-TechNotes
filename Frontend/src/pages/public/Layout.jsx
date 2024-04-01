import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const Layout = () => {
  return (
    <div className="w-full ">
      <div className="w-full h-full from-slate-300 to-slate-100 bg-gradient-to-br">
        <Navbar />
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;