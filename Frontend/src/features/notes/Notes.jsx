import React from "react";
import { selectAllNotes, useGetNotesQuery } from "./notesApiSlice";
import { useSelector } from "react-redux";

import Note from "./Note";
import { Link } from "react-router-dom";
import { useGetUserNotesQuery } from "./featuredNotesApi";
import { useGetUsersQuery } from "../users/usersApiSlice";

const Notes = () => {
  const { data } = useGetUsersQuery();
  const {
    data: notes,
    isLoading: notesLoading,
    isSuccess,
  } = useGetNotesQuery();

  if (notesLoading) {
    return (
      <div className="flex items-center justify-center w-full min-h-screen">
        Loading...
      </div>
    );
  }

  if (isSuccess) {
    const { ids } = notes;
    return (
      <div className="w-full max-w-screen-xl mx-auto min-h-screen  p-2">
        <div className="w-full flex justify-end  ">
          <Link
            to={"new"}
            className="border mb-4 bg-orange-500 text-white font-semibold rounded p-1 flex items-center justify-center"
          >
            Add Note <p className=" font-bold text-2xl">+</p>
          </Link>
        </div>
        <div className="overflow-x-auto max-h-screen">
          <table className="w-full border-collapse ">
            <thead>
              <tr>
                <th className="border border-gray-400 px-4 py-2">Ticket</th>
                <th className="border border-gray-400 px-4 py-2">Title</th>
                <th className="border border-gray-400 px-4 py-2 hidden md:table-cell">
                  Text
                </th>
                <th className="border border-gray-400 px-4 py-2">Status</th>
                <th className="border border-gray-400 px-4 py-2 ">
                  Created At
                </th>
                <th className="border border-gray-400 px-4 py-2 hidden md:table-cell  ">
                  User
                </th>

                <th className="border border-gray-400 px-4 py-2">.....</th>
              </tr>
            </thead>
            <tbody>
              {ids &&
                ids.map((noteId) => <Note key={noteId} noteId={noteId} />)}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
};

export default Notes;
