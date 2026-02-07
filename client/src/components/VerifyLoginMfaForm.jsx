import React, { useState } from "react";
import { toast } from "react-toastify";
import { verifyLoginMFA } from "../service/authApi";
import { useSession } from "../context/SessionContext";
import { useNavigate } from "react-router-dom";

const VerifyLoginMfaForm = ({ username }) => {
  const [token, setToken] = useState("");
  const { login } = useSession();
  const navigate = useNavigate();

  const handleVerifyMFA = async (e) => {
    e.preventDefault();
    if (!token) {
      toast.error("Please enter the MFA code");
      return;
    }

    try {
      // Call backend verifyLoginMFA
      const res = await verifyLoginMFA(username, token);
      const data = res.data;

      toast.success(data.message || "MFA verified successfully");

      // Save session/login
      login(data); // store user + token

      // Redirect to dashboard
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Invalid MFA code");
    }
  };

  return (
    <form
      onSubmit={handleVerifyMFA}
      className="max-w-md w-full bg-white p-10 rounded-3xl shadow-2xl"
    >
      <h2 className="text-3xl font-light text-center mb-6">Verify MFA</h2>

      <p className="text-center text-gray-600 mb-6">
        Enter the code from your Google Authenticator app
      </p>

      <input
        type="text"
        value={token}
        onChange={(e) => setToken(e.target.value)}
        className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-400 mb-6"
        placeholder="Enter 6-digit code"
        required
      />

      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-3 rounded-xl hover:bg-blue-600 transition"
      >
        Verify MFA
      </button>
    </form>
  );
};

export default VerifyLoginMfaForm;
