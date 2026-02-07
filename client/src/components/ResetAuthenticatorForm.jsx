import React, { useState } from "react";
import { reset2FA } from "../service/authApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ResetAuthenticatorForm = () => {
  const [token, settoken] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleReset = async () => {
    if (!token) {
      toast.error("Enter your authenticator code");
      return;
    }

    try {
      setLoading(true);
      await reset2FA(token);
      toast.success("MFA reset successfully. Please setup again.");
      navigate("/dashboard"); // redirect to setup MFA
    } catch {
      toast.error("Invalid code. MFA not reset.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-10 rounded-3xl shadow-xl w-full max-w-md mx-auto mt-20">
      <h2 className="text-2xl font-semibold text-center mb-6">Reset MFA</h2>

      <input
        type="text"
        placeholder="Enter 6-digit code"
        value={token}
        onChange={(e) => settoken(e.target.value)}
        className="w-full px-4 py-3 border rounded-lg mb-4"
      />

      <button
        onClick={handleReset}
        disabled={loading}
        className="w-full bg-red-600 text-white py-3 rounded-xl hover:bg-red-700 disabled:opacity-50"
      >
        {loading ? "Verifying..." : "Reset MFA"}
      </button>
    </div>
  );
};

export default ResetAuthenticatorForm;
