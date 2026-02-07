import React from "react";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-red-100 to-red-200 px-6 text-center">
      <h1 className="text-9xl font-extrabold text-red-600 mb-6">404</h1>
      <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
        Oops! Page Not Found
      </h2>
      <p className="text-gray-700 mb-8 max-w-md">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <Link
        to="/"
        className="bg-red-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-red-700 transition text-lg font-medium"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default Error;
