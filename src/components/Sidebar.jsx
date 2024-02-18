import React from "react";
import { RxCross2 } from "react-icons/rx";
import { FiSearch } from "react-icons/fi";
import CustomSelect from "../adminComponents/CustomSelect";
import { TbReload } from "react-icons/tb";

const Sidebar = ({
  menuRef,
  open,
  setOpen,
  category,
  query,
  onSearchClick,
  allCategory,
  setSearchParams,
}) => {
  const resetHandler = () => {
    setSearchParams((prev) => {
      prev.set("category", "all");
      prev.set("query", "");
      prev.set("page", 1);
      return prev;
    });
    onSearchClick();
  };
  return (
    <div
      ref={menuRef}
      className={`bg-slate-300 p-4 lg:w-1/4 lg:static absolute transition-all ${open?'left-0':'-left-full'} w-[75%] z-20 h-screen `}
    >
      {/* Search */}
      <div className="flex justify-end px-1 md:hidden">
        <RxCross2 size={25} onClick={() => setOpen(false)} />
      </div>
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Search</h3>
        <div className="flex">
          <input
            type="search"
            className="w-full p-2 border rounded-l outline-none"
            placeholder="Search..."
            value={query}
            onKeyDown={(e) => e.key == "Enter" && onSearchClick()}
            onChange={(e) =>
              setSearchParams((prev) => {
                prev.set("query", e.target.value);
                prev.set("category", "all");
                prev.set("page", 1);
                return prev;
              })
            }
          />
          <button
            disabled={query.length < 1}
            className="bg-gray-400 px-3 rounded"
            onClick={() => {
              onSearchClick();
              setOpen(false);
            }}
          >
            <FiSearch size={20} />
          </button>
        </div>
      </div>
      {/* Category Filter */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Filter by Category</h3>

        <CustomSelect
          width={"100%"}
          initialState={"all"}
          options={allCategory}
          selectedOption={category}
          setSelectedOption={(option) =>
            setSearchParams((prev) => {
              prev.set("category", option);
              prev.set("query", "");
              prev.set("page", 1);
              return prev;
            })
          }
        />
      </div>
      <div className="mb-4">
        <button
          onClick={resetHandler}
          className="w-full flex rounded justify-center items-center gap-1 text-white p-2 bg-indigo-400 transition-colors duration-300 hover:bg-indigo-600"
        >
          Reset <TbReload size={20} />
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
