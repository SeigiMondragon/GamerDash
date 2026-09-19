import React from "react";
import { Outlet } from "react-router-dom";
const Authlayout = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Outlet />
    </div>
  );
};

export default Authlayout;
