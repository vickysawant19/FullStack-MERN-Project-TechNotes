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
import Prefetch from "./pages/dashboard/Prefetch.jsx";
import PersistLogin from "./features/auth/PersistLogin.jsx";

import { ROLES } from "./config/roles.js";
import RequireAuth from "./features/auth/RequireAuth.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="" element={<Layout />}>
      <Route index element={<App />} />
      {/* public route */}
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Signup />} />
      {/* Protected Route */}
      <Route element={<PersistLogin />}>
        <Route
          element={<RequireAuth allowedRoles={[...Object.values(ROLES)]} />}
        >
          <Route element={<Prefetch />}>
            <Route path="dash" element={<DashLayout />}>
              <Route index element={<DashHome />} />
              <Route
                element={
                  <RequireAuth allowedRoles={[ROLES.Manager, ROLES.Admin]} />
                }
              >
                <Route path="users">
                  <Route index element={<Users />} />
                  <Route path="new" element={<UserForm />} />
                  <Route path="edit/:id" element={<UserForm />} />
                </Route>
              </Route>

              <Route path="notes">
                <Route index element={<Notes />} />
                <Route path="new" element={<NoteForm />} />
                <Route path="edit/:id" element={<NoteForm />} />
              </Route>
            </Route>
          </Route>
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
