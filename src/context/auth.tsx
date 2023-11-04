import { ReactNode, createContext, useState, useEffect } from "react";
import { User } from "../model/User";
import { createSession } from "../services/api";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { set } from "date-fns";
import ResponsiveAppBar from "../components/AppBar";

// Defina o tipo do valor padrão para o contexto (no seu caso, um objeto vazio)
interface AuthContextType {
  user: string | null;
  token: string | null;
  loading: boolean;
  login: (user: User) => void;
  logout: () => void;
  error: string;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

interface AuthProviderProps {
  children: ReactNode;
}
export default function AuthProvider({ children }: AuthProviderProps) {
  const navigate = useNavigate();
  const [error, setError] = useState<string>("");
  const [cookies, setCookie] = useCookies(["access_token"]);
  const [user, setUser] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  async function login(user: User) {
    if (!cookies.access_token) {
      setLoading(true);
      setTimeout(async () => {
        try {
          const response = await createSession(user);
          setUser(user.username);
          localStorage.setItem("user", user.username);
          setToken(response);
          if (response) {
            navigate("/");
          }
        } catch (error) {
          setError("Usuário e/ou senha inválidos!");
        } finally {
          setLoading(false); // Defina loading como false após a conclusão
        }
      }, 2000);
    }
  }

  useEffect(() => {
    const userStorage: string = localStorage.getItem("user")!;
    console.log("fon");
    setUser(userStorage);
    setToken(cookies.access_token);
    setLoading(false);
  }, []);

  function logout() {
    localStorage.removeItem("user");
    setCookie("access_token", "", { path: "/" });
    setToken(null);
    setUser(null);
  }

  const authContextValue: AuthContextType = {
    error,
    user,
    token,
    loading,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      <>
        {token ? <ResponsiveAppBar /> : <></>}
        {children}
      </>
    </AuthContext.Provider>
  );
}
