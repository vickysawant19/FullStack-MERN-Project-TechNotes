import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import PulseLoader from "react-spinners/PulseLoader";

import { useForm } from "react-hook-form";
import {
  selectUserById,
  useAddUserMutation,
  useGetUsersQuery,
  useUpdateUserMutation,
} from "./usersApiSlice";

const UserForm = () => {
  const { id } = useParams();
  const [errorMessage, setErrorMessage] = useState(""); // State to store the error message

  const user = useSelector((state) => selectUserById(state, id));

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (user) {
      // Set default values when user object is available
      setValue("username", user.username);
      setValue("roles", user.roles);
      setValue("active", user.active);
      setValue("email", user.email);
    }
  }, [user, setValue]);

  const [
    addUser,
    {
      data: addData,
      isLoading: addLoading,
      isSuccess: addSuccess,
      error: addError,
    },
  ] = useAddUserMutation();

  const [
    updateUser,
    {
      data: updateData,
      isLoading: updateLoading,
      isSuccess: updateSuccess,
      isError: updateIsError,
      error: updateError,
    },
  ] = useUpdateUserMutation();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    data.active = data.active === "true";
    setErrorMessage("");
    try {
      console.log(data);
      if (!user) {
        const result = await addUser(data);

        if (result.error) {
          setErrorMessage(result.error.data.message); // Set the error message
        }

        if (result.data) {
          navigate("/dash/users");
        }
      } else {
        const newData = { ...data, _id: user.id };
        const result = await updateUser(newData);
        if (result.error) {
          setErrorMessage(result.error.data.error);
        }

        if (result.data) {
          navigate("/dash/users");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (addLoading || updateLoading)
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <PulseLoader />
      </div>
    );

  return (
    <div className="w-full flex justify-center mt-10 min-h-screen max-w-screen-md mx-auto">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col w-full mx-4"
        action=""
      >
        {/* Display the error message at the top of the form */}
        {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
        <label className="text-slate-600 font-semibold mb-1" htmlFor="username">
          Username
        </label>
        <input
          {...register("username", {
            required: "Username required",
            minLength: 5,
            pattern: {
              value: /^[a-z0-9]+$/,
              message:
                "Username must contain only lowercase letters and numbers",
            },
          })}
          className=" p-1 
            rounded"
          type="username"
        />
        {errors.username && (
          <p className="text-red-500">{errors.username.message}</p>
        )}

        <label
          className="text-slate-600 font-semibold mb-1 mt-4"
          htmlFor="email"
        >
          Email
        </label>
        <input
          {...register("email", {
            required: "Email required",
            minLength: 5,
          })}
          className=" p-1 rounded"
          type="email"
        />
        {errors.email && (
          <p className="text-red-500 ">{errors.email.message}</p>
        )}
        <label
          className="text-slate-600 font-semibold mb-1 mt-4"
          htmlFor="title"
        >
          Password{" "}
          <span className="text-sm italic">
            {user && "(*leave blank if dont want to update password)"}
          </span>
        </label>

        <input
          {...register("password", {
            required: user ? false : "Password required",
            minLength: {
              value: 5,
              message: "Password must be at least 5 characters long",
            },
          })}
          className=" p-1   rounded"
          type="password"
        />
        {errors.password && (
          <p className="text-red-500 mb-4">{errors.password.message}</p>
        )}

        <div className="flex flex-col mt-4">
          <label className="text-slate-600 font-semibold" htmlFor="roles">
            Roles
          </label>
          <label className="inline-flex items-center mb-2">
            <input
              type="checkbox"
              {...register("roles")}
              value="admin"
              className="form-checkbox text-blue-500 focus:ring-blue-500 h-4 w-4"
            />
            <span className="ml-2">Admin</span>
          </label>
          <label className="inline-flex items-center mb-2 ">
            <input
              type="checkbox"
              {...register("roles")}
              value="manager"
              className="form-checkbox text-blue-500 focus:ring-blue-500 h-4 w-4"
            />
            <span className="ml-2">Manager</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              {...register("roles")}
              value="employee"
              className="form-checkbox text-blue-500 focus:ring-blue-500 h-4 w-4"
            />
            <span className="ml-2">Employee</span>
          </label>
        </div>
        {errors.roles && <p className="text-red-500">{errors.roles.message}</p>}

        <label className="text-slate-600 font-semibold" htmlFor="completed">
          Active
        </label>
        <select
          {...register("active", { required: true })}
          className="p-2 rounded mb-4"
        >
          <option value={true}>Active</option>
          <option value={false}>Not Active</option>
        </select>
        {errors.active && (
          <p className="text-red-500">{errors.active.message}</p>
        )}
        <button className="border hover:bg-orange-500 hover:text-white bg-orange-300 rounded p-2 mb-4">
          Save User
        </button>
      </form>
    </div>
  );
};

export default UserForm;
