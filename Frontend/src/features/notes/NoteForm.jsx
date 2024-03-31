import React from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  selectNoteById,
  useAddNoteMutation,
  useGetNotesQuery,
  useUpdateNoteMutation,
} from "./notesApiSlice";
import { useForm } from "react-hook-form";

const NoteForm = () => {
  const { id } = useParams();

  const note = useSelector((state) => selectNoteById(state, id));

  const { register, handleSubmit, getValues } = useForm({
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
    if (!note) {
      const newData = { ...data, user: "66099feffd301034d24eb7cf" };
      const dataa = await addNote(newData);
      if (dataa) {
        navigate("/dash/notes");
      }
    } else {
      console.log(note.id);
      const newData = { ...data, _id: note.id };
      const { data: dataa } = await updateNote(newData);
      if (dataa) {
        navigate("/dash/notes");
      }
    }
  };

  return (
    <div className="w-full flex justify-center mt-10 min-h-screen max-w-screen-md mx-auto">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col w-full mx-4"
        action=""
      >
        <label className="text-slate-600 font-semibold" htmlFor="title">
          Title
        </label>
        <input
          {...register("title", { required: true, minLength: 10 })}
          name="title"
          className=" p-1 mb-4  rounded"
          type="text"
        />
        <label className="text-slate-600 font-semibold" htmlFor="text">
          Text
        </label>
        <textarea
          {...register("text", { required: true, minLength: 10 })}
          name="text"
          rows={"3"}
          className=" p-1 mb-4  rounded"
          type="text"
        />
        <label className="text-slate-600 font-semibold" htmlFor="completed">
          Status
        </label>
        <select
          {...register("completed", { required: true })}
          className="p-2 rounded mb-4"
          name="completed"
          id=""
        >
          <option value="false">Open</option>
          <option value="true">Completed</option>
        </select>
        <button className="border hover:bg-orange-500 hover:text-white bg-orange-300 rounded p-2 mb-4">
          Save Note
        </button>
      </form>
    </div>
  );
};

export default NoteForm;
