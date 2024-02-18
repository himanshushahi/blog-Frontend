import React, { useState } from "react";
import { Link } from "react-router-dom";

function BlogCard({ post }) {
  const [scale,setScale] = useState(0);
  return (
    <Link
      to={`/blog/${post._id}`}
      key={post._id}
      className="bg-white p-4 rounded shadow-md transition-all  hover:shadow-lg "
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
      <div className="flex items-center text-gray-600">
        <img
          src={post.user.imageUrl}
          alt={post.user.name}
          width={500}
          height={500}
          className="w-8 h-8 rounded-full mr-2"
        />
        <span>{post.user.name}</span>
      </div>
      <div className="mt-2 text-gray-400 text-sm">
        {new Date(post.createdAt).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}{" "}
        | {post.time} min read
      </div>
    </Link>
  );
}

export default BlogCard;
