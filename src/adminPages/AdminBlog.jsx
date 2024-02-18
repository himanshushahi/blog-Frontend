import AdminNavbar from "../adminComponents/AdminNavbar";
import React, { useState, useEffect } from "react";

import CardSkeleton from "../sckeleton/CardSkeleton";
import AdminCard from "../adminComponents/AdminCard";
import { useSearchParams } from "react-router-dom";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { MdOutlineCancel } from "react-icons/md";
import PlayGround from "../pages/Editor";
export default function AdminBlog() {
  const [posts, setPost] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [addMode, setAddMode] = useState(false);
  const [editableId, setEditableId] = useState("");

  const [searchParams, setSearchParams] = useSearchParams({
    query: "",
    category: "all",
    page: 1,
  });

  const query = searchParams.get("query");
  const category = searchParams.get("category");
  const page = searchParams.get("page");

  useEffect(() => {
    const getAllPost = async () => {
      setIsLoading(true);
      const response = await fetch(
        `/api/get-all-post-by-admin?page=${page}&query=${query}&category=${category}`,
        {
          credentials: "include",
        }
      );
      const data = await response.json();
      setIsLoading(false);
      setPost([...data.posts]);
    };

    getAllPost();
  }, [page, category]);

  const getBlog = async () => {
    setIsLoading(true);
    const response = await fetch(
      `/api/get-all-post-by-admin?page=${page}&query=${searchParams.get(
        "query"
      )}&category=${category}`,
      {
        credentials: "include",
      }
    );
    const data = await response.json();
    setIsLoading(false);
    setPost([...data.posts]);
  };

  return (
    <div className="relative">
      <AdminNavbar
        onSearchClick={() => getBlog()}
        setSearchParams={setSearchParams}
        query={query}
        category={category}
        setAddMode={(value) => setAddMode(value)}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:px-10 px-1 gap-6">
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
          </>
        ) : (
          <>
            {posts.map((post) => {
              return (
                <AdminCard
                  key={post._id}
                  setPost={setPost}
                  post={post}
                  setEditableId={(id) => {
                    setEditableId(id);
                    setAddMode(true);
                  }}
                />
              );
            })}
          </>
        )}
      </div>
      <div className="px-28 max-md:px-4 mb-4 mt-10 flex justify-between items-center">
        <button
          disabled={page > 1 || posts.length < 12}
          onClick={() => {
            setSearchParams((prev) => {
              const newSearchParams = new URLSearchParams(prev);
              newSearchParams.set("page", String(Number(prev.get("page")) - 1));
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
              newSearchParams.set("page", String(Number(prev.get("page")) + 1));
              return newSearchParams;
            });
          }}
          className="px-2 py-1 flex gap-1 items-center disabled:bg-gray-300 bg-gray-700 text-white rounded-sm font-bold"
        >
          Next <AiOutlineArrowRight />
        </button>
      </div>
      {addMode && (
        <div className="absolute z-[30] top-0 w-full h-full left-0">
          <button
            className="absolute top-5 right-5 hover:bg-gray-400 rounded-full p-1 transition-colors"
            onClick={() => {
              setAddMode(false);
              setEditableId("");
            }}
          >
            <MdOutlineCancel size={30} />
          </button>
          <PlayGround
            id={editableId}
            onClose={() => {
              setEditableId("");
              setAddMode(false);
            }}
            onAdd={(data) => {
              if (posts.length < 12) {
                setPost((prev) => [...prev, data]);
              }
            }}
            onUpdate={(data) =>
              setPost((prev) => {
                const updatedPosts = prev.map((post) =>
                  post._id === data._id
                    ? { ...data, createdAt: post.createdAt }
                    : post
                );
                return updatedPosts;
              })
            }
          />
        </div>
      )}
    </div>
  );
}
