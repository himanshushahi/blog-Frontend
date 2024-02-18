import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';

const NotFound = () => {
    const location = useLocation();
    console.log(location)
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-3xl font-bold text-red-500 mb-2">Page Not Found</h1>
      <p className="text-gray-600">The requested page could not be found.</p>
      <Link to="/" className="mt-4">
        <button className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
          <FaHome className="mr-2" /> Go to Home
        </button>
      </Link>
    </div>
  );
};

export default NotFound;
