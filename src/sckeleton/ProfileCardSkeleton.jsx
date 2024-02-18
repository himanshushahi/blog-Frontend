import React from "react";

function ProfileCardSkeleton() {
  return (
    <div className="flex w-full z-10 bg-white px-2 md:px-40 mt-10 border-b-4 rounded-md border-indigo-600 border-solid relative skeleton-loader">
      <div className="w-full p-2">
        {/* User Profile Information */}

        <div className="flex md:gap-4 max-md:flex-col gap-2 w-full">
        <div className="h-32 w-32 rounded-full bg-gray-300 animate-pulse"></div>
          <div className="bg-gray-300 border-l-8 border-gray-300 p-4 rounded shadow-md items-start basis-1/3 flex flex-col">
            <h3 className="text-xl font-semibold text-gray-400 mb-2 flex gap-1 items-center animate-pulse">
              <div className="h-6 w-6 bg-gray-400 rounded-full"></div>
              <div className="h-6 w-16 bg-gray-400 rounded"></div>
            </h3>
            <div className="h-4 w-24 bg-gray-400 rounded animate-pulse"></div>
          </div>
          <div className="bg-gray-300 p-4 border-l-8 border-gray-300 rounded shadow-md items-start basis-1/3 flex flex-col">
            <h3 className="text-xl font-semibold text-gray-400 mb-2 flex gap-1 items-center animate-pulse">
              <div className="h-6 w-6 bg-gray-400 rounded-full"></div>
              <div className="h-6 w-24 bg-gray-400 rounded"></div>
            </h3>
            <div className="h-4 w-32 bg-gray-400 rounded animate-pulse"></div>
          </div>
        </div>
      </div>
      <button className=" text-gray-600 absolute right-5 top-5 hover:text-black focus:outline-none">
        <div className={`modal mt-4 flex flex-col gap-1 w-max absolute right-0 top-2 bg-gray-300 rounded-sm transition-all duration-300`}>
          <div className="h-6 w-32 bg-gray-400 rounded animate-pulse"></div>
          <div className="h-6 w-32 bg-gray-400 rounded animate-pulse"></div>
        </div>
      </button>
    </div>
  );
}

export default ProfileCardSkeleton;
