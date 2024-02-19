import { Link } from "react-router-dom";
import React, { useState } from "react";
import { FaPencilAlt, FaTrash } from "react-icons/fa";
import toast from "react-hot-toast";
import DeleteCard from "./DeleteCard";
function AdminCard({ post, setPost, setEditableId }) {
  const [scale, setScale] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const deleteBlog = async (_id) => {
    try {
      const response = await fetch("https://blog-app-api-x1ut.onrender.com/delete-admin-post/" + _id, {
        method: "DELETE",
      });
      const data = await response.json();
      if (data.success) {
        toast.success(data.message);
        setPost((prev) =>
          prev.filter((post) => {
            return post._id !== _id;
          })
        );
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Link
      to={`/blog/${post._id}`}
      key={post._id}
      className="bg-white p-6 rounded shadow-md transition-all  hover:shadow-lg "
      onMouseOver={() => setScale(post._id)}
      onMouseOut={() => setScale(0)}
    >
      {post.image && (
        <div className="overflow-hidden w-full h-40 mb-2">
          <img
            src={post.image}
            alt={post.title}
            width={500}
            height={500}
            className={`w-full h-40 object-cover rounded mb-4 transition-transform duration-[400ms] ${
              scale === post._id && "scale-110"
            }`}
          />
        </div>
      )}
      <h3 className="text-lg font-semibold mb-2">
        {post.title.length > 70
          ? post.title.substring(0, 70) + "..."
          : post.title}
      </h3>

      <p className="text-gray-600">
        {post.shortDescription.length > 120
          ? post.shortDescription.substring(0, 120) + "..."
          : post.shortDescription}
      </p>
      <div className="mt-2 text-gray-400 text-sm">
        {new Date(post.createdAt).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}{" "}
        | {post.time} min read
      </div>
      <div className="flex w-full mt-4 justify-center">
        <button
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            setIsOpen(true);
          }}
          className="px-2 w-[50%] py-1 text-white font-bold flex gap-1 justify-center items-center outline-none transition-colors duration-300 border-none bg-indigo-400 hover:bg-indigo-300"
        >
          Delete <FaTrash color="white" />
        </button>
        <button
          className="flex items-center w-[50%] gap-1 justify-center px-2 py-1 bg-slate-500 transition-colors duration-300 text-white hover:bg-slate-400"
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            setEditableId(post._id);
          }}
        >
          Edit <FaPencilAlt />
        </button>
      </div>
      <DeleteCard
        key={post._id}
        onClose={() => setIsOpen(false)}
        onDelete={() => deleteBlog(post._id)}
        isOpen={isOpen}
      />
    </Link>
  );
}

export default AdminCard;
