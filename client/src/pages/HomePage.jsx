import React from "react";

const HomePage = () => {
  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-blue-50 to-blue-100 relative overflow-hidden">
      
      {/* Centered Content */}
      <div className="text-center px-6 lg:px-20 z-10">
        <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
          Powerfully Simple{" "}
          <span className="text-blue-600">Secure Banking</span>
        </h1>
        <p className="text-gray-700 text-base lg:text-lg mb-4 max-w-lg mx-auto">
          Manage your finances securely and easily. Enable MFA for added
          security and peace of mind.
        </p>
        <span className="block text-sm opacity-80">
          Your security is our top priority.
        </span>
      </div>

      {/* Background floating shapes */}
      <div className="absolute top-0 right-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-40 w-80 h-80 bg-blue-300 rounded-3xl transform rotate-12 opacity-30"></div>
        <div className="absolute top-40 right-20 w-64 h-64 bg-pink-300 rounded-3xl transform -rotate-12 opacity-30"></div>
      </div>
    </div>
  );
};

export default HomePage;
