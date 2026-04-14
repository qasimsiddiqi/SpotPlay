import { Outlet } from "react-router-dom";

const AuthLayout = () => (
  <div className="flex justify-center items-center min-h-screen bg-[#FBFAFF]">
    <div className="rounded-xl bg-white border-[#ECECEC] shadow-md p-5">
      <Outlet />
    </div>
  </div>
);

export default AuthLayout;
