import React, { useState } from "react";
import toast from "react-hot-toast";
import { FaUserEdit } from "react-icons/fa";
import { RxCrossCircled } from "react-icons/rx";
import DeleteCard from "../adminComponents/DeleteCard";

function UpdateProfileModal({ name: username, onClose, setData }) {
  const [isPasswordChangeVisible, setPasswordChangeVisible] = useState(false);
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [name, setName] = useState(username);
  const [DeleteOpen, setDeleteOpen] = useState(false);
  const [error, setError] = useState("");

  const handlePasswordChange = async () => {
    if (!otp) {
      setError("Enter OTP To Proceed");
      return;
    }

    if (!newPassword) {
      setError("Enter Password To Proceed");
      return;
    }

    try {
      const response = await fetch("/api/verify-and-change-password", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ otp, password: newPassword }),
      });

      const data = await response.json();

      if (data.success) {
        toast.success(data.message);
        setPasswordChangeVisible(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const sendOtp = async () => {
    try {
      setPasswordChangeVisible(true);
      const response = await fetch("/api/change-password-otp", {
        credentials: "include",
      });
      const data = await response.json();
      if (data.success) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [nameError, setNameError] = useState("");

  const nameChangeHandler = async (e) => {
    e.preventDefault();
    if (name.length < 1) {
      setNameError("Fill This Name Field");
      return;
    }
    try {
      setData((prev) => ({ ...prev, user: { ...prev.user, name: name } }));
      toast.success("Name Updated Successfully");
      const response = await fetch("/api/update-name", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-40 px-1"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-lg relative shadow-lg z-50 transition-all md:w-[30%] w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute rounded-full transition-colors duration-300 hover:bg-slate-300 p-2 top-5 right-5"
        >
          <RxCrossCircled size={25} />
        </button>
        <h2 className="text-xl font-semibold mb-4 flex gap-1 items-center text-indigo-400">
          <FaUserEdit size={28} /> Edit Your Profile
        </h2>
        <label htmlFor="name" className="block mb-2 font-semibold">
          Name
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={`border  px-3 py-2 outline-none rounded w-full ${
            nameError ? "border-red-400" : "border-gray-300"
          } `}
        />

        {nameError && <p className="text-red-400 mt-4">{nameError}</p>}

        <div className="mt-4">
          <button
            onClick={nameChangeHandler}
            disabled={username === name}
            className="bg-indigo-400 disabled:bg-gray-500 w-full transition-colors duration-200 hover:bg-indigo-600 p-2 rounded text-white"
          >
            Update Name
          </button>
        </div>

        {/* Password Change Section */}
        {isPasswordChangeVisible ? (
          <div className="mt-4">
            <label htmlFor="otp" className="block mb-2 font-semibold">
              Enter OTP
            </label>
            <input
              type="number"
              id="otp"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="border outline-none border-gray-300 px-3 py-2 rounded w-full mb-4 "
            />

            <label htmlFor="newPassword" className="block mb-2 font-semibold">
              New Password
            </label>
            <input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="border outline-none border-gray-300 px-3 py-2 rounded w-full mb-4"
            />

            <button
              onClick={handlePasswordChange}
              className="bg-indigo-400 w-full transition-colors duration-20 p-2 rounded text-white"
            >
              Update Password
            </button>
          </div>
        ) : (
          <div className="mt-4">
            <button
              onClick={()=>setDeleteOpen(true)}
              className="bg-indigo-400 w-full transition-colors duration-200 hover:bg-indigo-600 p-2 rounded text-white"
            >
              Change Password
            </button>
          </div>
        )}
      </div>
      <DeleteCard yes={'Yes'} no={'No'} message="Are You Want To Send OTP On Your Mail?" onClose={()=>setDeleteOpen(false)} onDelete={()=>{setDeleteOpen(false);sendOtp()}} isOpen={DeleteOpen}/>
    </div>
  );
}

export default UpdateProfileModal;
