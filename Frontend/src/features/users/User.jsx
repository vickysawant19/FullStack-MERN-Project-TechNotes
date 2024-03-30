import React from "react";
import { useSelector } from "react-redux";
import { selectUserById } from "./usersApiSlice";
import { useNavigate } from "react-router-dom";

const User = ({ userId }) => {
  const user = useSelector((state) => selectUserById(state, userId));
  const navigate = useNavigate();
  if (user) {
    const handleEdit = (userId) => navigate(`/dash/users/${userId}`);
    const userRolesString = user.roles.toString().replaceAll(",", ", ");
    const cellStatus = user.active ? "" : "Not Active";

    return (
      <>
        <div
          key={user.id}
          className=" flex w-full border items-center justify-between  rounded  p-4 "
        >
          <div className="flex items-center gap-4">
            <div className="size-20 bg-orange-600 rounded-full flex items-center justify-center"></div>

            <div className="text-xl text-slate-700 font-semibold">
              {user.username}
              <div className="text-sm">
                {user.roles.map((role, index) => (
                  <p key={index}>{role + " "}</p>
                ))}
              </div>
            </div>
          </div>
          <div></div>
          <div className="font-semibold">
            {user.active ? "Active" : "Not Active"}
          </div>
          <button
            onClick={() => handleEdit(user.id)}
            className="text-red-600 font-bold border bg-gray-300 p-2 rounded-xl hover:text-red-800 hover:bg-white"
          >
            Edit
          </button>
        </div>
      </>
    );
  } else {
    return null;
  }
};

export default User;
