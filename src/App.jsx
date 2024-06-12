import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import Home from "./Components/Home/Home";
import SignUp from "./Components/Register/SignUp";
import Login from "./Components/Register/Login";
import NotFound from "./Components/NotFound/NotFound";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "Home", element: <Home /> },
      { index: true, element: <SignUp /> },
      { path: "SignUp", element: <SignUp /> },
      { path: "Login", element: <Login /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

export default function App() {
  return (
    <>
      <RouterProvider router={routes} />
    </>
  );
}
