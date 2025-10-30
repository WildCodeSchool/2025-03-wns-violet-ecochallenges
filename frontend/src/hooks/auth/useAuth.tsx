import React, { createContext, useContext, useState } from "react";

type User = { id: string; email: string } | null;
const AuthContext = createContext<{ user: User; setUser: (u: User) => void }>({ user: null, setUser: () => {} });

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User>(null);
  return <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);