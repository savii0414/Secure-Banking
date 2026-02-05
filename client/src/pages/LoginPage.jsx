import React from "react";
import LoginForm from "../components/LoginForm";
import { useNavigate } from "react-router-dom";
import { useSession } from "../context/SessionContext";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useSession();

  const handleLoginSuccess = (userData) => {
    login(userData);

    // Redirect to OTP verification page
    if (userData?.username) {
      navigate("/verify-login-otp", {
        state: { username: userData.username },
      });
    }
  };
  return <LoginForm onLoginSuccess={handleLoginSuccess} />;
};

export default LoginPage;
