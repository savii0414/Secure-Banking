import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { verifyRegistrationOTP } from "../service/authApi";
import { toast } from "react-toastify";

const VerifyOtpForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const username = location.state?.username;
  const otpMethod = location.state?.otpMethod;
  const [otp, setOtp] = useState("");

  const handleVerify = async (e) => {
    e.preventDefault();

    try {
      const { data } = await verifyRegistrationOTP(username, otp);

      toast.success(data.message);

      // Navigate to login page after successful OTP verification
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (err) {
      toast.error(err.response?.data?.message || "OTP verification failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleVerify}
        className="max-w-md w-full bg-white p-10 rounded-3xl shadow-2xl"
      >
        <h2 className="text-3xl font-light text-center mb-6">Verify OTP</h2>

        <label className="block text-sm font-medium text-gray-700 mb-2">
          Enter OTP sent to your {otpMethod}
        </label>
        <input
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 mb-6"
          placeholder="Enter OTP"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-3 rounded-xl hover:bg-blue-600 transition font-medium"
        >
          Verify OTP
        </button>
      </form>
    </div>
  );
};

export default VerifyOtpForm;
