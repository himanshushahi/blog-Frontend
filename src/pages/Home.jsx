import { Link } from "react-router-dom";
import {
  FaArrowAltCircleRight,
  FaChevronRight,
  FaPencilAlt,
} from "react-icons/fa"; // Importing the right chevron icon from react-icons/fa
import TestimonialsSection from "../components/TestimonialsSection";
import FaqSection from "../components/FaqSection";
import { useCallback, useEffect, useState } from "react";
import BlogCard from "../components/BlogCard";
import CardSkeleton from "../sckeleton/CardSkeleton";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const getBlog = useCallback(async () => {
    try {
      const responce = await fetch(`/api/get-approve-blog`);
      const { posts } = await responce.json();
      setIsLoading(false);
      setPosts([...posts]);
    } catch (error) {
      console.log(error);
    }
  }, [setPosts, setIsLoading]);
  useEffect(() => {
    getBlog();
  }, []);

  return (
    <div>
      {/* heroSection */}
      <div
        className="bg-gradient-to-r from-purple-600 to-indigo-600 py-20 h-[70%]"
        style={{
          borderBottomRightRadius: "50px",
          borderBottomLeftRadius: "50px",
        }}
      >
        <div className="container mx-auto text-center text-white">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Discover a World of Insightful Blogs
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl mb-8">
            Explore captivating articles on diverse topics, written by
            passionate bloggers.
          </p>
          <Link
            to="/blog"
            className="bg-white text-indigo-600 hover:bg-slate-400 rounded-full px-6 py-3 text-lg md:text-xl lg:text-2xl transition-colors duration-300"
          >
            Explore Blogs
            <FaChevronRight className="ml-2 inline-block" />
          </Link>
        </div>
      </div>
      <div className="px-2 md:px-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
              <CardSkeleton />
              <CardSkeleton />
            </>
          ) : (
            <>
              {posts?.map((post) => {
                return <BlogCard key={post._id} post={post} />;
              })}
            </>
          )}
        </div>
        <div className="flex justify-end px-5 mt-5">
          <Link
            to={"blog"}
            className="text-white bg-indigo-400 flex  gap-1 items-center p-1 transition-all duration-300 rounded-sm hover:bg-indigo-300"
          >
            See More <FaArrowAltCircleRight />
          </Link>
        </div>
      </div>
      <section className="bg-gray-100 py-12 mt-10">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl text-indigo-600 font-semibold mb-4">
            Ready to Share Your Ideas?
          </h2>
          <p className="text-lg md:text-xl lg:text-2xl text-indigo-400 mb-8">
            Join our community, write blogs, and earn recognition for your
            insights.
          </p>
          <Link
            to="/signup"
            className="bg-indigo-600 text-white py-2 px-6 rounded-full inline-flex items-center transition-all hover:bg-indigo-700 hover:scale-105"
          >
            <FaPencilAlt className="w-5 h-5 mr-2" />
            Sign Up and Start Writing
          </Link>
        </div>
      </section>
      <TestimonialsSection />
      <FaqSection />
    </div>
  );
}
