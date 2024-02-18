import React from "react";

const BlogPostSkeleton = () => {
  return (
    <div className="bg-white min-h-full p-6 flex-1 rounded shadow-md transition-all hover:shadow-lg relative">
      {/* Skeleton loader for title */}
      <div className="animate-pulse h-6 w-3/4 bg-gray-300 mb-4 rounded" />

      {/* Skeleton loader for info paragraph */}
      <div className="animate-pulse h-4 w-full bg-gray-300 mb-2 rounded" />

      {/* Skeleton loader for image */}
      <div className="animate-pulse w-full mb-4 bg-gray-300 h-60 rounded" />

      {/* Skeleton loader for content */}
      <div className="animate-pulse h-4 w-full bg-gray-300 mb-4 rounded" />
      <div className="animate-pulse h-4 w-full bg-gray-300 mb-4 rounded" />
      <div className="animate-pulse h-4 w-full bg-gray-300 mb-4 rounded" />
      <div className="animate-pulse h-4 w-full bg-gray-300 mb-4 rounded" />
      <div className="animate-pulse h-4 w-full bg-gray-300 mb-4 rounded" />
      <div className="animate-pulse h-4 w-full bg-gray-300 mb-4 rounded" />
      <div className="animate-pulse h-4 w-full bg-gray-300 mb-4 rounded" />
      <div className="animate-pulse h-4 w-full bg-gray-300 mb-4 rounded" />
      <div className="animate-pulse h-4 w-full bg-gray-300 mb-4 rounded" />
      <div className="animate-pulse h-4 w-full bg-gray-300 mb-4 rounded" />
      <div className="animate-pulse h-4 w-full bg-gray-300 mb-4 rounded" />
      <div className="animate-pulse h-4 w-full bg-gray-300 mb-4 rounded" />
      {/* Add more content skeleton lines as needed */}
    </div>
  );
};

export default BlogPostSkeleton;
