import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import { GroupsProvider } from "./contexts/GroupsContext";
import MainLayout from "./components/layout/MainLayout";
import GroupPage from "./components/pages/GroupPage";
import { TodosProvider } from "./contexts/TodosContext";
const el = document.getElementById("root");
const root = ReactDOM.createRoot(el);

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <GroupsProvider>
        <TodosProvider>
          <MainLayout />
        </TodosProvider>
      </GroupsProvider>
    ),
    children: [
      {
        index: true, // <-- match on parent, i.e. "/"
        element: <Navigate to="/groups" replace />, // <-- redirect
      },
      {
        path: "groups",
        element: <App />,
      },
      {
        path: "groups/:id/todos",
        element: <GroupPage />,
      },
    ],
  },
]);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
