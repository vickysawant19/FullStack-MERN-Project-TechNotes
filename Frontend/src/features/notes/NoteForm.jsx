import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  selectNoteById,
  useAddNoteMutation,
  useGetNotesQuery,
  useUpdateNoteMutation,
} from "./notesApiSlice";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import { selectAllUsers } from "../users/usersApiSlice";

const NoteForm = () => {
  const { id } = useParams();

  const note = useSelector((state) => selectNoteById(state, id));
  const { userid } = useAuth();

  const [errorMessage, setErrorMessage] = useState(""); // State to store the error message

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: note ? note.title : "",
      text: note ? note.text : "",
      completed: note ? note.completed : "",
    },
  });

  const [
    addNote,
    { data: addData, isLoading: addLoading, isSuccess: addSuccess },
  ] = useAddNoteMutation();
  const [
    updateNote,
    { data: updateData, isLoading: updateLoading, isSuccess: updateSuccess },
  ] = useUpdateNoteMutation();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    data.completed = data.completed === "true";
    setErrorMessage("");
    try {
      if (!note) {
        const newData = { ...data, user: userid };
        const result = await addNote(newData);
        if (result.error) {
          setErrorMessage(result.error.data.message); // Set the error message
        }

        if (result.data) {
          navigate("/dash/notes");
        }
      } else {
        const newData = {
          ...data,
          _id: note.id,
          completed: Boolean(data.completed),
        };

        const result = await updateNote(newData);

        if (result.error) {
          setErrorMessage(result.error.data.message); // Set the error message
        }
        if (result.data) {
          navigate("/dash/notes");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full flex justify-center mt-10 min-h-screen max-w-screen-md mx-auto">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col w-full mx-4"
        action=""
      >
        {/* Display the error message at the top of the form */}
        {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}

        <label className="text-slate-600 font-semibold" htmlFor="title">
          Title
        </label>
        <input
          {...register("title", { required: true, minLength: 10 })}
          name="title"
          className={`p-1 mb-4 rounded ${errors.title ? "border-red-500" : ""}`}
          type="text"
        />
        {errors.title && (
          <p className="text-red-500 mb-2">
            {errors.title.type === "required"
              ? "Title is required"
              : "Title must be at least 10 characters long"}
          </p>
        )}

        <label className="text-slate-600 font-semibold" htmlFor="text">
          Text
        </label>
        <textarea
          {...register("text", { required: true, minLength: 10 })}
          name="text"
          rows={"3"}
          className={`p-1 mb-4 rounded ${errors.text ? "border-red-500" : ""}`}
          type="text"
        />
        {errors.text && (
          <p className="text-red-500 mb-2">
            {errors.text.type === "required"
              ? "Text is required"
              : "Text must be at least 10 characters long"}
          </p>
        )}

        <label className="text-slate-600 font-semibold" htmlFor="completed">
          Status
        </label>
        <select
          {...register("completed", { required: true })}
          className={`p-2 rounded mb-4 ${
            errors.completed ? "border-red-500" : ""
          }`}
          name="completed"
          id=""
        >
          <option value={false}>Open</option>
          <option value={true}>Completed</option>
        </select>
        {errors.completed && (
          <p className="text-red-500 mb-2">Status is required</p>
        )}

        <button className="border hover:bg-orange-500 hover:text-white bg-orange-300 rounded p-2 mb-4">
          Save Note
        </button>
      </form>
    </div>
  );
};

export default NoteForm;
