import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <nav className="w-full bg-white shadow-md py-4 px-10 flex justify-between items-center font-sans">
      {/* Logo */}
      <Link to="/" className="text-2xl font-bold text-blue-600 tracking-wide">
        💳 Ceylon Trust
      </Link>

      {/* Navigation Links */}
      <div className="flex gap-8 text-gray-700 font-medium text-lg">
        <Link
          to="/"
          className="hover:text-blue-600 transition-colors duration-200"
        >
          Home
        </Link>
        <Link
          to="/services"
          className="hover:text-blue-600 transition-colors duration-200"
        >
          Services
        </Link>
        <Link
          to="/rates"
          className="hover:text-blue-600 transition-colors duration-200"
        >
          Rates & Tariffs
        </Link>
        <Link
          to="/contact"
          className="hover:text-blue-600 transition-colors duration-200"
        >
          Contact
        </Link>

        {/* Login Button */}
        <Link
          to="/login"
          className="bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-200"
        >
          Login
        </Link>
      </div>
    </nav>
  );
};

export default Header;
