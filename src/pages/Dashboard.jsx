import { useEffect, useRef, useState } from "react";
import {
  FaEllipsisH,
  FaEnvelope,
  FaPenAlt,
  FaUser,
  FaUserAlt,
} from "react-icons/fa"; // Import the three dots React-icon
import { MdOutlineCancel } from "react-icons/md";
import UserCard from "../components/UserCard";
import CardSkeleton from "../sckeleton/CardSkeleton";
import ProfileCardSkeleton from "../sckeleton/ProfileCardSkeleton";
import UpdateProfileModal from "../components/UpdateProfileModal";
import PlayGround from "./Editor";

function Dashboard() {
  document.title = "Dashboard | User";
  const [openModal, setOpenModal] = useState(false);
  const [data, setData] = useState(null);
  // Use state to manage button visibility
  const [isEditButtonsVisible, setIsEditButtonsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      const response = await fetch(`https://blog-app-api-x1ut.onrender.com/getUserData`, {
        credentials: "include",
      });
      const data = await response.json();
      setIsLoading(false);
      setData({ ...data });
    };
    getData();
  }, [setData, setIsLoading]);

  const dropdownRef = useRef(null);
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsEditButtonsVisible(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);
  const [addMode, setAddMode] = useState(false);
  return (
    <div className="flex flex-col relative min-h-screen px-2 md:px-40 bg-indigo-100">
      {isLoading ? (
        <ProfileCardSkeleton />
      ) : (
        <div className="flex w-full z-10 bg-white px-2 md:px-40 mt-10 border-b-4 rounded-md border-indigo-600 border-solid relative">
          <div className="w-full p-2">
            {/* User Profile Information */}

            <div className="flex md:gap-4 max-md:flex-col gap-2 w-full">
              <img
                src={data?.user?.imageUrl}
                alt="User Profile"
                width={500}
                height={500}
                className="h-32 w-32 rounded-full object-cover"
              />
              <div className="bg-white border-l-8 border-indigo-300 p-4 rounded shadow-md items-start basis-1/3 flex flex-col">
                <h3 className="text-xl font-semibold text-indigo-950 mb-2 flex gap-1 items-center">
                  <FaUser className="text-indigo-950 text-xl mr-2" /> Name
                </h3>
                <p className="text-gray-600">{data?.user?.name}</p>
              </div>
              <div className="bg-white p-4 border-l-8 border-indigo-300 rounded shadow-md items-start basis-1/3 flex flex-col">
                <h3 className="text-xl font-semibold text-indigo-950 mb-2 flex gap-1 items-center">
                  <FaEnvelope className="text-indigo-950 text-xl mr-2" /> Email
                </h3>
                <p className="text-gray-600">{data?.user?.email}</p>
              </div>
            </div>
          </div>

          <button
            ref={dropdownRef}
            className=" text-gray-600 absolute right-5 top-5 hover:text-black focus:outline-none"
            onClick={() => setIsEditButtonsVisible((prev) => !prev)}
          >
            <FaEllipsisH className="threedot" />
            <div
              className={`modal mt-4 flex flex-col gap-1 w-max absolute right-0 top-2 bg-indigo-400 rounded transition-all duration-300 ${
                isEditButtonsVisible
                  ? "opacity-100 pointer-events-auto translate-y-0"
                  : "opacity-0 pointer-events-none translate-y-10"
              }`}
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenModal(true);
                }}
                className=" flex gap-1 items-center p-2 text-white w-full rounded-sm mr-4 transition-colors duration-300 hover:bg-indigo-600"
              >
                <FaUserAlt size={15} /> Edit Profile
              </button>
              <button
                onClick={(e) => {
                  setAddMode(true);
                }}
                className=" flex gap-1  items-center text-white w-full p-2 rounded-sm transition-colors duration-300 hover:bg-indigo-600"
              >
                <FaPenAlt size={15} /> Write Blog
              </button>
            </div>
          </button>
        </div>
      )}
      <div className="px-1 lg:mt-8 mt-4">
        <h1 className="text-indigo-600 text-2xl my-4 font-bold">Your Posts</h1>
      </div>

      <div className="px-1 gap-5 mb-2  grid grid-cols-1 md:grid-cols-2 md:mt-0 lg:grid-cols-3 ">
        {isLoading ? (
          <>
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
          </>
        ) : (
          <>
            {data?.user?.posts?.map((post) => {
              return <UserCard key={post._id} post={post} user={data.user} />;
            })}
          </>
        )}
      </div>
      {openModal && (
        <UpdateProfileModal
          setData={setData}
          onClose={() => setOpenModal(false)}
          name={data.user.name}
        />
      )}
      {addMode && (
        <div className="absolute z-[30] top-0 w-full h-full left-0">
          <button
            className="absolute top-5 right-5 hover:bg-gray-400 rounded-full p-1 transition-colors"
            onClick={() => setAddMode(false)}
          >
            <MdOutlineCancel size={30} />
          </button>
          <PlayGround
            onAdd={(data) =>
              setData((prev) => ({
                ...prev,
                user: {
                  ...prev.user,
                  posts: [...prev.user.post, data],
                },
              }))
            }
            onClose={() => setAddMode(false)}
          />
        </div>
      )}
    </div>
  );
}

export default Dashboard;
