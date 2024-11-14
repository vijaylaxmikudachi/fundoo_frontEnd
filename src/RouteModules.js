import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Registration from "./components/registration/registration";
import Login from "./components/login/login";

// routes for login and registeration
const router = createBrowserRouter([
  {
    path: "/",
    element: <Registration />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

// Export the RouterProvider 
const RouteModules = () => {
  return <RouterProvider router={router} />;
};

export default RouteModules;
