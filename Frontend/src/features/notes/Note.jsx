import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import {
  selectNoteById,
  useDeleteNoteMutation,
  useGetNotesQuery,
} from "./notesApiSlice";
import { selectUserById } from "../users/usersApiSlice";
import { Link, useNavigate } from "react-router-dom";

const Note = ({ noteId }) => {
  const { data } = useGetNotesQuery();
  const note = useSelector((state) => selectNoteById(state, noteId));
  const user = useSelector((state) => selectUserById(state, note.user));
  const navigate = useNavigate();
  const [deleteNote, { isLoading: deleteLoading }] = useDeleteNoteMutation();

  useEffect(() => {}, [deleteNote]);

  const handleDelete = async () => {
    await deleteNote({ _id: note.id });
  };

  if (!note) {
    return null;
  } else {
    const handleEdit = () => navigate(`/dash/notes/${note.id}`);
    return (
      <>
        <tr key={note.id}>
          <td className="border border-gray-400 px-4 py-2">{note.ticket}</td>

          <td className="border border-gray-400 px-4 py-2 ">{note.title}</td>

          <td className="border border-gray-400 px-4 py-2 hidden md:table-cell ">
            {note.text}
          </td>

          <td className="border border-gray-400 px-4 py-2">
            {note.completed ? "Completed" : "Not Completed"}
          </td>

          <td className="border border-gray-400 px-4 py-2">
            {new Date(note.createdAt).toLocaleString()}
          </td>

          <td className="border border-gray-400 px-4 py-2 hidden md:table-cell   ">
            {user ? user?.username : "No user"}
          </td>
          <td className="border border-gray-400 px-4 py-2 flex flex-col gap-2 items-center">
            <Link
              to={`edit/${note._id}`}
              className="text-green-600 font-bold border bg-gray-300 p-2 rounded-xl hover:text-green-100 hover:bg-green-800"
            >
              Edit
            </Link>
            <button
              onClick={handleDelete}
              className="text-red-600 font-bold border bg-gray-300 p-2 rounded-xl hover:text-red-100 hover:bg-red-800"
            >
              Delete
            </button>
          </td>
        </tr>
      </>
    );
  }
};

export default Note;
