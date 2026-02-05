import { createBrowserRouter } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Error from "./pages/Error";
import HomePage from "./pages/HomePage";
import SetupAuthenticator from "./pages/SetupAuthenticator";
import VerifyAuthenticator from "./pages/VerifyAuthenticator";
import ProtectedRoute from "./components/ProtectedRoute";
import VerifyOtp from "./pages/VerifyOtp";
import VerifyLoginOtp from "./pages/VerifyLoginOtp";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Dashboard from "./pages/Dashboard";
import ResetAuthenticator from "./pages/ResetAuthenticator";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <Error />,
  },
  {
    path: "/login",
    element: <LoginPage />,
    errorElement: <Error />,
  },
  {
    path: "/verify-registration-otp",
    element: <VerifyOtp />,
    errorElement: <Error />,
  },
  {
    path: "/verify-login-otp",
    element: <VerifyLoginOtp />,
    errorElement: <Error />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
    errorElement: <Error />,
  },
  {
    path: "/reset-password/:token",
    element: <ResetPassword />,
    errorElement: <Error />,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
        errorElement: <Error />,
      },
      {
        path: "/setup-2fa",
        element: <SetupAuthenticator />,
        errorElement: <Error />,
      },
      {
        path: "/verify-2fa",
        element: <VerifyAuthenticator />,
        errorElement: <Error />,
      },
      {
        path: "/reset-2fa",
        element: <ResetAuthenticator />,
        errorElement: <Error />,
      },
    ],
  },
]);

export default router;
