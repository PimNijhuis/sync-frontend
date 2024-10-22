import { useState } from "react";

export const useAuth = () => {
  const [user, setUser] = useState(null);

  const login = (userId) => {
    setUser(userId);
  };

  const logout = () => {
    setUser(null);
  };

  return {
    user,
    login,
    logout,
  };
};
