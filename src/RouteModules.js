import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Registration from "./components/registration/Registration"
import Login from "./components/login/Login"
import Dashboard from "./components/dashboard/Dashboard"
import NotesContainer from "./components/note/NotesContainer"
import ArchiveContainer from "./components/archiveNote/ArchiveNote"
import TrashContainer from "./components/trashNote/TrashNote"

// routes for login and registeration
const router = createBrowserRouter([
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "registration",
    element: <Registration />,
  },{
    path: "dashboard", // Dashboard parent container
    element: <Dashboard />,
    children: [
      {
        path: "notes",
        element: <NotesContainer />, // Notes child route
      },
      {
        path: "archive",
        element: <ArchiveContainer />, // Archive child route
      },
      {
        path: "trash",
        element: <TrashContainer />, // Trash child route
      },
    ],
  },
]);

// Export the RouterProvider 
const RouteModules = () => {
  return <RouterProvider router={router} />;
};

export default RouteModules;
