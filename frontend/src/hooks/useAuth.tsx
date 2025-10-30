import React, { createContext, useContext, useState } from "react";

export type User = { id: string; email: string } | null;

const AuthContext = createContext<{ user: User; setUser: (u: User) => void }>({ user: null, setUser: () => {} });

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

  const [user, setUser] = useState<User>(null);

  const setUserAndLog = (u: User) => {
    setUser(u);
  };
  
  return <AuthContext.Provider value={{ user, setUser: setUserAndLog }}>{children}</AuthContext.Provider>;

};

export const useAuth = () => useContext(AuthContext);