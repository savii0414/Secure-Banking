import { useState } from "react";
import { SessionContext } from "../context/SessionContext";

const SessionProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const login = (userData) => {
    setIsLoggedIn(true);
    setUser(userData);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <SessionContext.Provider
      value={{ isLoggedIn, user, login, logout }}
    >
      {children}
    </SessionContext.Provider>
  );
};

export default SessionProvider;
