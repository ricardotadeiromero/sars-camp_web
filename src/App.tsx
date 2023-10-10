import { BrowserRouter } from "react-router-dom"
import AppRoutes from "./routes"
import AuthProvider from "./context/auth"

function App() {

  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes/>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
