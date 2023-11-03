import { Route, Routes, useNavigate } from "react-router-dom";
import List from "./pages/List";
import Edit from "./pages/Edit";
import { Box, Container } from "@mui/material";
import Create from "./pages/Create";
import LoginPage from "./pages/Login";
import { ReactElement, useContext } from "react";
import AuthProvider, { AuthContext } from "./context/auth";
import { useCookies } from "react-cookie";
import ResponsiveAppBar from "./components/AppBar";

interface PrivateProps {
  children: ReactElement;
}

export default function AppRoutes() {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(["access_token"]);
  function Private({ children }: PrivateProps) {
    const authContext = useContext(AuthContext);
    if (!authContext) throw new Error("Problema");
    const { loading } = authContext;
    if (loading) return <>Carregando...</>;
    if (!cookies["access_token"]) {
      navigate("/login");
    }
    return <>{children}</>;
  }
  return (
    <AuthProvider>
      {cookies.access_token ? <ResponsiveAppBar /> : <></>}
      <Container maxWidth="lg">
        <Box sx={{ my: 4 }}>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/"
              element={
                <Private>
                  <List />
                </Private>
              }
            />
            <Route
              path="/new"
              element={
                <Private>
                  <Create />
                </Private>
              }
            />
            <Route
              path="/:id"
              element={
                <Private>
                  <Edit />
                </Private>
              }
            />
          </Routes>
        </Box>
      </Container>
    </AuthProvider>
  );
}
