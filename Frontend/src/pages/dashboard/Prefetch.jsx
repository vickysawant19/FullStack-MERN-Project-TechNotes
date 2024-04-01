import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { notesApiSlice } from "../../features/notes/notesApiSlice";
import { store } from "../../app/store";
import { usersApiSlice } from "../../features/users/usersApiSlice";

const Prefetch = () => {
  useEffect(() => {
    console.log("subscribing");
    const notes = store.dispatch(notesApiSlice.endpoints.getNotes.initiate());

    const users = store.dispatch(usersApiSlice.endpoints.getUsers.initiate());

    return () => {
      console.log("unsubscribe");
      notes.unsubscribe();
      users.unsubscribe();
    };
  }, []);
  return <Outlet />;
};

export default Prefetch;
