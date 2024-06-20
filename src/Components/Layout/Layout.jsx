import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

export default function Layout() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState(null);

  return (
    <>
      <Navbar setSearchQuery={setSearchQuery} />
      
        <Outlet context={{ searchQuery, setSearchResults, searchResults }} />
       
      <Footer />
    </>
  );
}
