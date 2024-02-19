import Loader from "../components/Loader";
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import {
  FaArrowLeft,
  FaEye,
  FaEyeSlash,
  FaTrash,
  FaUpload,
} from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";

const Signup = () => {
  const [sendOTPLoading, setSendOtpLoading] = useState(false);
  const [verifyLoading, setVerifyLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [otpSend, setOtpSend] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [otp, setOtp] = useState("");
  const [data, setData] = useState({
    name: "",
    email: "",
    image: null,
    password: "",
  });
  const [error, setError] = useState({
    name: {
      message: "",
    },
    email: {
      message: "",
    },
    password: {
      message: "",
    },
    image: {
      message: "",
    },
    otp: {
      message: "",
    },
  });
  const navigate = useNavigate();

  const sendOtpHandler = async (e) => {
    // e.preventDefault();

    if (!data.email) {
      setError((prev) => ({
        ...prev,
        email: { message: "Fill This Email Field" },
      }));
      return;
    }

    try {
      setSendOtpLoading(true);
      const response = await fetch('https://blog-app-api-x1ut.onrender.com/send-otp',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({email:data.email})});
      const {success,message} = await response.json();
      setSendOtpLoading(false);
      if(success){
        toast.success(message)
        setOtpSend(true);
      }else{
        toast.error(message)
      }
    } catch (error) {
      console.log(error)
      toast.error('Something Went Wrong')
      setSendOtpLoading(false);
    }
  };

  const verifyHandler = async () => {
    if (!otp) {
      setError((prev) => ({
        ...prev,
        otp: { message: "Fill This Email Field" },
      }));
      return;
    }
    if (otp.length < 6) {
      setError((prev) => ({
        ...prev,
        otp: { message: "Otp Has Minimum 6 Characters" },
      }));
      return;
    }

    try {
      setVerifyLoading(true);
      const response = await fetch('api/verify-otp',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({otp,email:data.email})});
      const {success,message} = await response.json();
      setVerifyLoading(false);
      if(success){
      setOtpVerified(true);
      toast.success(message)
      }else{
        toast.error(message)
      }
    } catch (error) {
      console.log(error);
      toast.error('Something Went Wrong')
    }
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleImageUpload = (e) => {
    const reader = new FileReader();
    const imageFile = e.target.files[0];
    if (imageFile) {
      reader.onload = () => {
        // Set the image data in your state
        setError((prev) => ({ ...prev, image: { message: "" } }));
        setData((prev) => ({
          ...prev,
          image: reader.result, // This will contain the base64 data of the image
        }));
        setProfileImage(URL.createObjectURL(imageFile));
      };
      reader.readAsDataURL(imageFile); // Read the image file as a data URL
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!otpVerified){
      setError((prev) => ({
        ...prev,
        email: { message: "Verfiy The Email To Signup" },
      }));
      return;
    }

    if (!data.name) {
      setError((prev) => ({
        ...prev,
        name: { message: "Fill This Name Field" },
      }));
      return;
    }

    if (!data.email) {
      setError((prev) => ({
        ...prev,
        email: { message: "Fill This Email Field" },
      }));
      return;
    }

    if (!data.image) {
      setError((prev) => ({
        ...prev,
        image: { message: "Upload Image To SignUp" },
      }));
      return;
    }

    if (!data.password) {
      setError((prev) => ({
        ...prev,
        password: { message: "Fill This Password Field" },
      }));
      return;
    }

    if (data.password.length < 8) {
      setError((prev) => ({
        ...prev,
        password: { message: "Password Must Be 8 Characters" },
      }));
      return;
    }
    setIsLoading(true);
    const responce = await fetch("https://blog-app-api-x1ut.onrender.com/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const resData = await responce.json();
    setIsLoading(false);
    if (resData.success) {
      toast.success(resData.message);
      navigate('/login')
    } else {
      toast.error(resData.message);
    }
  };

  const removeError = (field) => {
    setError((prev) => ({
      ...prev,
      [field]: { message: "" },
    }));
  };

  const onchangeHandler = (e) => {
    const { name, value } = e.target;
    if (name === "name") {
      removeError(name);
    }

    if (name === "email") {
      removeError(name);
    }

    if (name === "password") {
      removeError(name);
    }
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const [showDelete, setShowDelete] = useState(false);
  const removeImage = () => {
    setProfileImage(null);
    setData((prev) => ({ ...prev, image: null }));
  };

  const onFocus = (e) => {
    e.target.classList.add("custom-shadow");
  };

  const onBlur = (e) => {
    e.target.classList.remove("custom-shadow");
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100 px-1 md:px-0">
      <div className="w-full sm:max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl flex justify-center items-center font-semibold mb-4">
          <div className="basis-[40%] text-xl flex justify-start">
            <Link to={"/"}>
              <FaArrowLeft />
            </Link>{" "}
          </div>

          <div className="flex-1 flex justify-start">Signup</div>
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={data.name}
              onChange={onchangeHandler}
              className={`${
                error.name.message !== "" &&
                "border-red-400 border-solid border-[1px]"
              } w-full px-3 py-2 border rounded outline-none transition-shadow`}
              onFocus={onFocus}
              onBlur={onBlur}
            />
            {error.name.message && (
              <p className="text-red-500">{error.name.message}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={data.email}
              disabled={otpVerified}
              onChange={onchangeHandler}
              className={`w-full ${
                error.email.message !== "" &&
                "border-red-400 border-solid border-[1px]"
              } px-3 py-2 border rounded outline-none transition-shadow`}
              onFocus={onFocus}
              onBlur={onBlur}
            />
            {error.email.message && (
              <p className="text-red-500">{error.email.message}</p>
            )}
            {(!otpVerified&&!otpSend)&&<button
              type="button"
              onClick={sendOtpHandler}
              disabled={sendOTPLoading}
              className={`w-full mt-4 bg-indigo-600 flex items-center justify-center text-white py-2 rounded hover:bg-indigo-700 transition-all duration-300`}
            >
              {sendOTPLoading ? <Loader size={"30px"} /> : "Send OTP"}
            </button>}
          </div>

          {otpSend && !otpVerified && (
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">
                OTP
              </label>
              <input
                type="number"
                name="otp"
                value={otp}
                onChange={(e) => {
                  setError((prev) => ({ ...prev, otp: { message: "" } }));
                  setOtp(e.target.value);
                }}
                className={`w-full ${
                  error.otp.message !== "" &&
                  "border-red-400 border-solid border-[1px]"
                } px-3 py-2 border rounded outline-none transition-shadow`}
                onFocus={onFocus}
                onBlur={onBlur}
              />
              {error.otp.message && (
                <p className="text-red-500">{error.otp.message}</p>
              )}
              <button
                type="button"
                onClick={verifyHandler}
                disabled={verifyLoading}
                className={`w-full mt-4 bg-indigo-600 flex items-center justify-center text-white py-2 rounded hover:bg-indigo-700 transition-all duration-300`}
              >
                {verifyLoading ? <Loader size={"30px"} /> : "Verify OTP"}
                
              </button>
            </div>
          )}

          {otpVerified&&<p className="text-green-500 mb-4 text-center">Email Verified Successfully</p>}

          <div className="mb-4">
            <label
              htmlFor="image"
              className={`flex ${
                error.image.message !== "" &&
                "border-red-400 border-solid border-[1px]"
              } gap-1 hover:bg-indigo-700 transition-colors duration-300 justify-center bg-indigo-600 items-center text-white p-2 rounded cursor-pointer font-semibold mb-2`}
            >
              Profile Image <FaUpload />
            </label>
            {error.image.message && (
              <p className="text-red-500">{error.image.message}</p>
            )}
            <input
              type="file"
              id="image"
              accept="image/*"
              className="w-full hidden"
              onChange={handleImageUpload}
            />
            <div
              className={`mt-2 w-16 overflow-hidden transition-all duration-500 ${
                profileImage ? "max-h-[500px]" : "max-h-0"
              } relative rounded-full flex items-center justify-center`}
              onMouseOver={() => setShowDelete(true)}
              onMouseLeave={() => setShowDelete(false)}
            >
              {profileImage && (
                <img
                  src={profileImage}
                  alt="Profile"
                  className={`mt-2 object-cover rounded-full transition-all ${
                    showDelete ? "brightness-75" : "brightness-100"
                  }`}
                />
              )}
              <FaTrash
                size={20}
                onClick={removeImage}
                className={`${
                  showDelete
                    ? "opacity-100 pointer-events-auto"
                    : "opacity-0 pointer-events-none"
                } transition-opacity duration-300 cursor-pointer absolute top-[40%] text-red-400`}
              />
              <RxCross2
                size={30}
                onClick={removeImage}
                className={` md:hidden cursor-pointer absolute text-red-400`}
              />
            </div>
          </div>
          <div
            className={`${error.password.message === "" && "mb-4"} relative`}
          >
            <label className="block text-gray-700 font-semibold mb-2">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={data.password}
              onChange={onchangeHandler}
              className={` ${
                error.password.message !== "" &&
                "border-red-400 border-solid border-[1px]"
              } w-full px-3 py-2 border rounded pr-10 outline-none transition-shadow`}
              onFocus={onFocus}
              onBlur={onBlur}
            />

            <button
              type="button"
              className="absolute top-[50%] right-0 mt-2 mr-2 text-gray-600"
              onClick={handleTogglePassword}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          {error.password.message && (
            <p className="text-red-500 mb-4">{error.password.message}</p>
          )}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full bg-indigo-600 disabled:cursor-not-allowed disabled:bg-indigo-400 flex items-center justify-center text-white py-2 rounded hover:bg-indigo-700 transition-all duration-300`}
          >
            {isLoading ? <Loader size={"30px"} /> : "Sign Up"}
          </button>
        </form>
        <div className="mt-4 text-center">
          <button
            className="text-indigo-600 hover:underline"
            onClick={() => navigate("/login")}
          >
            Already have an account? Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
