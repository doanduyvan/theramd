import { createBrowserRouter } from "react-router-dom";
import { PATHS } from "./paths";
import ProtectedRoute from "./ProtectedRoute";
import GuestRoute from "./GuestRoute";

import MainLayout from "@/layouts/MainLayout";
import AuthLayout from "@/layouts/AuthLayout";

import { LoginPage, ForgotPasswordPage } from "@/features/auth/pages";
import { Products } from "@/features/products/pages";
import { Orders } from "@/features/orders/pages";

import { QRScan } from "@/features/scanner/pages";

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
          {
            path: PATHS.PRODUCTS,
            element: <Products />,
          },
          {
            path: PATHS.ORDERS,
            element: <Orders />,
          },
          {
            path: "orders/:orderId/qr-scan",
            element: <QRScan />,
          },
        ],
      },
    ],
  },

  {
    element: <GuestRoute />,
    children: [
      {
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
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);
