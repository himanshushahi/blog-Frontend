import BlogCard from "../components/BlogCard";
import { useContext, useEffect, useState } from "react";
import { IoMdSend } from "react-icons/io";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import LoginContext from "../context/LoginContext";
import BlogPostSkeleton from "../sckeleton/BlogPostSkeleton";
import CardSkeleton from "../sckeleton/CardSkeleton";
import AdminContext from "../context/adminContext";
import toast from "react-hot-toast";

function BlogDetails() {
  const navigate = useNavigate();
  const params = useParams();
  const [searchParams, setSearchParams] = useSearchParams({ page: 1 });
  const page = searchParams.get("page");

  const [similarBlogs, setSimilarBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [similarLoading, setSimilarLoading] = useState(false);
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");

  const { isLogin } = useContext(LoginContext);
  const { adminLogin } = useContext(AdminContext);
  const sendComment = async (e) => {
    e.preventDefault();
    if (!isLogin && !adminLogin) {
      toast.error("Login First To Send Message");
      return;
    }
    if (comment.length < 1) {
      return;
    }
    try {
      const options = {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ comment }), // Wrap the comment in an object with a key
      };

      const response = await fetch("https://blog-app-api-x1ut.onrender.com/create-comment/" + params.id, options);
      setComment("");
      const data = await response.json();
      setComments((prev) => [data.comment, ...prev]);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    async function getBlog() {
      setIsLoading(true);
      const response = await fetch(`https://blog-app-api-x1ut.onrender.com/getPost/${params.id}`);
      const data = await response.json();
      if (data.success) {
        setIsLoading(false);
        setPost({ ...data.post });
        document.title = data.post.title;
      }else{
        navigate(-1);
      }
    }

    if (params.id) {
      getBlog();
    }
  }, [setPost,navigate, params.id]);

  const [length, setLength] = useState(0);
  useEffect(() => {
    async function getComments() {
      const response = await fetch(
        `https://blog-app-api-x1ut.onrender.com/get-comments/${params.id}?page=${page}`
      );
      const commentsData = await response.json();
      const { comments } = commentsData;
      setLength(comments.length);
      if (page == 1) {
        setComments([...comments]);
      } else {
        setComments((prev) => [...prev, ...comments]);
      }
    }

    if (params.id) {
      getComments();
    }
  }, [setComments, setLength, params.id, page]);

  useEffect(() => {
    setComments([]);
  }, [params.id]);

  useEffect(() => {
    const getData = async () => {
      setSimilarLoading(true);
      const response = await fetch("https://blog-app-api-x1ut.onrender.com/get-similar-blogs/" + params.id);
      const data = await response.json();
      setSimilarLoading(false);
      setSimilarBlogs([...data]);
    };
    if (params.id) {
      getData();
    }
  }, [setSimilarBlogs, params.id]);

  const paginationHandler = () => {
    setSearchParams((prev) => {
      prev.set("page", Number(prev.get("page")) + 1);
      return prev;
    });
  };
  return (
    <div className="blog-detail mt-2 md:mt-16 px-2 md:px-40 flex justify-center max-md:flex-col gap-10 p-6 rounded-lg shadow-lg">
      <div className="flex-1">
        {isLoading ? (
          <BlogPostSkeleton />
        ) : (
          <>
            <h1 className="text-2xl font-semibold mb-4">{post?.title}</h1>
            <p className="text-gray-600 mb-2">
              By <b>{post?.user?.name}</b> on{" "}
              {new Date(post?.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
            {post?.image && (
              <img
                src={post?.image}
                alt={post?.title}
                className="rounded-lg object-cover h-[400px] w-full mb-4"
              />
            )}
            <div
              className="prose prose-lg"
              dangerouslySetInnerHTML={{ __html: post?.content }}
            ></div>
          </>
        )}

        <div className="w-full rounded bg-indigo-400 h-32 flex justify-center items-center gap-2 mt-5">
          <input
            type="text"
            name="comment"
            id="comment"
            placeholder="Comment..."
            value={comment}
            onKeyDown={(e) => {
              e.key === "Enter" && sendComment(e);
            }}
            onChange={(e) => setComment(e.target.value)}
            className="w-[80%] py-2 px-3 rounded outline-indigo-600" // Reduced py value
          />
          <button disabled={!comment} onClick={sendComment}>
            <IoMdSend
              size={40}
              className={`transition-opacity duration-300 ${
                comment ? "opacity-100" : "opacity-50"
              }`}
            />
          </button>
        </div>

        <div className="mt-10">
          <h2 className="text-xl mb-5">Comment Goes Here...</h2>
          {comments &&
            comments.map((comment) => {
              return (
                <div
                  key={comment._id}
                  className="bg-indigo-200 p-4 rounded-lg shadow-md flex items-center mb-4"
                >
                  <img
                    src={comment.user?.imageUrl}
                    alt="Commenter Avatar"
                    className="w-10 h-10 rounded-full mr-4"
                  />
                  <div>
                    <p className="text-gray-800 font-semibold">
                      {comment.user?.name}
                    </p>
                    <p className="text-gray-600">{comment?.comment}</p>
                  </div>
                </div>
              );
            })}
          {length >= 5 && (
            <div className="p-4 flex justify-center">
              <button
                onClick={paginationHandler}
                className="bg-indigo-900 border-none rounded px-2 py-1 text-white"
              >
                Load More..
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="basis-[30%] md:mt-8">
        {similarBlogs.length>0&&<h1 className="text-2xl font-bold mb-5 max-sm:mx-10 text-indigo-900 text-center">
          Also Read
        </h1>}
        <div className="flex gap-2 flex-col ">
          {similarLoading ? (
            <>
              <CardSkeleton />
              <CardSkeleton />
              <CardSkeleton />
              <CardSkeleton />
            </>
          ) : (
            <>
              {similarBlogs.map((blog) => {
                return <BlogCard key={blog._id} post={blog} />;
              })}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default BlogDetails;
