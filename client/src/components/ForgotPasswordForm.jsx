import React, { useState } from "react";
import { forgotPassword } from "../service/authApi";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const ForgotPasswordForm = () => {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await forgotPassword(username);

      toast.success(
        "If the username exists, A reset link has been sent to the registered email"
      );
      setUsername("");
    } catch {
      toast.error("Something went wrong");
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
        Forgot Password
      </h2>

      <label className="block text-sm font-medium text-gray-700 mb-1">
        Username
      </label>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-400 mb-6"
        placeholder="Enter your username"
        required
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-500 text-white py-3 rounded-xl hover:bg-blue-600 transition"
      >
        {loading ? "Sending..." : "Send Reset Link"}
      </button>

      <p className="text-center mt-6 text-sm text-gray-600">
        <Link to="/login" className="text-blue-500 hover:underline">
          Back to login
        </Link>
      </p>
    </form>
  );
};

export default ForgotPasswordForm;
