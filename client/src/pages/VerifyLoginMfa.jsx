import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import VerifyLoginMfaForm from "../components/VerifyLoginMfaForm";

const VerifyLoginMfa = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const username = state?.username;

  useEffect(() => {
    if (!username) {
      navigate("/login"); // if no username in state, go back to login
    }
  }, [username, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      {username && <VerifyLoginMfaForm username={username} />}
    </div>
  );
};

export default VerifyLoginMfa;
