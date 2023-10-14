import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes";
import AuthProvider from "./context/auth";

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
