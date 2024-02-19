import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { FaTrashAlt, FaUpload } from "react-icons/fa";
import AdminContext from "../context/adminContext";
import Loader from "../components/Loader";
import { useNavigate } from "react-router-dom";
import CustomSelect from "../adminComponents/CustomSelect";
import Editor from "../Quill/Editor";

export default function PlayGround({ id, onClose, onAdd,onUpdate }) {
  const [editorState, setEditorState] = useState("");
  const [title, setTitle] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [selectedcategory, setSelectedCategory] = useState("Select-Any");
  const [allCategory, setAllCategory] = useState([]);
  const [image, setImage] = useState(null);
  const [mouseIn, setMouseIn] = useState(false);
  const navigate = useNavigate();
  const { adminLogin } = useContext(AdminContext);
  const [Loading, setLoading] = useState(false);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const response = await fetch("https://blog-app-api-x1ut.onrender.com/get-edit-data/" + id, {
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      setLoading(false);
      if (response.ok) {
        const { post } = await response.json();
        setImage(post.image);
        setTitle(post.title);
        setShortDescription(post.shortDescription);
        setEditorState(post.content);
        setSelectedCategory(post.category);
      } else {
        navigate(-1);
      }
    };
    if (id) {
      getData();
    }
  }, [id]);

  useEffect(() => {
    async function getCat() {
      try {
        const response = await fetch("https://blog-app-api-x1ut.onrender.com/getCategories");
        const data = await response.json();
        setAllCategory([...data.categories]);
      } catch (error) {
        console.log(error);
      }
    }
    getCat();
  }, [setAllCategory]);

  const [error, setError] = useState({
    title: null,
    shortDescription: null,
    value: null,
    category: null,
  });

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
    setImage(null);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
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
      setError((prev) => ({ ...prev, shortDescription: null }));
    }

    if (selectedcategory === "Select-Any") {
      setError((prev) => ({ ...prev, category: "Select Any Options" }));
      return;
    } else {
      setError((prev) => ({ ...prev, category: null }));
    }

    if (editorState === "") {
      setError((prev) => ({ ...prev, value: "This Field Is Required" }));
      return;
    } else {
      setError((prev) => ({ ...prev, value: null }));
    }
    setLoading(true);

    if (id) {
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
            editorState: editorState,
          }),
        };
        const res = await fetch("https://blog-app-api-x1ut.onrender.com/update-blog/" + id, options);

        const data = await res.json();
        if (data.success) {
          toast.success(data.message);
          onUpdate({
            _id:id,
            title,
            shortDescription,
            category: selectedcategory,
            image,
          });
          onClose();
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    } else {
      try {
        const response = await fetch("https://blog-app-api-x1ut.onrender.com/create-post", {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            shortDescription,
            category: selectedcategory,
            image,
            editorState,
          }),
        });

        setLoading(false);
        const data = await response.json();
        if (data.success) {
          toast.success(data.message);
          onAdd({
            ...data.post
          });
          onClose();
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
  };
  return (
    <div className="px-2 md:px-40 md:py-20 py-5 bg-white">
      <div className="flex justify-center">
        <h2 className="text-indigo-500 text-2xl px-5 py-1 text-center my-5 border-b-4 font-bold border-indigo-500  border-solid">
          {id ? "Update" : "Write A Blog"}
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
          <p className="text-red-500 text-start">{error.shortDescription}</p>
        )}

        <CustomSelect
          width={"50%"}
          initialState={"Select-Any"}
          options={allCategory}
          selectedOption={selectedcategory}
          setSelectedOption={setSelectedCategory}
        />

        {error.category && (
          <p className="text-red-500 text-start">{error.category}</p>
        )}

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
              width={500}
              height={500}
              className={`h-40 object-cover w-40 rounded transition-all duration-300 ${
                mouseIn ? "brightness-75" : "brightness-100"
              }`}
            />
            {mouseIn && (
              <FaTrashAlt
                onClick={deleteImage}
                size={30}
                className="absolute text-white cursor-pointer"
              />
            )}
          </div>
        )}
      </div>

      <div className="flex items-center flex-col">
        <Editor
          initialValue={editorState}
          onChange={(value) => setEditorState(value)}
        />
        {error.value && (
          <p className="text-red-500 w-full md:w-1/2 text-center mt-5">
            {error.value}
          </p>
        )}
      </div>

      <div className="flex justify-center items-center mt-20 max-md:mt-10">
        <button
          disabled={Loading}
          onClick={submitHandler}
          className={`flex gap-1 text-white items-center justify-center p-2 w-full md:w-[50%] transition-colors duration-300 hover:bg-indigo-800 bg-indigo-500 rounded ${
            Loading ? "cursor-wait" : "cursor-pointer"
          }`}
        >
          {Loading ? <Loader size={30} /> : id ? "Update" : "Submit"}
        </button>
      </div>
    </div>
  );
}
