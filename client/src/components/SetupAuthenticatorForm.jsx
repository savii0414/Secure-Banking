import React, { useEffect, useState } from "react";
import { setup2FA } from "../service/authApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const SetupAuthenticatorForm = () => {
  const [qrCode, setQrCode] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const loadQr = async () => {
      try {
        const res = await setup2FA();
        setQrCode(res.data.qrCode);
      } catch {
        toast.error("Failed to generate QR code");
      }
    };

    loadQr();
  }, []);

  return (
    <div className="bg-white p-10 rounded-3xl shadow-xl w-full max-w-md">
      <h2 className="text-2xl font-semibold text-center mb-4">
        Enable Google Authenticator
      </h2>

      <p className="text-sm text-gray-600 text-center mb-6">
        Scan this QR code using Google Authenticator
      </p>

      {qrCode && (
        <img
          src={qrCode}
          alt="QR Code"
          className="mx-auto mb-6 w-48 h-48"
        />
      )}

      <button
        onClick={() => navigate("/verify-2fa")}
        className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700"
      >
        I’ve scanned the QR code
      </button>
    </div>
  );
};

export default SetupAuthenticatorForm;
