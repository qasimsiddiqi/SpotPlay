import { Outlet } from "react-router-dom";

const MainLayout = () => (
  <div>
    <span className="bg-green-300 font-bold">Main Layout</span>
    <Outlet />
  </div>
);

export default MainLayout;
