import React from "react";
import { useSelector } from "react-redux";
import {
  selectUserById,
  useGetUsersQuery,
} from "../../features/users/usersApiSlice";

const NoteCard = ({ note }) => {
  const { data } = useGetUsersQuery();
  const user = useSelector((state) => selectUserById(state, note.user));

  return (
    <section className="mr-3  border rounded-xl  min-h-fit bg-gradient-to-tl from-slate-50 to-slate-100 p-2 h-full">
      <div className="flex  items-center gap-2">
        <div className="size-10 bg-red-500 rounded-full"></div>
        <div className="">
          <div>{user ? user?.username : "Unknown"}</div>
          <h3 className="text-sm text-nowrap font-semibold text-slate-500 ">
            {new Date().toLocaleString()}
          </h3>
        </div>
      </div>
      <div className="font-semibold mt-2 p-1">{note.title}</div>
      <div className="min-h-44 p-1 mt-2">{note.text}</div>
    </section>
  );
};

export default NoteCard;
