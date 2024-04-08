import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { clearAuthToken, selectToken } from "../../features/auth/authSlice";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutUserMutation } from "../../features/auth/authApiSlice.js";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth.js";
const Navbar = () => {
  const [isLogin, setIsLogin] = useState(false);
  const { pathname } = useLocation();
  const token = useSelector(selectToken);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { username, status, isManager, isAdmin } = useAuth();

  const [logoutUser, { isLoading }] = useLogoutUserMutation();

  const [isMenu, setIsMenu] = useState(false);

  const handleMenu = () => {
    setIsMenu((prev) => !prev);
  };

  useEffect(() => {
    if (token) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, [token]);

  const handleLogout = () => {
    logoutUser();
    dispatch(clearAuthToken());
    setIsMenu(false);
    navigate("/");
  };

  const navContentDash = (
    <div className="flex items-center  ">
      <Link
        to={"dash"}
        className=" hover:border-b-2 p-2 hover:border-red-700 font-sans hover:text-gray-600 text-slate-900 font-semibold "
      >
        Home
      </Link>
      {(isManager || isAdmin) && (
        <Link
          to={"dash/users"}
          className="hover:border-b-2 hover:border-red-700 p-2  font-sans hover:text-gray-600 text-slate-900 font-semibold "
        >
          Users
        </Link>
      )}
      <Link
        to={"dash/notes"}
        className=" border-b-2 hover:border-red-700 p-2  font-sans hover:text-gray-600 text-slate-900 font-semibold "
      >
        Notes
      </Link>
      <button
        onClick={handleMenu}
        className="flex rounded-full size-10 bg-red-100 border border-slate-900 text-2xl items-center justify-center "
      >
        👤
      </button>
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
    <div className="max-w-screen-xl container mx-auto w-full relative">
      <div className="flex justify-between w-full p-1">
        <Link to={"/"} className="text-xl font-bold m-2 text-gray-800">
          <span className="bg-orange-500 py-1 pl-1 text-slate-300">Tech</span>
          Note
        </Link>

        {isLogin ? navContentDash : navContentLogin}
      </div>
      <div
        className={`${
          isMenu ? "" : "scale-0"
        } absolute w-1/2 top-14 origin-top-right duration-300 transition-transform right-0 bg-orange-200 h-20 p-4 flex justify-between items-center rounded-xl shadow-xl `}
      >
        <div className="">
          <h1 className="text-red-900 font-bold">Welcome, {username}</h1>
          <p className="text-gray-700 font-semibold"> Roles - {status}</p>
        </div>
        <div>
          <button
            className=" border-2 rounded-xl shadow-lg p-2 hover:bg-red-700 bg-red-600 text-white font-semibold"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
