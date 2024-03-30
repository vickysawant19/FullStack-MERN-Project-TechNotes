import React from "react";
import { selectAllUsers, useGetUsersQuery } from "./usersApiSlice";
import { useSelector } from "react-redux";

import User from "./User";

const Users = () => {
  const { data, isLoading, error } = useGetUsersQuery();

  const users = useSelector(selectAllUsers);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center w-full min-h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="w-full  p-2 max-w-screen-xl mx-auto min-h-screen">
      {users && users.map((user) => <User key={user.id} userId={user.id} />)}
    </div>
  );
};

export default Users;
