import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useLoginUserMutation } from "../../features/auth/authApiSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { selectToken, setAuthToken } from "../../features/auth/authSlice";
import usePersist from "../../hooks/usePersist.js";
import PulseLoader from "react-spinners/PulseLoader";

const Login = () => {
  const { register, handleSubmit } = useForm({
    defaultValues: {},
  });

  const [loginUser, { data, isLoading, isSuccess, error }] =
    useLoginUserMutation();
  const [persist, setPersist] = usePersist();

  const dispatch = useDispatch();

  const tokenData = useSelector(selectToken);
  const navigate = useNavigate();

  // const { data: refreshData, error } = useRefreshUserQuery();

  const handleLogin = async (data) => {
    try {
      const authData = await loginUser(data).unwrap();
      if (authData) {
        dispatch(setAuthToken(authData));
      }
      console.log(authData);
      navigate("/dash");
    } catch (error) {
      console.log(error?.data?.message);
    }
  };

  if (isLoading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <PulseLoader />
      </div>
    );
  }

  return (
    <>
      <div className="flex mt-10 min-h-screen flex-1  flex-col justify-start px-6  lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit(handleLogin)} className="space-y-6">
            <p className="w-full text-red-600 text-center">
              {error && error.data.message}
            </p>
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Username
              </label>
              <div className="mt-2">
                <input
                  {...register("username", { required: true })}
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  required
                  className="block p-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  {...register("password", { required: true })}
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block p-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
              <label className="mt-2 flex gap-2" htmlFor="">
                <input
                  onChange={(e) => {
                    setPersist((prev) => !prev);
                  }}
                  checked={persist}
                  className=""
                  type="checkbox"
                />
                Trust this device
              </label>
            </div>
          </form>

          {/* <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?{" "}
            <Link
              to={"/signup"}
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Register
            </Link>
          </p> */}
        </div>
      </div>
    </>
  );
};

export default Login;
