import { createContext, useContext, useState } from "react";

// Context anlegen
const AuthContext = createContext();

// Provider-Komponente
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // null = nicht eingeloggt

  const login = (username) => {
    setUser({ name: username }); // Beispiel: einfacher Login
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom Hook (für einfacheren Zugriff)
export function useAuth() {
  return useContext(AuthContext);
}
