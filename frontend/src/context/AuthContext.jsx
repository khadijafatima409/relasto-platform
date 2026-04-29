import { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

// npm install jwt-decode
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("access");
    if (token) {
      try {
        setUser(jwtDecode(token));
      } catch {
        localStorage.removeItem("access");
      }
    }
  }, []);

  const login = (access, refresh) => {
    localStorage.setItem("access", access);
    localStorage.setItem("refresh", refresh);
    setUser(jwtDecode(access));
  };

  const logout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
