import { useContext } from "react";
import { AuthContext } from "../AuthContext";
import { Navigate, Outlet } from "react-router-dom";

const AuthGuard: React.FC = () => {
  const { isAuthenticated } = useContext(AuthContext);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default AuthGuard;
