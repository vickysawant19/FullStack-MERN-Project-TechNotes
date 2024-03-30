import React from "react";
import { selectAllNotes, useGetNotesQuery } from "./notesApiSlice";
import { useSelector } from "react-redux";

import Note from "./Note";

const Notes = () => {
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
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="border border-gray-400 px-4 py-2">Ticket</th>
              <th className="border border-gray-400 px-4 py-2">Title</th>
              <th className="border border-gray-400 px-4 py-2">Text</th>
              <th className="border border-gray-400 px-4 py-2">Status</th>
              <th className="border border-gray-400 px-4 py-2">Created At</th>
              <th className="border border-gray-400 px-4 py-2">User</th>
              <th className="border border-gray-400 px-4 py-2"></th>
            </tr>
          </thead>
          <tbody>
            {ids && ids.map((noteId) => <Note key={noteId} noteId={noteId} />)}
          </tbody>
        </table>
      </div>
    );
  }
};

export default Notes;
