import { Outlet } from "react-router-dom";
import AppDrawer from "../appDrawer/AppDrawer";

const MainLayout = () => (
  <div className="bg-[#FBFAFF] min-h-screen">
    <div className="flex flex-row">
      <div>
        <AppDrawer />
      </div>
      <div className="p-5 w-full h-full flex justify-center items-center">
        <Outlet />
      </div>
    </div>
  </div>
);

export default MainLayout;
