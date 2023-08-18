import React from "react";
import { Navigate } from "react-router-dom";
function Protected({ children }) {
  const token = localStorage.getItem("token");
const username = localStorage.getItem('username');

  if ( !token && !username) {
    return <Navigate to="/" replace />;
  }
  return children;
}

export default Protected;