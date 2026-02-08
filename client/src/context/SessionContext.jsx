/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";

const SessionContext = createContext();

export const useSession = () => useContext(SessionContext);

export const SessionProvider = ({ children }) => {
  const [IsLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(sessionStorage.getItem("user"));
    if(storedUser){
      setUser(storedUser);
      setIsLoggedIn(true);
    }
    setLoading(false);
  },[]);

  const login = (userData) => {
    setIsLoggedIn(true);
    setUser(userData);
    sessionStorage.setItem("user", JSON.stringify(userData));
  };
  const logout = (data) => {
    if (data) {
      setIsLoggedIn(false);
      setUser(null);
      sessionStorage.removeItem("user");
    }
  };
  return (
    <SessionContext.Provider value={{ IsLoggedIn, loading, user, login, logout }}>
      {children}
    </SessionContext.Provider>
  );
};
