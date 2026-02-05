import { createBrowserRouter } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Error from "./pages/Error";
import HomePage from "./pages/HomePage";
import SetupAuthenticator from "./pages/SetupAuthenticator";
import VerifyAuthenticator from "./pages/VerifyAuthenticator";
import ProtectedRoute from "./components/ProtectedRoute";
import VerifyOtp from "./components/VerifyOtpForm";
import VerifyLoginOtpForm from "./components/VerifyLoginOtpForm";
import ForgotPasswordForm from "./components/ForgotPasswordForm";
import ResetPasswordForm from "./components/ResetPasswordForm";
import Dashboard from "./pages/Dashboard";

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
    element: <VerifyLoginOtpForm />,
    errorElement: <Error />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPasswordForm />,
    errorElement: <Error />,
  },
  {
    path: "/reset-password/:token",
    element: <ResetPasswordForm />,
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
    ],
  },
]);

export default router;
