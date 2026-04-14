import { Navigate, Outlet } from "react-router-dom";

const AuthGuard = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/auth/login" />;
  }

  return <Outlet />;
};

export default AuthGuard;
