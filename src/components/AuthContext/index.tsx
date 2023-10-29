import React, { ReactNode, useState } from "react";
import { logout } from "../../helper/apiRequest";

const enum AUTH_KEYS {
  TOKEN = "TOKEN",
}

const getAuthToken = () => {
  return localStorage.getItem(AUTH_KEYS.TOKEN);
};

const initialValues: AuthContextValue = {
  isAuthenticated: false,
  setAuthToken: (_: string) => {},
  getAuthToken,
  resetToken: async () => {},
};
export const AuthContext = React.createContext<AuthContextValue>(initialValues);

export const AuthContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const resetToken = async () => {
    localStorage.clear();
    setIsAuthenticated(false);
    try {
      await logout();
    } catch {}
  };
  const setAuthToken = (token: string) => {
    localStorage.setItem(AUTH_KEYS.TOKEN, token);
    setIsAuthenticated(true);
  };
  const [isAuthenticated, setIsAuthenticated] = useState(!!getAuthToken());

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setAuthToken,
        resetToken,
        getAuthToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
