import { Route, Routes, useNavigate } from "react-router-dom";
import List from "./pages/cardapio/List";
import Edit from "./pages/cardapio/Edit";
import { Box, Container } from "@mui/material";
import Create from "./pages/cardapio/Create";
import LoginPage from "./pages/Login";
import { ReactElement, useContext, useEffect, useState } from "react";
import AuthProvider, { AuthContext } from "./context/auth";
import Home from "./pages/Home";
import AchadosEPerdidosList from "./pages/achados&perdidos/List";
import ItemEdit from "./pages/achados&perdidos/Edit";
import ItemCreate from "./pages/achados&perdidos/Create";

interface PrivateProps {
  children: ReactElement;
}

export default function AppRoutes() {
  const navigate = useNavigate();

  function Private({ children }: PrivateProps) {
    const authContext = useContext(AuthContext);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      if (!authContext) throw new Error("Problema");
      const { loading, token } = authContext;
      if (!loading) {
        setLoading(false);
      }
      if (token) {
        setIsAuthenticated(true);
      }
    }, [authContext, navigate]);

    if (loading) {
      return <></>; // ou renderize um componente de carregamento
    }
    if (!isAuthenticated) {
      navigate("/login");
    }
    if (isAuthenticated) {
      return <>{children}</>;
    }
    return <></>;
  }
  return (
    <AuthProvider>
      <Container maxWidth="lg">
        <Box sx={{ my: 4 }}>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/"
              element={
                <Private>
                  <Home />
                </Private>
              }
            />
            <Route
              path="/cardapio/"
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
              path="/item"
              element={
                <Private>
                  <AchadosEPerdidosList />
                </Private>
              }
            />
            <Route
              path="/item/:id"
              element={
                <Private>
                  <Edit />
                </Private>
              }
            />
            <Route
              path="/item/new"
              element={
                <Private>
                  <ItemEdit />
                </Private>
              }
            />
            <Route
              path="/cardapio/:id"
              element={
                <Private>
                  <ItemCreate />
                </Private>
              }
            />
            
            <Route />
          </Routes>
        </Box>
      </Container>
    </AuthProvider>
  );
}
