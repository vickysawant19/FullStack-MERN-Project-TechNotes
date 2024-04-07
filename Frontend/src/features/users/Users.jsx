import React from "react";
import { selectAllUsers, useGetUsersQuery } from "./usersApiSlice";
import { useSelector } from "react-redux";

import User from "./User";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Users = () => {
  const { data, isLoading, error } = useGetUsersQuery(undefined, {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  const users = useSelector(selectAllUsers);
  const { isAdmin, isManager } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center w-full min-h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="w-full max-w-screen-xl mx-auto min-h-screen">
      <div className="w-full flex justify-end">
        {(isManager || isAdmin) && (
          <Link
            to={"new"}
            className="border hover:border-orange-900 text-slate-100 hover:text-orange-900 hover:bg-slate-100 font-semibold bg-orange-400 p-2 rounded m-1"
          >
            New User+
          </Link>
        )}
      </div>
      <table className="w-full ">
        <thead>
          <tr className="bg-slate-400 ">
            <th className="p-4">User</th>
            <th className="p-4">Status</th>
            <th className="p-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.map((user) => <User key={user.id} userId={user.id} />)}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
