import React, { useState } from "react";
import { verify2FA } from "../service/authApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const VerifyAuthenticatorForm = () => {
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleVerify = async () => {
    if (!token) {
      toast.error("Enter the 6-digit code");
      return;
    }

    try {
      setLoading(true);
      await verify2FA(token);
      toast.success("MFA enabled successfully");
      navigate("/dashboard");
    } catch {
      toast.error("Invalid authentication code");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-10 rounded-3xl shadow-xl w-full max-w-md">
      <h2 className="text-2xl font-semibold text-center mb-6">
        Verify Authenticator Code
      </h2>

      <input
        type="text"
        placeholder="Enter 6-digit code"
        value={token}
        onChange={(e) => setToken(e.target.value)}
        className="w-full px-4 py-3 border rounded-lg mb-4"
      />

      <button
        onClick={handleVerify}
        disabled={loading}
        className="w-full bg-green-600 text-white py-3 rounded-xl hover:bg-green-700 disabled:opacity-50"
      >
        {loading ? "Verifying..." : "Verify"}
      </button>
    </div>
  );
};

export default VerifyAuthenticatorForm;
