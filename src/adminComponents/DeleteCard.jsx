import React from "react";

function DeleteCard({ yes='Delete',no='Cancel', isOpen, onClose, onDelete,message='Are You Sure Want To Delete?' }) {
  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
      }}
      className={`${
        isOpen ? "pointer-events-auto" : "pointer-events-none opacity-0"
      } fixed inset-0 z-50 flex items-center justify-center`}
    >
      {/* Background overlay */}
      <div
        className={`fixed ${
          isOpen ? "opacity-50" : "opacity-0"
        } inset-0 transition-opacity duration-300 bg-black `}
        onClick={onClose}
      ></div>

      {/* Modal content */}
      <div className="bg-slate-300 flex items-center gap-2 flex-col justify-center p-4 h-[30%] w-[25%] max-md:w-[98%] rounded-lg shadow-lg z-50">
        <p className="text-gray-700">{message}</p>

        <div className="mt-4 flex gap-8 justify-end">
          <button
            className="px-4 py-2 mr-2  transition-colors duration-300 bg-red-500 text-white rounded hover:bg-red-600"
            onClick={onDelete}
          >
           {yes}
          </button>
          <button
            className="px-4 py-2 transition-colors duration-300 bg-gray-400 text-white rounded hover:bg-gray-500"
            onClick={onClose}
          >
           {no}
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteCard;
