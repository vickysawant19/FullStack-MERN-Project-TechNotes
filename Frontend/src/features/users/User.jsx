import React from "react";
import { useSelector } from "react-redux";
import { selectUserById, useDeleteUserMutation } from "./usersApiSlice";
import { Link, useNavigate } from "react-router-dom";

const User = ({ userId }) => {
  const user = useSelector((state) => selectUserById(state, userId));
  const navigate = useNavigate();
  const [deleteUser, { isError, isLoading }] = useDeleteUserMutation();

  if (!user) {
    return null;
  }

  const handledelete = async () => {
    const data = await deleteUser({ _id: user.id }).unwrap();
    console.log(data);
  };

  const handleEdit = (userId) => navigate(`/dash/users/${userId}`);
  const userRolesString = user.roles.toString().replaceAll(",", ", ");
  const cellStatus = user.active ? "" : "Not Active";

  return (
    <>
      <tr key={user.id} className="border-b border-slate-500">
        <td className="p-4">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 bg-violet-700 rounded-full"></div>
            <div className="text-xl text-slate-900 font-semibold">
              <h1 className="text-md">{user.username}</h1>
              <h2 className="text-sm">{user.email}</h2>
              <div className="text-sm text-slate-600 flex gap-2">
                {user.roles.map((role, index) => (
                  <p
                    className="border px-2 py-1 mt-1 rounded-xl bg-green-300"
                    key={index}
                  >
                    {role}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </td>
        <td className="p-4  ">
          <div className="font-semibold">
            {user.active ? "Active" : "Not Active"}
          </div>
        </td>
        <td className="p-4 flex items-center justify-center">
          <Link
            to={`/dash/users/edit/${user.id}`}
            onClick={() => handleEdit(user.id)}
            className="text-green-600 font-bold border bg-gray-300 p-2 rounded-xl hover:text-green-800 hover:bg-white"
          >
            Edit
          </Link>
          <button
            onClick={handledelete}
            className="text-red-600 font-bold border bg-gray-300 p-2 rounded-xl hover:text-red-800 hover:bg-white ml-4"
          >
            Delete
          </button>
        </td>
      </tr>
    </>
  );
};

export default User;
