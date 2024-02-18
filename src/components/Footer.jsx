import React from "react";
import { FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-2 md:px-60 flex justify-between items-start">
        <div className="flex flex-col items-center">
          <h2 className="text-indigo-500 text-lg font-bold mb-4 md:mb-0 border-b-2 border-indigo-500 text-center px-2 mt-2">
            Quick Links
          </h2>
          <Link to="/" className="hover:text-gray-300">
            Home
          </Link>
          <Link to="/about" className="hover:text-gray-300">
            About
          </Link>
          <Link to="/blog" className="hover:text-gray-300">
            Blog
          </Link>
          <Link to="/contact" className="hover:text-gray-300">
            Contact
          </Link>
          <Link to="/terms" className="hover:text-gray-300">
            Terms &amp; Conditions
          </Link>
        </div>
        <div className="flex flex-col items-center gap-2">
          <h2 className="text-indigo-500 text-lg font-bold mb-4 md:mb-0 border-b-2 border-indigo-500 text-center px-2 mt-2">
            Follow Us
          </h2>
          <div className="flex gap-2">
            <a href="#" className="text-indigo-500 hover:text-indigo-300">
              <FaFacebook className="w-6 h-6" />
            </a>
            <a href="#" className="text-blue-400 hover:text-blue-300">
              <FaTwitter className="w-6 h-6" />
            </a>
            <a href="#" className="text-blue-800 hover:text-blue-600">
              <FaLinkedin className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>
      <div className="mt-6 text-center text-gray-400">
        &copy; {new Date().getFullYear()} Your Blog Name. All rights reserved.
        <br />
        Built with ❤️ by You
      </div>
    </footer>
  );
};

export default Footer;
