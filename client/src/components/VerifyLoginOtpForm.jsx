import React, { useState, useEffect, useRef } from "react";
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

  // Array of 6 OTP digits
  const [otpDigits, setOtpDigits] = useState(new Array(6).fill(""));
  const inputsRef = useRef([]);

  useEffect(() => {
    if (!username) {
      navigate("/login");
    }
    inputsRef.current[0]?.focus(); // focus first input on mount
  }, [username, navigate]);

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (!/^\d*$/.test(value)) return; // only allow numbers

    const newOtp = [...otpDigits];
    newOtp[index] = value;
    setOtpDigits(newOtp);

    // Focus next input if not last
    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otpDigits[index] && index > 0) {
      // Move focus to previous input
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    const otp = otpDigits.join("");
    if (otp.length !== 6) {
      toast.error("Please enter all 6 digits of the OTP");
      return;
    }

    try {
      const res = await verifyLoginOTP(username, otp);
      const data = res.data;

      if (data.mfaRequired) {
        navigate("/verify-login-mfa", { state: { username: data.username } });
      } else {
        login(data);
        navigate("/dashboard", {
          state: { toastMessage: "Login successful" },
        });
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "OTP verification failed");
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
          Enter the 6-digit OTP sent via {otpMethod || "your registered method"}
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
          className="w-full bg-blue-500 text-white py-3 rounded-xl hover:bg-blue-600 transition"
        >
          Verify OTP
        </button>
      </form>
    </div>
  );
};

export default VerifyLoginOtpForm;
