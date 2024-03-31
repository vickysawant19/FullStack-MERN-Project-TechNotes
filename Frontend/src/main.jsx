import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {
  Route,
  Router,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Layout from "./pages/public/Layout.jsx";
import { Provider } from "react-redux";

import Login from "./pages/public/Login.jsx";
import Signup from "./pages/public/Signup.jsx";
import DashLayout from "./pages/dashboard/DashLayout.jsx";
import DashHome from "./pages/dashboard/DashHome.jsx";
import Notes from "./features/notes/Notes.jsx";
import { store } from "./app/store.js";

import NoteForm from "./features/notes/NoteForm.jsx";
import Users from "./features/users/Users.jsx";

import UserForm from "./features/users/UserForm.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="" element={<Layout />}>
      <Route index element={<App />} />
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Signup />} />
      <Route path="dash" element={<DashLayout />}>
        <Route index element={<DashHome />} />

        <Route path="users">
          <Route index element={<Users />} />
          <Route path="new" element={<UserForm />} />
          <Route path="edit/:id" element={<UserForm />} />
        </Route>

        <Route path="notes">
          <Route index element={<Notes />} />
          <Route path="new" element={<NoteForm />} />
          <Route path="edit/:id" element={<NoteForm />} />
        </Route>
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
