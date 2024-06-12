import React from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { Outlet } from "react-router-dom";
import "./Layout.css";
export default function Layout() {
  return (
    <>
      <Navbar />
      <div className="container-fluid cstLayout  ">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}
