import React, { useEffect, useRef, useState } from "react";
import Sidebar from "../components/Sidebar";
import { RiMenu2Fill } from "react-icons/ri";
import BlogCard from "../components/BlogCard";
import CardSkeleton from "../sckeleton/CardSkeleton";
import { useSearchParams } from "react-router-dom";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import './hidden.css'

function Blog() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams({
    query: "",
    category: "all",
    page: 1,
  });
  const query = searchParams.get("query");
  const category = searchParams.get("category");
  const page = searchParams.get("page");
  const [allCategory, setAllCategory] = useState([]);

  const [open, setOpen] = useState(false);

  const menuIconRef = useRef(null);
  const menuRef = useRef(null);
  useEffect(() => {
    const getBlog = async () => {
      setOpen(false);
      const responce = await fetch(
        `https://blog-app-api-x1ut.onrender.com/get-filter-blog?query=${query}&category=${category}&page=${page}`
      );
      const { blogs } = await responce.json();
      setIsLoading(false);
      setPosts([...blogs]);
    };

    getBlog();
  }, [category, page]);

  const getBlog = async () => {
    setOpen(false);
    setIsLoading(true)
    const responce = await fetch(
      `https://blog-app-api-x1ut.onrender.com/get-filter-blog?query=${searchParams.get('query')}&category=${category}&page=${page}`
    );
    const { blogs } = await responce.json();
    setIsLoading(false);
    setPosts([...blogs]);
  };

  useEffect(() => {
    const getCategories = async () => {
      const response = await fetch("https://blog-app-api-x1ut.onrender.com/getCategories");
      const data = await response.json();
      setAllCategory([...data.categories]);
    };

    getCategories();
  }, [setAllCategory]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      // Check if the clicked element is not within the menuIcon or menuRef
      if (
        menuIconRef.current &&
        !menuIconRef.current.contains(e.target) &&
        menuRef.current &&
        !menuRef.current.contains(e.target)
      ) {
        setOpen(false); // Set setOpen to false if the click is outside
      }
    };

    // Add the event listener
    window.addEventListener("click", handleClickOutside);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [setOpen]); // Include setOpen in the dependency array to avoid stale closures

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div>
      <div className="relative flex gap-1">
        <RiMenu2Fill
          ref={menuIconRef}
          onClick={(e) => {
            e.stopPropagation();
            setOpen(true);
          }}
          className="absolute w-6 h-6 left-2 top-2 md:hidden"
        />
        <Sidebar
          menuRef={menuRef}
          open={open}
          setOpen={setOpen}
          category={category}
          query={query}
          allCategory={allCategory}
          setSearchParams={setSearchParams}
          onSearchClick={()=>getBlog()}
        />
        <div className="relative grid lg:grid-cols-3 gap-2 lg:mt-4 mt-10 lg:px-4 px-2 flex-1 h-screen overflow-y-auto">
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
              {posts.map((post) => {
                return <BlogCard key={post._id} post={post} />;
              })}
            </>
          )}
          
        </div>
        
      </div>
      {posts.length <= 12 && (
        <div className="w-full flex justify-between px-10 py-5 md:pl-[26%]">
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

export default Blog;
