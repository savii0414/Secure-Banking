import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { verifyRegistrationOTP } from "../service/authApi";
import { toast } from "react-toastify";

const VerifyOtpForm = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const username = state?.username;
  const otpMethod = state?.otpMethod;

  // Array of 6 OTP digits
  const [otpDigits, setOtpDigits] = useState(new Array(6).fill(""));
  const inputsRef = useRef([]);

  useEffect(() => {
    if (!username) {
      navigate("/login");
    }
    inputsRef.current[0]?.focus(); // focus first input
  }, [username, navigate]);

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (!/^\d*$/.test(value)) return; // only allow numbers

    const newOtp = [...otpDigits];
    newOtp[index] = value;
    setOtpDigits(newOtp);

    // focus next input if not last
    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otpDigits[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    setLoading(true);
    const otp = otpDigits.join("");
    if (otp.length !== 6) {
      toast.error("Please enter all 6 digits of the OTP");
      setOtpDigits(new Array(6).fill("")); // clear inputs
      inputsRef.current[0]?.focus(); // focus first input
      setLoading(false);
      return;
    }

    try {
      await verifyRegistrationOTP(username, otp);
      toast.success("Registration verified. Please login.");
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid OTP");
      setOtpDigits(new Array(6).fill("")); // clear inputs
      inputsRef.current[0]?.focus(); // focus first input
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-blue-100 min-h-screen flex items-center justify-center px-4">
      <form
        onSubmit={handleVerify}
        className="max-w-md w-full bg-white p-10 rounded-3xl shadow-2xl text-center"
      >
        <h2 className="text-3xl font-light mb-6">Verify OTP</h2>
        <p className="text-gray-600 mb-6">
          OTP sent via {otpMethod || "your registered method"}
        </p>

        <div className="flex justify-between mb-6">
          {otpDigits.map((digit, index) => (
            <input
              key={index}
              type="text"
              value={digit}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              ref={(el) => (inputsRef.current[index] = el)}
              className="w-12 h-12 text-center border rounded-lg text-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
              maxLength={1}
            />
          ))}
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 rounded-xl text-white ${
            loading
              ? "bg-blue-300 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {loading ? "Verifying..." : "Verify OTP"}
        </button>
      </form>
    </div>
  );
};

export default VerifyOtpForm;
