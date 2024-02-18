import React from "react";

const CardSkeleton = () => {
  return (
    <div className="bg-white p-6 rounded shadow-md animate-pulse transition-all hover:shadow-lg relative">
      {/* Skeleton loader for image */}
      <div className="animate-pulse w-full h-40 mb-2 bg-gray-300 rounded" />

      {/* Skeleton loader for title */}
      <h3 className="text-lg font-semibold mb-2">
        <div className="animate-pulse bg-gray-300 w-3/4 h-6 mb-2 rounded" />
      </h3>

      {/* Skeleton loader for description */}
      <p className="text-gray-600">
        <div className="animate-pulse bg-gray-300 w-full h-4 rounded" />
      </p>

      {/* Skeleton loader for user section */}
      <div className="flex items-center text-gray-600 mt-2">
        <div className="animate-pulse w-8 h-8 bg-gray-300 rounded-full mr-2" />
        <div className="animate-pulse bg-gray-300 w-20 h-4 rounded" />
      </div>

      {/* Skeleton loader for date and read time */}
      <div className="mt-2 text-gray-400 text-sm">
        <div className="animate-pulse bg-gray-300 w-20 h-4 rounded" />
      </div>
    </div>
  );
};

export default CardSkeleton;
