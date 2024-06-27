import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import "./Layout.css"; // Import the CSS file

export default function Layout() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState(null);

  return (
    <div className="layout">
      <Navbar setSearchQuery={setSearchQuery} />

      <div className="content">
        <Outlet context={{ searchQuery, setSearchResults, searchResults }} />
      </div>

      <Footer />
    </div>
  );
}
