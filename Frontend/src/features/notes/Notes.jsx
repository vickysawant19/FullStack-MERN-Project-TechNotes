import React from "react";
import { useGetNotesQuery } from "./notesApiSlice";

import Note from "./Note";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import PulseLoader from "react-spinners/PulseLoader";
import useTitle from "../../hooks/useTitle";

const Notes = () => {
  useTitle("Notes");
  const {
    data: notes,
    isLoading: notesLoading,
    isSuccess,
  } = useGetNotesQuery(undefined, {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  const { isManager, isAdmin } = useAuth();

  if (notesLoading) {
    return (
      <div className="flex items-center justify-center w-full min-h-screen">
        <PulseLoader />
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

                {(isManager || isAdmin) && (
                  <th className="border border-gray-400 px-4 py-2">.....</th>
                )}
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
