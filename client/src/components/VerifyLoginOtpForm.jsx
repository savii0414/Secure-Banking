import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { verifyLoginOTP } from "../service/authApi";
import { useSession } from "../context/SessionContext";

const VerifyLoginOtpForm = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { login } = useSession();

  const username = state?.username;
  const otpMethod = state?.otpMethod;

  const [otp, setOtp] = useState("");

  useEffect(() => {
    if (!username) {
      navigate("/login");
    }
  }, [username, navigate]);

  const handleVerify = async (e) => {
    e.preventDefault();
    try {
      if (!username) {
        toast.error("No username found for OTP verification");
        return;
      }

      const data = await verifyLoginOTP(username, otp);

      // Save fully logged-in user
      login(data);
      navigate("/dashboard", { state: { toastMessage: "Login successful" } });
    } catch (error) {
      toast.error(error.response?.data?.message || "OTP verification failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleVerify}
        className="max-w-md w-full bg-white p-10 rounded-3xl shadow-2xl"
      >
        <h2 className="text-3xl font-light text-center mb-6">Verify OTP</h2>

        <p className="text-center text-gray-600 mb-6">
          OTP sent via {otpMethod || "registered method"}
        </p>

        <input
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-400 mb-6"
          placeholder="Enter OTP"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-3 rounded-xl hover:bg-blue-600 transition"
        >
          Verify OTP
        </button>
      </form>
    </div>
  );
};

export default VerifyLoginOtpForm;
