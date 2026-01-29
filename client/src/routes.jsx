import { createBrowserRouter } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Error from "./pages/Error";
import HomePage from "./pages/HomePage";
import SetupAuthenticator from "./pages/SetupAuthenticator";
import VerifyAuthenticator from "./pages/VerifyAuthenticator";
import VerifyOtp from "./components/VerifyOtpForm";
import ProtectedRoute from "./components/ProtectedRoute";

const router = createBrowserRouter([
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
    element: <ProtectedRoute />,
    children: [
      {
        path: "/",
        element: <HomePage />,
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
