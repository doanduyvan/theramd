import { createBrowserRouter } from "react-router-dom";
import { PATHS } from "./paths";
import ProtectedRoute from "./ProtectedRoute";

import MainLayout from "@/layouts/MainLayout";
import AuthLayout from "@/layouts/AuthLayout";

import { LoginPage, ForgotPasswordPage } from "@/features/auth/pages";

import DashboardPage from "@/features/dashboard/pages/DashboardPage";
import NotFoundPage from "@/pages/NotFoundPage";

const Home = () => <div>home</div>;

export const router = createBrowserRouter([
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/",
        element: <MainLayout />,
        errorElement: <NotFoundPage />,
        children: [
          {
            index: true,
            element: <Home />,
          },
          {
            path: PATHS.DASHBOARD,
            element: <DashboardPage />,
          },
        ],
      },
    ],
  },

  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        path: PATHS.LOGIN,
        element: <LoginPage />,
      },
      {
        path: PATHS.FORGOTPASSWORD,
        element: <ForgotPasswordPage />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);
