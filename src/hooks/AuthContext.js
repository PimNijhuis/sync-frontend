import React, { createContext, useContext, useState } from "react";

// Create the Auth Context
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (userId) => {
    setUser(userId); // Set the user ID when logged in
  };

  const logout = () => {
    setUser(null); // Clear the user on logout
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the Auth context
export const useAuth = () => {
  return useContext(AuthContext);
};
