import { useContext, useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../auth/AuthenProvider";

function PriveRouter() {
  const tokenExpiration = localStorage.getItem("tokenExpiration")
  let isLoggedIn;
  const userRole = localStorage.getItem("userRole")
  const auth = useContext(AuthContext)
  const now = new Date().getTime();
  if (now > tokenExpiration) {
    auth.handleLogout()
    isLoggedIn = ""
  } else {
    isLoggedIn = localStorage.getItem("token")
  }
  return (
    <>
      {(isLoggedIn && userRole != "ROLE_USER") ? (<Outlet />) : (<Navigate to="/login" />)}
    </>
  )
}
export default PriveRouter;