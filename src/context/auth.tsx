import { Children, ReactNode, createContext, useState } from "react";
import React from 'react';
import { Aluno } from "../model/Aluno";
import { createSession } from "../services/api";

// Defina o tipo do valor padrão para o contexto (no seu caso, um objeto vazio)
interface AuthContextType {
  authorized: boolean,
  user: Aluno | null;
  login: (aluno: Aluno) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>(undefined);

interface AuthProviderProps {
  children: ReactNode
}
export default function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<Aluno | null>(null);
  const [authorized, setAuthorized] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);

  async function login(aluno: Aluno) {
    const response = await createSession(aluno)
    setAuthorized(response);
  }

  function logout() {
    // Lógica de logout aqui
  }

  const authContextValue: AuthContextType = {
    authorized,
    user,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
}
