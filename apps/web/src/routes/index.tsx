import type { RouteObject } from "react-router-dom";
import GuestGuard from "../guards/GuestGuard";
import AuthLayout from "../components/layouts/AuthLayout";
import AuthGuard from "../guards/AuthGuard";
import MainLayout from "../components/layouts/MainLayout";
import LoginPage from "../pages/auth/Login";

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
        ],
      },
    ],
  },
  {
    path: "/",
    element: <AuthGuard />,
    children: [
      {
        index: true,
        element: <MainLayout />,
      },
    ],
  },
];

export default routes;
