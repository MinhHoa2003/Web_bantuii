import React, { Children, createContext, useContext, useState } from "react";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext({
  user: "abc",
  handleLogin : (token) => {},
  handleLogout : () => {}
})
export const AuthProvider = (props) => {
  const { children } = props;
  const [user, setUser] = useState(null);

  const handleLogin = (token) => {
    const expirationTime = new Date().getTime() + 3600000;
    const decodedToken = jwtDecode(token);
    localStorage.setItem("userId", decodedToken.sub);
    localStorage.setItem("userRole", decodedToken.roles);
    localStorage.setItem("token", token);
    localStorage.setItem("tokenExpiration", expirationTime);
    setUser(decodedToken);
  }

  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("userRole");
    localStorage.removeItem("token");
    localStorage.removeItem("tokenExpiration");
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{user, handleLogin, handleLogout}}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
	return useContext(AuthContext);
}