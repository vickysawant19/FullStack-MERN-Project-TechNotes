import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [isLogin, setIsLogin] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    setIsLogin(false);
  }, [pathname]);

  const navContentDash = (
    <div className="flex items-center gap-4 ">
      <Link
        to={"dash"}
        className=" hover:border-b-2 hover:border-red-700 pb-2 font-sans hover:text-gray-600 text-slate-900 font-semibold "
      >
        Home
      </Link>
      <Link
        to={"dash/users"}
        className="hover:border-b-2 hover:border-red-700 pb-2  font-sans hover:text-gray-600 text-slate-900 font-semibold "
      >
        Users
      </Link>
      <Link
        to={"dash/notes"}
        className=" border-b-2 hover:border-red-700 pb-2  font-sans hover:text-gray-600 text-slate-900 font-semibold "
      >
        Notes
      </Link>
    </div>
  );

  const navContentLogin = (
    <div className=" flex gap-2 ">
      <Link
        className="hover:text-gray-300 hover:bg-slate-600 text-slate-900 font-semibold   border p-2 rounded-e-lg rounded-b-lg"
        to={"login"}
      >
        Login
      </Link>
      <Link
        className="hover:text-gray-800 hover:bg-orange-400 bg-orange-500  text-slate-300 font-semibold border p-2 rounded-e-lg rounded-b-lg"
        to={"signup"}
      >
        Signup
      </Link>
    </div>
  );
  return (
    <div className="max-w-screen-xl container mx-auto p-4 flex justify-between">
      <Link to={"/"} className="text-xl font-bold text-gray-800">
        <span className="bg-orange-500 py-1 pl-1 text-slate-300">Tech</span>Note
      </Link>

      {isLogin ? navContentDash : navContentLogin}
    </div>
  );
};

export default Navbar;
