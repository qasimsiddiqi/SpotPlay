import { Navigate, type RouteObject } from "react-router-dom";
import GuestGuard from "../guards/GuestGuard";
import AuthLayout from "../components/layouts/authLayout/AuthLayout";
import AuthGuard from "../guards/AuthGuard";
import MainLayout from "../components/layouts/mianLayout/MainLayout";
import LoginPage from "../pages/auth/Login";
import RegisterPage from "../pages/auth/Register";
import MyArenasPage from "../pages/my-arenas/MyArenasPage";
import DashboardPage from "../pages/dashboard/DashboardPage";

const routes: RouteObject[] = [
  {
    element: <GuestGuard />,
    children: [
      {
        path: "auth",
        element: <AuthLayout />,
        children: [
          {
            path: "login",
            element: <LoginPage />,
          },
          {
            path: "register",
            element: <RegisterPage />,
          },
        ],
      },
    ],
  },
  {
    path: "/",
    element: <AuthGuard />,
    children: [
      {
        element: <MainLayout />,
        children: [
          {
            index: true,
            path: "/dashboard",
            element: <Navigate to={"/dashboard"} replace />,
          },
          {
            path: "dashboard",
            element: <DashboardPage />,
          },
          {
            path: "arenas",
            element: <MyArenasPage />,
          },
        ],
      },
    ],
  },
];

export default routes;
