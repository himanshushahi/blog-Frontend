import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaPenAlt, FaPlus } from "react-icons/fa";
import { AiOutlineSearch } from "react-icons/ai";
import CustomSelect from "./CustomSelect";

const AdminNavbar = ({ onSearchClick, setSearchParams, query, category,setAddMode }) => {
  const [isAddCategoryOpen, setAddCategoryOpen] = useState(false);
  const [allCategory, setAllCategory] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const getCategory = async () => {
      const response = await fetch("https://blog-app-api-x1ut.onrender.com/getCategories");
      const { categories } = await response.json();
      setAllCategory([...categories]);
    };

    getCategory();
  }, [setAllCategory]);

  const handleAddCategory = async () => {
    if (categoryName.length < 1) {
      setError("Fill This Field");
      return;
    }
    try {
      const response = await fetch("https://blog-app-api-x1ut.onrender.com/create-category", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: categoryName }),
      });
      const data = await response.json();
      console.log(data);
      if (data.success) {
        setAllCategory((prev) => [...prev, data.category]);
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }

    // Reset the input field and close the popup
    setCategoryName("");
    setAddCategoryOpen(false);
  };

  return (
    <nav className="bg-gray-500 p-4">
      <div className=" px-14 flex items-center max-md:px-0 max-md:flex-col max-md:gap-2">
        <div className=" flex items-center gap-2 flex-1 justify-start">
          <button
            className="text-white flex items-center gap-1 rounded-sm justify-center px-2 py-1 transition-colors bg-indigo-400 hover:bg-indigo-300"
            onClick={() => setAddCategoryOpen(true)}
          >
            <FaPlus /> Add Category
          </button>{" "}
          <button
            onClick={() => setAddMode(true)}
            className="text-white flex items-center gap-1 rounded-sm justify-center px-2 py-1 transition-colors bg-indigo-400 hover:bg-indigo-300"
          >
            <FaPenAlt /> Write Blog
          </button>
        </div>
        <div className="flex justify-center flex-1 rounded-tl-[5px] overflow-hidden rounded-bl-[5px] max-md:w-full">
          <div className="flex w-full overflow-hidden">
            <input
              type="text"
              placeholder="Search..."
              className="px-2 py-1 border w-full outline-none"
              value={query}
              onKeyDown={(e) => e.key == "Enter" && onSearchClick()}
              onChange={(e) =>
                setSearchParams((prev) => {
                  prev.set("category", "all");
                  prev.set("page", 1);
                  prev.set("query", e.target.value);
                  return prev;
                })
              }
            />
            <button
              onClick={() => onSearchClick()}
              className=" transition-colors bg-indigo-400 hover:bg-indigo-400  p-1 rounded-tr-[5px] rounded-br-[5px]"
            >
              <AiOutlineSearch color="white" size={35} />
            </button>
          </div>
        </div>

        <div className="flex justify-end gap-1 px-2 flex-1">
          <CustomSelect
            width={"150px"}
            initialState={"all"}
            options={allCategory}
            selectedOption={category}
            setSelectedOption={(cat) =>
              setSearchParams((prev) => {
                prev.set("category", cat);
                prev.set("page", 1);
                prev.set("query", "");
                return prev;
              })
            }
          />
        </div>
      </div>

      <div
        className={`${
          isAddCategoryOpen
            ? "pointer-events-auto"
            : "pointer-events-none opacity-0"
        } fixed inset-0 z-50 flex items-center justify-center`}
      >
        {/* Background overlay */}
        <div
          className={`fixed ${
            isAddCategoryOpen ? "opacity-40" : "opacity-0"
          } inset-0 transition-opacity duration-300 bg-black `}
          onClick={() => setAddCategoryOpen(false)}
        ></div>
        <div className="bg-slate-300 h-[35%] z-20 w-full md:w-[400px] md:max-w-screen-sm mx-auto flex flex-col justify-center gap-2 p-4 md:p-6 rounded shadow-md">
          <h2 className="text-xl md:text-2xl text-center font-semibold mb-4 text-indigo-400">
            Add Category
          </h2>
          <input
            type="text"
            placeholder="Enter category name"
            className="w-full border border-gray-300 rounded px-3 py-2 outline-none text-gray-700"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
          />
          {error && <p className="mt-2 text-red-500 text-sm">{error}</p>}
          <div className="mt-4 flex justify-between px-8">
            <button
              disabled={
                categoryName.length < 2 ||
                categoryName === "All" ||
                categoryName === "all"
              }
              className="disabled:bg-slate-400 disabled:cursor-not-allowed px-4 py-2 w-[30%] bg-green-600 text-white rounded transition-colors duration-300 hover:bg-green-800 focus:outline-none"
              onClick={handleAddCategory}
            >
              Add
            </button>
            <button
              className="w-[30%] px-4 py-2 border bg-gray-600 text-white rounded transition-colors duration-300 hover:bg-gray-800 focus:outline-none"
              onClick={() => setAddCategoryOpen(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;
