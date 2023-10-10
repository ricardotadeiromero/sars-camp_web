import {
  Route,
  Routes,
  Router,
  Navigate,
  RoutesProps,
  useNavigate,
} from "react-router-dom";
import List from "./pages/List";
import Edit from "./pages/Edit";
import Create from "./pages/Create";
import LoginPage from "./pages/Login";
import { Children, ReactNode, ReactElement, useContext } from "react";
import AuthProvider, { AuthContext } from "./context/auth";

interface PrivateProps {
  children: ReactElement;
}

export default function AppRoutes() {
  const navigate = useNavigate();
  function Private({ children }: PrivateProps) {
    const authContext = useContext(AuthContext);
    if (!authContext) throw new Error("Problema");
    const { authorized, loading } = authContext;
    if(loading) return <>Carregando...</>
    console.log(authorized);
    if (!authorized) navigate("/login");
    return <>{children}</>;
  }
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/cardapio"
          element={
            <Private>
              <List />
            </Private>
          }
        />
        <Route
          path="/cardapio/new"
          element={
            <Private>
              <Create />
            </Private>
          }
        />
        <Route
          path="/cardapio/:id"
          element={
            <Private>
              <Edit />
            </Private>
          }
        />
      </Routes>
    </AuthProvider>
  );
}
