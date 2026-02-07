import React from "react";

const Footer = () => {
  return (
    <footer className="w-full bg-gray-100 mt-10 py-6 text-center text-gray-700">
      &copy; {new Date().getFullYear()} CeylonTrust. All rights reserved.
    </footer>
  );
};

export default Footer;
