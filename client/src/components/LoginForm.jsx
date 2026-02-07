import React, { useState } from "react";
import { register, login } from "../service/authApi";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const LoginForm = ({ onLoginSuccess }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [otpMethod, setOtpMethod] = useState("email");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await login(username, password);
      const data = response.data;

      // OTP sent
      toast.success(data.message);

      // Navigate to OTP verification page
      onLoginSuccess(data);

      // Reset form
      setUsername("");
      setPassword("");
    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid Login Credentials");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await register(
        username,
        password,
        email,
        phone,
        otpMethod,
      );

      // Show success toast
      toast.success(data.message);

      setIsRegister(false);
      setUsername("");
      setPassword("");
      setEmail("");
      setPhone("");
      setOtpMethod("");

      // Navigate to OTP verification page
      navigate("/verify-registration-otp", {
        state: { username, otpMethod },
      });
    } catch (error) {
      // Show error toast
      toast.error(
        error.response?.data?.message ||
          "Something went wrong during registration",
      );
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-blue-100 min-h-screen flex items-center justify-center">
      <form
        onSubmit={isRegister ? handleRegister : handleLogin}
        className="bg-white rounded-3xl shadow-2xl w-full max-w-3xl px-16 py-12"
      >
        <h2 className="text-4xl text-center font-light">
          {isRegister ? "Create Account" : "Login"}
        </h2>
        <p className="text-center text-gray-600 mt-3 text-lg">
          {isRegister
            ? "Looks like you are new here"
            : "We are glad to see you again"}
        </p>

        {/* Inputs */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Username */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={loading}
              className="w-full px-4 py-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your username"
              required
            />
          </div>

          {/* Password */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              className="w-full px-4 py-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your password"
              required
            />
          </div>

          {/* Register fields */}
          {isRegister && (
            <>
              {/* Email + Phone next to each other */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:col-span-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading}
                    className="w-full px-4 py-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Enter your email"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    disabled={loading}
                    className="w-full px-4 py-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Enter your phone number"
                    required
                  />
                </div>
              </div>

              {/* OTP Method */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  OTP Method
                </label>
                <div className="flex gap-6">
                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="radio"
                      name="otpMethod"
                      value="email"
                      checked={otpMethod === "email"}
                      onChange={(e) => setOtpMethod(e.target.value)}
                      disabled={loading}
                    />
                    Email
                  </label>
                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="radio"
                      name="otpMethod"
                      value="sms"
                      checked={otpMethod === "sms"}
                      onChange={(e) => setOtpMethod(e.target.value)}
                      disabled={loading}
                    />
                    SMS
                  </label>
                </div>
              </div>
            </>
          )}
        </div>

        {!isRegister && (
          <div className="text-right mt-2">
            <Link
              to="/forgot-password"
              className="text-sm text-blue-500 hover:underline"
            >
              Forgot password?
            </Link>
          </div>
        )}

        {/* Submit button shows loading */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-4 mt-6 rounded-xl text-white ${
            loading ? "bg-blue-300 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {loading ? "Please wait..." : isRegister ? "Register" : "Login"}
        </button>

        {/* Toggle login/register */}
        <p className="mt-6 text-center text-gray-600 text-sm">
          {isRegister ? "Already have an account?" : "Don't have an account?"}{" "}
          <button
            type="button"
            onClick={() => setIsRegister(!isRegister)}
            className="text-blue-500 hover:underline"
          >
            {isRegister ? "Login" : "Create Account"}
          </button>
        </p>

      </form>

      {/* Background floating shapes */}
      <div className="absolute top-0 right-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-40 w-80 h-80 bg-blue-300 rounded-3xl transform rotate-12 opacity-30"></div>
        <div className="absolute top-40 right-20 w-64 h-64 bg-pink-300 rounded-3xl transform -rotate-12 opacity-30"></div>
      </div>

    </div>
  );
};

export default LoginForm;
