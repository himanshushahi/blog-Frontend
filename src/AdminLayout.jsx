import React from "react";
import Navbar from "./adminComponents/Navbar";

function AdminLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}

export default AdminLayout;
