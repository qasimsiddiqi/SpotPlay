import { Link, useLocation } from "react-router-dom";

const navItems = [
  {
    label: "Dashboard",
    path: "/dashboard",
    accessRole: ["SUPERADMIN", "VENDOR"],
  },
  { label: "My Arenas", path: "/arenas", accessRole: ["SUPERADMIN", "VENDOR"] },
];

const AppDrawer = () => {
  const location = useLocation();

  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user") as string)
    : null;

  return (
    <aside className="w-64 h-screen bg-white border-r border-[#ECECEC] p-5">
      <div className="mt-2">
        <h2 className="text-left">SpotPlay Logo</h2>
      </div>
      <ul className="mt-5 space-y-2">
        {navItems
          .filter((item) => item.accessRole.includes(user?.role))
          .map((item, index) => {
            const isActive = location.pathname === item.path;
            return (
              <li key={index}>
                <Link
                  to={item.path}
                  className={`w-full flex justify-start px-4 py-2 rounded-lg cursor-pointer border text-sm ${isActive ? "bg-[#f0fdf4] border-[#54c494] text-[#13803f] font-bold" : "border-[#DADADA]"}`}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
      </ul>
    </aside>
  );
};

export default AppDrawer;
