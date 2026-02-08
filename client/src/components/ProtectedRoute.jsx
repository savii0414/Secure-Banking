import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSession } from "../context/SessionContext";

const ProtectedRoute = () => {
  const { IsLoggedIn, loading } = useSession();

  // If not logged in, redirect to login

  if(loading){
    return <div>Loading....</div>
  }
  if (!IsLoggedIn) {
    return <Navigate to="/login" replace/>;
  }

  // Render the protected child routes
  return <Outlet />;
};

export default ProtectedRoute;
