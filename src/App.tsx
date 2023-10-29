import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./AppRoutes";
import NavBar from "./components/NavBar/indes";
import { AuthContextProvider } from "./components/AuthContext";

function App() {
  return (
    <div className="d-flex flex-column h-100 w-100">
      <AuthContextProvider>
        <BrowserRouter>
          <NavBar />
          <AppRoutes />
        </BrowserRouter>
      </AuthContextProvider>
      <ToastContainer position="bottom-right" />
    </div>
  );
}

export default App;
