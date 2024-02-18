import React, { useContext, useState } from "react";
import { FaArrowLeft, FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import { toast } from "react-hot-toast";
import LoginContext from "../context/LoginContext";

const Login= () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { setIsLogin } = useContext(LoginContext);
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState({
    email: {
      message: "",
    },
    password: {
      message: "",
    },
  });

  const removeError = (field) => {
    setError((prev) => ({
      ...prev,
      [field]: { message: "" },
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!data.email) {
      setError((prev) => ({
        ...prev,
        email: { message: "Fill This Email Field" },
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
    const responce = await fetch("/api/login", {
      method: "POST",
      headers:{
        'Content-Type':'application/json',
      },
      body: JSON.stringify(data),
    });

    const resData = await responce.json();
    setIsLoading(false);
    if (resData.success) {
      toast.success(resData.message);
      setIsLogin(true);
      navigate("/");
    } else {
      toast.error(resData.message);
    }
  };
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const onFocus = (e) => {
    e.target.classList.add("custom-shadow");
  };

  const onBlur = (e) => {
    e.target.classList.remove("custom-shadow");
  };

  const handleNavigateToSignup = () => {
    navigate("/signup");
  };

  const onchangeHandler = (e) => {
    const { name, value } = e.target;
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
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100 px-1 md:px-0">
      <div className="w-full sm:max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl flex justify-center items-center font-semibold mb-4">
          <div className="basis-[40%] text-xl flex justify-start">
            <Link to={"/"}>
              <FaArrowLeft />
            </Link>{" "}
          </div>

          <div className="flex-1 flex justify-start">Log In</div>
        </h2>
        <form onSubmit={submitHandler}>
          <div className="mb-4">
            <label className={`block text-gray-700 font-semibold mb-2`}>
              Email
            </label>
            <input
              type="email"
              name="email"
              className={`w-full ${
                error.email.message !== "" &&
                "border-red-400 border-solid border-[1px]"
              } px-3 py-2 border rounded outline-none transition-shadow`}
              onFocus={onFocus}
              onBlur={onBlur}
              onChange={onchangeHandler}
            />
            {error.email.message && (
              <p className="text-red-500">{error.email.message}</p>
            )}
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
            className={`w-full bg-indigo-600 ${
              isLoading && "cursor-wait"
            } flex items-center justify-center text-white py-2 rounded hover:bg-indigo-700 transition-all duration-300`}
          >
            {isLoading ? <Loader size={"30px"} /> : "Login"}
          </button>
        </form>
        <div className="mt-4 text-center">
          <button
            className="text-indigo-600 hover:underline"
            onClick={handleNavigateToSignup}
          >
            Don&apos;t have an account? Sign Up
          </button>
        </div>
        {/* <div className="mt-6 text-center">
          <button className="flex items-center justify-center px-4 py-2 border rounded-full w-full bg-white text-gray-600 hover:bg-gray-100 transition-all duration-300">
            <FaGoogle className="w-5 h-5 mr-2" />
            Log In with Google
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default Login;
