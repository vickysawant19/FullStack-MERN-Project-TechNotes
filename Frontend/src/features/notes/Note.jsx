import React from "react";
import { useSelector } from "react-redux";
import { selectNoteById } from "./notesApiSlice";
import { selectUserById } from "../users/usersApiSlice";
import { useNavigate } from "react-router-dom";

const Note = ({ noteId }) => {
  const note = useSelector((state) => selectNoteById(state, noteId));
  const user = useSelector((state) => selectUserById(state, note.user));
  const navigate = useNavigate();

  if (!note) {
    return null;
  } else {
    const handleEdit = () => navigate(`/dash/notes/${note.id}`);
    return (
      <>
        <tr key={note.id}>
          <td className="border border-gray-400 px-4 py-2">{note.ticket}</td>
          <td className="border border-gray-400 px-4 py-2">{note.title}</td>
          <td className="border border-gray-400 px-4 py-2">{note.text}</td>
          <td className="border border-gray-400 px-4 py-2">
            {note.completed ? "Completed" : "Not Completed"}
          </td>
          <td className="border border-gray-400 px-4 py-2">
            {new Date(note.createdAt).toLocaleString()}
          </td>
          <td className="border border-gray-400 px-4 py-2">
            {user ? user?.username : "No user"}
          </td>
          <td className="border border-gray-400 px-4 py-2">
            <button
              onClick={handleEdit}
              className="text-red-600 font-bold border bg-gray-300 p-2 rounded-xl hover:text-red-800 hover:bg-white"
            >
              Edit
            </button>
          </td>
        </tr>
      </>
    );
  }
};

export default Note;
