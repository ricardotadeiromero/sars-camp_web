import { Route, Routes, Router } from "react-router-dom";
import List from "./pages/List";
import Edit from "./pages/Edit";
import Create from "./pages/Create";
import LoginPage from "./pages/Login";

export default function AppRoutes() {
  return (
    <Routes>
      <Route index element={<LoginPage />} />
      <Route path="/cardapio" element={<List />} />
      <Route path="/cardapio/new" element={<Create />} />
      <Route path="/cardapio/:id" element={<Edit />} />
    </Routes>
  );
}
