import { Navigate, Outlet } from "react-router-dom";

const GuestGuard = () => {
  const token = localStorage.getItem("token");

  console.log("Token in guest guard --> ", token);

  if (token) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default GuestGuard;
