import { Children, ReactNode, createContext, useState, useEffect } from "react";
import React from "react";
import { User } from "../model/User";
import { createSession } from "../services/api";
import { useNavigate } from "react-router-dom";

// Defina o tipo do valor padrão para o contexto (no seu caso, um objeto vazio)
interface AuthContextType {
  authorized: string | null;
  user: User | null;
  loading: boolean;
  login: (user: User) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

interface AuthProviderProps {
  children: ReactNode;
}
export default function AuthProvider({ children }: AuthProviderProps) {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [authorized, setAuthorized] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  async function login(user: User) {
    if (!localStorage.getItem("authorized")) {
      setLoading(true);
      setTimeout(async () => {
        try {
          const response = await createSession(user);
          setAuthorized(response);
          localStorage.setItem("authorized", response);
          setUser(user);
          localStorage.setItem("user", JSON.stringify(user));
          // O redirecionamento ocorre após o login bem-sucedido
          if (response) {
            navigate("/");
          }
        } catch (error) {
          // Trate erros de login, se necessário
        } finally {
          setLoading(false); // Defina loading como false após a conclusão
        }
      }, 2000);
    }
  }

  useEffect(() => {
    setTimeout(() => {
      setAuthorized(localStorage.getItem("authorized"));
      const userStorage: User = JSON.parse(localStorage.getItem("user")!);
      setUser(userStorage);
      setLoading(false);
    }, 800);
  }, []);
  function logout() {
    localStorage.removeItem("authorized");
    localStorage.removeItem("user");
    setAuthorized(null);
    setUser(null);
  }

  const authContextValue: AuthContextType = {
    authorized,
    user,
    loading,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
}
