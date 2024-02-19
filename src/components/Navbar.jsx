import React, { useState, useEffect, useContext, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import LoginContext from "../context/LoginContext";
import logo from '../assets/logo.avif'
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { isLogin, setIsLogin } = useContext(LoginContext);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
        setMenuOpen(false);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const logoutUser = async () => {
    const response = await fetch("https://blog-app-api-x1ut.onrender.com/logout", { method: "POST" });
    if (response.ok) {
      setIsLogin(false);
      navigate("/", { replace: true });
    }
  };

  const linkRef = useRef(null);
  const [width, setWidth] = useState(0);
  const [left, setLeft] = useState(0);

  useEffect(() => {
    if (linkRef.current) {
      setWidth(linkRef.current.offsetWidth);
      setLeft(linkRef.current.offsetLeft);
    }
  }, [pathname,linkRef]);

  return (
    <nav
      className={`bg-gradient-to-r from-purple-600 z-50 to-indigo-600 p-4 sticky top-0 ${
        isScrolled ? "shadow-md" : ""
      } `}
    >
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white font-semibold text-lg basis-[33%] flex justify-start">
          <img
            src={logo}
            width={500}
            height={500}
            alt="dldlld"
            className="w-14 h-14 rounded-full"
          />
        </div>
        <div
          style={{
            borderBottomRightRadius: "35px",
            borderBottomLeftRadius: "35px",
          }}
          className={`max-md:absolute max-md:top-[100%] max-md:flex max-md:justify-center max-md:items-center max-md:flex-col overflow-hidden transition-all duration-300 max-md:py-2 ${
            menuOpen ? "max-md:left-0" : "max-md:left-[-100%]"
          } max-md:bg-gradient-to-r from-purple-600 z-50 to-indigo-600 w-full md:transition  md:flex md:relative md:justify-center md:gap-2 md:basis-[34%]`}
        >
          <div className="md:hidden flex flex-col gap-1 items-center">
          <Link
            to="/"
            className={`${
              pathname === "/" && "active"
            }  relative text-white transition-all px-2 py-1 duration-500 rounded hover:text-gray-300 `}
          >
            Home
          </Link>
          <Link
            to="/blog"
            className={`${
              pathname.includes("/blog") && "active"
            } text-white relative transition-all px-2 py-1 duration-500 rounded hover:text-gray-300 `}
          >
            Blog
          </Link>
          <Link
            to="/about"
            className={`${
              pathname.includes("/about") && "active"
            } relative text-white transition-colors px-2 py-1 duration-500 rounded hover:text-gray-300 `}
          >
            About
          </Link>

          <Link
            to="/contact"
            className={`${
              pathname.includes("/contact") && "active"
            } text-white relative transition-colors px-2 py-1 duration-500 rounded hover:text-gray-300`}
          >
            Contact
          </Link>
          </div>

          <div className="max-md:hidden flex gap-2 relative items-center">
            <Link
              ref={pathname === "/" ? linkRef : null}
              to="/"
              className={`relative text-white transition-all px-2 py-1 duration-500 rounded hover:text-gray-300 `}
            >
              Home
            </Link>
            <Link
              ref={pathname==="/blog" ? linkRef : null}
              to="/blog"
              className={`text-white relative transition-all px-2 py-1 duration-500 rounded hover:text-gray-300 `}
            >
              Blog
            </Link>
            <Link
              ref={pathname.includes("/about") ? linkRef : null}
              to="/about"
              className={`relative text-white transition-colors px-2 py-1 duration-500 rounded hover:text-gray-300 `}
            >
              About
            </Link>

            <Link
              ref={pathname.includes("/contact") ? linkRef : null}
              to="/contact"
              className={`text-white relative transition-colors px-2 py-1 duration-500 rounded hover:text-gray-300`}
            >
              Contact
            </Link>

            <div
              className="active-indicator"
              style={{ width: width, transform:`translateX(${left}px)` }}
            ></div>
          </div>

          <div className="flex md:hidden justify-end basis-[33%] space-x-4 py-2">
            {isLogin ? (
              <div className="flex gap-1">
                <Link
                  to={"/dashboard"}
                  className="text-white bg-indigo-400 rounded-sm px-3 py-1 transition-colors duration-300 hover:bg-indigo-700"
                >
                  Dashboard
                </Link>
                <button
                  onClick={logoutUser}
                  className="text-white bg-indigo-400 rounded-sm px-3 py-1 transition-colors duration-300 hover:bg-indigo-700"
                >
                  Logout
                </button>
              </div>
            ) : (
              <>
                <Link
                  to={"/login"}
                  className="text-white bg-indigo-400 rounded-sm px-3 py-1 transition-colors duration-300 hover:bg-indigo-700"
                >
                  Login
                </Link>
                <Link
                  to={"/signup"}
                  onClick={() => navigate("/signup")}
                  className="text-white bg-indigo-400 rounded-sm px-3 py-1 transition-colors duration-300 hover:bg-indigo-700"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
        <div className="md:hidden">
          {/* Mobile menu button */}
          <button
            className="text-white"
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            <FiMenu className="w-7 h-7" />
          </button>
        </div>
        <div className="hidden md:flex justify-end basis-[33%] space-x-4">
          {isLogin ? (
            <div className="flex gap-1">
              <Link
                to={"/dashboard"}
                className="text-white bg-indigo-400 rounded-sm px-3 py-1 transition-colors duration-300 hover:bg-indigo-700"
              >
                Dashboard
              </Link>
              <button
                onClick={logoutUser}
                className="text-white bg-indigo-400 rounded-sm px-3 py-1 transition-colors duration-300 hover:bg-indigo-700"
              >
                Logout
              </button>
            </div>
          ) : (
            <>
              <Link
                to={"/login"}
                className="text-white bg-indigo-400 rounded-sm px-3 py-1 transition-colors duration-300 hover:bg-indigo-700"
              >
                Login
              </Link>
              <Link
                to={"/signup"}
                onClick={() => navigate("/signup")}
                className="text-white bg-indigo-400 rounded-sm px-3 py-1 transition-colors duration-300 hover:bg-indigo-700"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
