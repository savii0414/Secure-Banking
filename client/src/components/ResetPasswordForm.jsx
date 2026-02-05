import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { resetPassword } from "../service/authApi";
import { toast } from "react-toastify";

const ResetPasswordForm = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      await resetPassword(token, newPassword);

      toast.success("Password reset successful. Please login.");
      navigate("/login");
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Invalid or expired reset link"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-md"
    >
      <h2 className="text-3xl font-light text-center mb-6">
        Reset Password
      </h2>

      <label className="block text-sm font-medium text-gray-700 mb-1">
        New Password
      </label>
      <input
        type="password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-400 mb-4"
        required
      />

      <label className="block text-sm font-medium text-gray-700 mb-1">
        Confirm Password
      </label>
      <input
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-400 mb-6"
        required
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-500 text-white py-3 rounded-xl hover:bg-blue-600 transition"
      >
        {loading ? "Resetting..." : "Reset Password"}
      </button>
    </form>
  );
};

export default ResetPasswordForm;
