import { Outlet, Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useRefreshUserMutation } from "./authApiSlice.js.js";
import usePersist from "../../hooks/usePersist.js";
import { useSelector } from "react-redux";
import { selectToken } from "./authSlice.js";

import React from "react";

const PersistLogin = () => {
  const [persist] = usePersist();

  const token = useSelector(selectToken);
  const effectRan = useRef(false);

  const [trueSuccess, setTrueSuccess] = useState(false);

  const [
    refreshUser,
    { isSuccess, isLoading, isUninitialized, isError, error },
  ] = useRefreshUserMutation();

  useEffect(() => {
    if (effectRan.current === true || process.env.NODE_ENV !== "development") {
      const verifyRefreshToken = async () => {
        console.log("verifying refresh token");
        try {
          // const res =
          await refreshUser();
          // const { accsessToken } = res?.data;
          setTrueSuccess(true);
        } catch (error) {
          console.error(error);
        }
      };
      if (!token && persist) verifyRefreshToken();
    }

    return () => (effectRan.current = true);
  }, []);

  let content;

  if (!persist) {
    console.log("no persist");
    content = <Outlet />;
  } else if (isLoading) {
    console.log("loading...");
    content = <p>loading...</p>;
  } else if (isError) {
    console.log("error");
    content = (
      <p className="text-red-500 min-h-screen text-center flex flex-col">
        {error.data?.message}
        <Link
          className="underline text-blue-400 underline-offset-2 font-semibold"
          to={"/login"}
        >
          Please login again ↗️
        </Link>
      </p>
    );
  } else if (isSuccess && trueSuccess) {
    console.log("success");
    content = <Outlet />;
  } else if (token && isUninitialized) {
    console.log("token and uninit");
    console.log(isUninitialized);
    content = <Outlet />;
  }
  return content;
};

export default PersistLogin;
