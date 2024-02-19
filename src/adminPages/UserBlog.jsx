import { Link, useSearchParams } from "react-router-dom";
import React, { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import CardSkeleton from "../sckeleton/CardSkeleton";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import DeleteCard from "../adminComponents/DeleteCard";

function UserBlog() {
  const [isOpen, setIsOpen] = useState(false);
  const [posts, setPosts] = useState([]);
  const [scale, setScale] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams({ page: 1 });

  const page = searchParams.get("page");

  const deleteBlog = async (_id) => {
    try {
      const response = await fetch("https://blog-app-api-x1ut.onrender.com/delete-admin-post/" + _id, {
        method: "DELETE",
      });
      const data = await response.json();
      if (data.success) {
        toast.success(data.message);
        setPosts((prev) =>
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

  const getUserPosts = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`https://blog-app-api-x1ut.onrender.com/getOtherUserPosts?${page}`, {
        credentials: "include",
      });
      const data = await response.json();
      setIsLoading(false);
      setPosts([...data.posts]);
    } catch (error) {
      console.log(error);
    }
  }, [setPosts, setIsLoading, page]);

  useEffect(() => {
    getUserPosts();
  }, [page]);

  const changeStatus = async (_id, approved, imageUrl) => {
    try {
      const response = await fetch("https://blog-app-api-x1ut.onrender.com/approve-post", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ _id, approved, imageUrl }),
      });
      const data = await response.json();
      toast.success(data.message);
      if (data.success) {
        // Find the post by _id and update the approved field
        const updatedPosts = posts.map((post) => {
          if (post._id === _id) {
            return { ...post, approved: true };
          }
          return post;
        });
        // Update the posts state with the updatedPosts array
        setPosts([...updatedPosts]);
      } else {
        setPosts((prev) => prev.filter((post) => post._id !== _id));
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div className="grid grid-cols-1 mt-12 md:grid-cols-2 lg:grid-cols-3 md:px-10 px-1 gap-6">
        {isLoading ? (
          <>
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
          </>
        ) : (
          <>
            {posts.map((post) => (
              <>
                <Link
                  to={`/blog/${post._id}`}
                  key={post._id}
                  className="bg-white p-6 relative rounded shadow-md transition-all hover:shadow-lg"
                  onMouseOver={() => setScale(post._id)}
                  onMouseOut={() => setScale(0)}
                >
                  {post.approved ? (
                    <div className="absolute bg-green-500 rotate-45 top-7 right-0 text-white rounded px-2 z-10">
                      Approved
                    </div>
                  ) : (
                    <div className="absolute bg-yellow-500 rotate-45 right-0 text-white rounded px-2 z-10">
                      Pending
                    </div>
                  )}
                  {post.image && (
                    <div className="overflow-hidden w-full h-40">
                      <img
                        src={post.image}
                        width={500}
                        height={500}
                        alt={post.title}
                        className={`w-full h-40 object-cover rounded mb-4 transition-transform duration-[400ms] ${
                          scale === post._id && "scale-110"
                        }`}
                      />
                    </div>
                  )}
                  <div className="p-4">
                    <h2 className="text-xl font-semibold">
                      {post.title.length > 70
                        ? post.title.substring(0, 70) + "..."
                        : post.title}
                    </h2>
                    <p className="text-gray-600 mt-2">
                      {post.shortDescription.length > 120
                        ? post.shortDescription.substring(0, 120) + "..."
                        : post.shortDescription}
                    </p>
                  </div>
                  <div className="flex justify-start items-center gap-1 py-1 px-4">
                    <img
                      width={500}
                      height={500}
                      src={post.user.imageUrl}
                      alt={post.user.name}
                      className="rounded-full w-8 h-8 object-cover"
                    />
                    <span>
                      <b>{post.user.name}</b>
                    </span>
                  </div>
                  {post.approved ? (
                    <div className="w-full flex rounded border-[1px] mt-2 shadow-md justify-center items-center">
                      <button
                        className="text-indigo-800 font-bold w-full p-2 bg-indigo-100 "
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setIsOpen(true);
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  ) : (
                    <div className="w-full flex gap-20 rounded p-2 border-[1px] mt-2 shadow-md justify-center items-center">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          changeStatus(post._id, true, post.image);
                        }}
                        className="bg-green-500 p-2 min-w-[100px] text-white rounded-sm transition-colors duration-300 hover:bg-green-700"
                      >
                        Approve
                      </button>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          changeStatus(post._id, false, post.image);
                        }}
                        className="bg-red-500 p-2 min-w-[100px] text-white rounded-sm transition-colors duration-300 hover:bg-red-700"
                      >
                        Reject
                      </button>
                    </div>
                  )}
                </Link>
                <DeleteCard
                  key={post._id}
                  onClose={() => setIsOpen(false)}
                  onDelete={() => deleteBlog(post._id)}
                  isOpen={isOpen}
                />
              </>
            ))}
          </>
        )}
      </div>
      {posts.length > 0 && (
        <div className="px-28 mt-10 flex justify-between items-center">
          <button
            disabled={page > 1 || posts.length < 12}
            onClick={() => {
              setSearchParams((prev) => {
                const newSearchParams = new URLSearchParams(prev);
                newSearchParams.set(
                  "page",
                  String(Number(prev.get("page")) - 1)
                );
                return newSearchParams;
              });
            }}
            className="px-2 py-1 flex gap-1 items-center disabled:bg-gray-300 bg-gray-700 text-white rounded-sm font-bold"
          >
            <AiOutlineArrowLeft /> Prev
          </button>
          <button
            disabled={posts.length < 12}
            onClick={() => {
              setSearchParams((prev) => {
                const newSearchParams = new URLSearchParams(prev);
                newSearchParams.set(
                  "page",
                  String(Number(prev.get("page")) + 1)
                );
                return newSearchParams;
              });
            }}
            className="px-2 py-1 flex gap-1 items-center disabled:bg-gray-300 bg-gray-700 text-white rounded-sm font-bold"
          >
            Next <AiOutlineArrowRight />
          </button>
        </div>
      )}
    </div>
  );
}

export default UserBlog;
