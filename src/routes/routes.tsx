import { createBrowserRouter } from "react-router-dom";
import AppLayout from "../layouts/AppLayout";
import AuthLayout from "../layouts/AuthLayout";
import Home from "../pages/home/Home";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import VerifyOTP from "../pages/auth/VerifyOTP";
import PrivateRoute from "./PrivateRoute";

// Layout and Pages
import DashboardLayout from "../pages/user/DashboardLayout";
import Profile from "../pages/user/Profile";
import Notifications from "../pages/notification/Notifications";
import Cart from "../pages/cart/Cart";
import Checkout from "../pages/checkout/Checkout";
import UserOrders from "../pages/user/UserOrders";
import ChangePassword from "../pages/user/ChangePassword";
import OrderSuccess from "../pages/order/OrderSuccess";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/user",
        element: (
          <PrivateRoute>
            <DashboardLayout />
          </PrivateRoute>
        ),
        children: [
          {
            index: true, 
            element: <Profile />,
          },
          {
            path: "orders/list",
            element: <UserOrders />,
          },
          {
            path: "change-password",
            element: <ChangePassword />,
          },
        ],
      },
      {
        path: "/user/notifications",
        element: (
          <PrivateRoute>
            <Notifications />
          </PrivateRoute>
        ),
      },
      {
        path: "/order/status",
        element: (
          <PrivateRoute>
            <OrderSuccess />
          </PrivateRoute>
        ),
      },
      {
        path: "/carts",
        element: <Cart />,
      },
      {
        path: "/checkout",
        element: <Checkout />,
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "verify-otp",
        element: <VerifyOTP />,
      },
    ],
  },
]);

export default router;
