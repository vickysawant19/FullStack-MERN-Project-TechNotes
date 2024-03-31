import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { useForm } from "react-hook-form";
import {
  selectUserById,
  useAddUserMutation,
  useGetUsersQuery,
  useUpdateUserMutation,
} from "./usersApiSlice";

const UserForm = () => {
  const { data: userData, isLoading } = useGetUsersQuery();
  const { id } = useParams();

  const user = useSelector((state) => selectUserById(state, id));
  console.log(user);
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
    { data: addData, isLoading: addLoading, isSuccess: addSuccess },
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
    try {
      if (!user) {
        const result = await addUser(data);
        if (result.error) {
          console.log(result.error);
        }

        if (result.data) {
          navigate("/dash/users");
        }
      } else {
        const newData = { ...data, _id: user.id };
        const result = await updateUser(newData);

        if (result.error) {
          console.log(result.error);
        }

        if (result.data) {
          navigate("/dash/users");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {}, [isLoading]);

  if (isLoading) {
    return null;
  }

  return (
    <div className="w-full flex justify-center mt-10 min-h-screen max-w-screen-md mx-auto">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col w-full mx-4"
        action=""
      >
        <label className="text-slate-600 font-semibold mb-1" htmlFor="username">
          Username
        </label>
        <input
          {...register("username", {
            required: true,
            minLength: 5,
            pattern: {
              value: /^[a-z0-9]+$/,
              message:
                "Username must contain only lowercase letters and numbers",
            },
          })}
          name="username"
          className=" p-1 
            rounded"
          type="username"
        />
        {errors.username && (
          <p className="text-red-500">{errors.username.message}</p>
        )}
        <>
          <label
            className="text-slate-600 font-semibold mb-1 mt-4"
            htmlFor="email"
          >
            Email
          </label>
          <input
            {...register("email", {
              required: true,
              minLength: 5,
            })}
            name="email"
            className=" p-1 mb-4  rounded"
            type="email"
          />
          <label className="text-slate-600 font-semibold mb-1" htmlFor="title">
            Password
          </label>
          <input
            {...register("password", {
              required: user ? false : true,
              minLength: 5,
            })}
            name="password"
            className=" p-1 mb-4  rounded"
            type="password"
          />
        </>

        <div className="flex flex-col">
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
          <label className="inline-flex items-center mb-2">
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

        <label className="text-slate-600 font-semibold" htmlFor="completed">
          Active
        </label>
        <select
          {...register("active", { required: true })}
          className="p-2 rounded mb-4"
          name="completed"
          id=""
        >
          <option value="true">Active</option>
          <option value="false">Not Active</option>
        </select>
        <button className="border hover:bg-orange-500 hover:text-white bg-orange-300 rounded p-2 mb-4">
          Save User
        </button>
      </form>
    </div>
  );
};

export default UserForm;
