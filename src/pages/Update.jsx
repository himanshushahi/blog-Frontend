import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { FaTrashAlt, FaUpload } from "react-icons/fa";
import DeleteCard from "../adminComponents/DeleteCard";
import toast from "react-hot-toast";
import Loader from "../components/Loader";
import Editor from "../Quill/Editor";

export default function Update() {
  const [editorValue, setEditorValue] = useState("");
  const [updateLoading, setUpdateLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [selectedcategory, setSelectedCategory] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [image, setImage] = useState(null);
  const [mouseIn, setMouseIn] = useState(false);
  const navigate = useNavigate();
  const params = useParams();

  const [error, setError] = useState({
    title: null,
    shortDescription: null,
    value: null,
  });

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      const response = await fetch("https://blog-app-api-x1ut.onrender.com/get-edit-data/" + params.id, {
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      setIsLoading(false);
      if (response.ok) {
        const { post } = await response.json();
        setImage(post.image);
        setTitle(post.title);
        setShortDescription(post.shortDescription);
        setEditorValue(post.content);
        setSelectedCategory(post.category);
      } else {
        navigate(-1);
      }
    };
    getData();
  }, [params, navigate]);

  const handleImageUpload = (e) => {
    const image = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      // Here, reader.result contains the base64 encoded image data.
      const base64ImageData = reader.result;
      setImage(base64ImageData);
    };

    if (image) {
      reader.readAsDataURL(image); // Read the image as a data URL
    }
  };

  const deleteImage = () => {
    setIsOpen(false);
    setImage(null);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const value = editorValue.toString("html");
    if (title === "") {
      setError((prev) => ({ ...prev, title: "This Field Is Required" }));
      return;
    } else {
      setError((prev) => ({ ...prev, title: "" }));
    }

    if (shortDescription === "") {
      setError((prev) => ({
        ...prev,
        shortDescription: "This Field Is Required",
      }));
      return;
    } else {
      setError((prev) => ({ ...prev, shortDescription: "" }));
    }

    if (value === "") {
      setError((prev) => ({ ...prev, value: "This Field Is Required" }));
      return;
    } else {
      setError((prev) => ({ ...prev, value: "" }));
    }

    try {
      const options = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          shortDescription,
          image,
          content: value,
        }),
      };
      setUpdateLoading(true);
      const res = await fetch("https://blog-app-api-x1ut.onrender.com/update-blog/" + params.id, options);

      const data = await res.json();
      setUpdateLoading(false);
      if (data.success) {
        toast.success(data.message);
        navigate(-1);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="px-2 md:px-40 md:py-20 py-5 bg-slate-100">
      {isLoading ? (
        <div className="h-[100vh] flex justify-center items-center w-full ">
          Loading....
        </div>
      ) : (
        <>
          <div className="flex justify-center">
            <h2 className="text-indigo-500 text-2xl px-5 py-1 text-center my-5 border-b-4 font-bold border-indigo-500  border-solid">
              Edit Blog
            </h2>
          </div>
          <div className="w-full flex flex-col items-center  gap-2">
            <input
              type="text"
              value={title}
              name="title"
              id="title"
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter Blog Title"
              className="outline-none p-2 bg-white border-[1px] border-solid border-gray-400 w-full md:w-[50%] rounded"
            />
            {error.title && (
              <p className="text-red-500 text-start">{error.title}</p>
            )}

            <textarea
              type="text"
              value={shortDescription}
              name="shortDescription"
              onChange={(e) => setShortDescription(e.target.value)}
              placeholder="Write Sort Description"
              className="outline-none p-2 bg-white border-[1px] border-solid border-gray-400 w-full md:w-[50%] rounded h-48 resize-none"
            ></textarea>
            {error.shortDescription && (
              <p className="text-red-500 text-start">
                {error.shortDescription}
              </p>
            )}

            <select
              value={selectedcategory}
              className="outline-none p-2 bg-white border-[1px] border-gray-400 w-full md:w-[50%] rounded"
              disabled={true}
            >
              <option value={selectedcategory}>{selectedcategory}</option>
            </select>
            <label
              htmlFor="image"
              className="flex gap-1 text-white items-center justify-center p-2 w-full md:w-[50%] transition-colors duration-300 bg-indigo-500 hover:bg-indigo-800 rounded cursor-pointer"
            >
              Upload image <FaUpload size={20} />
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              id="image"
              className="hidden"
            />

            {image && (
              <div
                className="w-full md:w-[50%] relative flex justify-center items-center"
                onMouseOver={() => setMouseIn(true)}
                onMouseLeave={(e) => setMouseIn(false)}
              >
                <img
                  src={image}
                  alt="dgdgdg"
                  className={`h-40 object-cover w-40 rounded transition-all duration-300 ${
                    mouseIn ? "brightness-75" : "brightness-100"
                  }`}
                />
                {mouseIn && (
                  <FaTrashAlt
                    onClick={() => setIsOpen(true)}
                    size={30}
                    className="absolute text-white cursor-pointer"
                  />
                )}
              </div>
            )}
          </div>
          <DeleteCard
            onDelete={deleteImage}
            onClose={() => setIsOpen(false)}
            isOpen={isOpen}
          />
          <div className="flex items-center flex-col">
            <Editor initialValue={editorValue} onChange={(value) => setEditorValue(value)} />
            {error.value && (
              <p className="text-red-500 w-full md:w-1/2 text-left mt-5">
                {error.value}
              </p>
            )}
          </div>

          <div className="flex justify-center items-center mt-20 max-md:mt-10">
            <button
              onClick={submitHandler}
              disabled={updateLoading}
              className="flex gap-1 text-white items-center justify-center p-2 w-full md:w-[50%] transition-colors duration-300 hover:bg-indigo-800 bg-indigo-500 rounded cursor-pointer"
            >
              {updateLoading ? <Loader size={30} /> : "Update"}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
