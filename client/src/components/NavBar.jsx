import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../service/authApi";
import { toast } from "react-toastify";

const Navbar = ({ user }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out successfully");
      navigate("/login");
    } catch {
      toast.error("Logout failed");
    }
  };

  return (
    <nav className="bg-white shadow px-8 py-4 flex justify-between items-center">
      <h1 className="text-xl font-semibold">💳 Ceylon Trust</h1>

      <div className="relative">
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-lg"
        >
          👤 {user?.username || "User"}
        </button>

        {open && (
          <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-xl overflow-hidden">

            {/* Show setup/reset MFA based on user.isMfaActive */}
            {user.isMfaActive ? (
              <button
              onClick={() => navigate("/reset-2fa")}
              className="block w-full text-left px-4 py-3 hover:bg-gray-100"
            >
              🔐 Reset MFA
            </button>
            ) : (
              <button
              onClick={() => navigate("/setup-2fa")}
              className="block w-full text-left px-4 py-3 hover:bg-gray-100"
            >
              🔐 Setup MFA
            </button>
            )}

            <button
              onClick={() => navigate("/")}
              className="block w-full text-left px-4 py-3 hover:bg-gray-100"
            >
              🔐 Change Password
            </button>


            <button
              onClick={handleLogout}
              className="block w-full text-left px-4 py-3 text-red-600 hover:bg-gray-100"
            >
              🚪 Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
