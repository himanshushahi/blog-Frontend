import "./App.css";
import { Route, useLocation, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AdminContext from "./context/adminContext";
import LoginContext from "./context/LoginContext";
import { Suspense, useEffect, useState, lazy } from "react";
import { Toaster } from "react-hot-toast";

const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Contact = lazy(() => import("./pages/Contact"));
const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const PlayGround = lazy(() => import("./pages/Editor"));
const Update = lazy(() => import("./pages/Update"));
const AdminLogin = lazy(() => import("./adminPages/AdminLogin"));
const AdminBlog = lazy(() => import("./adminPages/AdminBlog"));
const UserBlog = lazy(() => import("./adminPages/UserBlog"));
const AdminLayout = lazy(() => import("./AdminLayout"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogDetails = lazy(() => import("./pages/BlogDetails"));
const ProtectedRoutes = lazy(() => import("./ProtectedRoute/ProtectedRoute"));
const ProtectedAdmin = lazy(() => import("./ProtectedRoute/ProtectedAdmin"));
const NoneAdmin = lazy(() => import("./ProtectedRoute/NoneAdmin"));
const ProtectAuthRoutes = lazy(() =>
  import("./ProtectedRoute/ProtectAuthRoute")
);
function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [adminLogin, setAdminLogin] = useState(false);
  useEffect(() => {
    const authenticateuser = async () => {
      try {
        const response = await fetch("https://blog-app-api-x1ut.onrender.com/authenticate-user");
        const data = await response.json();
        setIsLogin(data.success);
      } catch (error) {
        console.log(error);
      }
    };

    const authenticateAdmin = async () => {
      try {
        const response = await fetch("https://blog-app-api-x1ut.onrender.com/authenticate-admin");
        const data = await response.json();
        setAdminLogin(data.success);
      } catch (error) {
        console.log(error);
      }
    };

    authenticateuser();
    authenticateAdmin();
  }, [setAdminLogin, setIsLogin]);
  const { pathname } = useLocation();
  const ignored =
    pathname.includes("/signup") ||
    pathname.includes("/login") ||
    pathname.includes("/admin-dashboard") ||
    pathname.includes("/admin-login");
  const footerIgnored =
    pathname.includes("/blog") ||
    pathname.includes("/signup") ||
    pathname.includes("/login") ||
    pathname.includes("/admin-dashboard") ||
    pathname.includes("/admin-login");

  return (
    <>
      <LoginContext.Provider value={{ isLogin, setIsLogin }}>
        <AdminContext.Provider value={{ adminLogin, setAdminLogin }}>
          {!ignored && <Navbar />}
          <Routes>
            <Route
              path="/"
              element={
                <Suspense
                  fallback={
                    <div className="flex h-[100vh] w-full justify-center items-center">
                      <div className="rounded-full h-16 w-16 border-4 border-b-blue-600 animate-spin"></div>
                    </div>
                  }
                >
                  <Home />
                </Suspense>
              }
            />
            <Route
              path="/about"
              element={
                <Suspense
                  fallback={
                    <div className="flex h-[100vh] w-full justify-center items-center">
                      <div className="rounded-full h-16 w-16 border-4 border-b-blue-600 animate-spin"></div>
                    </div>
                  }
                >
                  <About />
                </Suspense>
              }
            />
            <Route
              path="/contact"
              element={
                <Suspense
                  fallback={
                    <div className="flex h-[100vh] w-full justify-center items-center">
                      <div className="rounded-full h-16 w-16 border-4 border-b-blue-600 animate-spin"></div>
                    </div>
                  }
                >
                  <Contact />
                </Suspense>
              }
            />
            <Route
              path="/blog"
              element={
                <Suspense
                  fallback={
                    <div className="flex h-[100vh] w-full justify-center items-center">
                      <div className="rounded-full h-16 w-16 border-4 border-b-blue-600 animate-spin"></div>
                    </div>
                  }
                >
                  <Blog />
                </Suspense>
              }
            />
            <Route
              path="/blog/:id"
              element={
                <Suspense
                  fallback={
                    <div className="flex h-[100vh] w-full justify-center items-center">
                      <div className="rounded-full h-16 w-16 border-4 border-b-blue-600 animate-spin"></div>
                    </div>
                  }
                >
                  <BlogDetails />
                </Suspense>
              }
            />

            <Route
              element={
                <Suspense
                  fallback={
                    <div className="flex h-[100vh] w-full justify-center items-center">
                      <div className="rounded-full h-16 w-16 border-4 border-b-blue-600 animate-spin"></div>
                    </div>
                  }
                >
                  <ProtectAuthRoutes />
                </Suspense>
              }
            >
              <Route
                path="/login"
                element={
                  <Suspense
                    fallback={
                      <div className="flex h-[100vh] w-full justify-center items-center">
                        <div className="rounded-full h-16 w-16 border-4 border-b-blue-600 animate-spin"></div>
                      </div>
                    }
                  >
                    <Login />
                  </Suspense>
                }
              />
              <Route
                path="/signup"
                element={
                  <Suspense
                    fallback={
                      <div className="flex h-[100vh] w-full justify-center items-center">
                        <div className="rounded-full h-16 w-16 border-4 border-b-blue-600 animate-spin"></div>
                      </div>
                    }
                  >
                    <Signup />
                  </Suspense>
                }
              />
            </Route>

            <Route
              element={
                <Suspense
                  fallback={
                    <div className="flex h-[100vh] w-full justify-center items-center">
                      <div className="rounded-full h-16 w-16 border-4 border-b-blue-600 animate-spin"></div>
                    </div>
                  }
                >
                  <ProtectedRoutes />
                </Suspense>
              }
            >
              <Route
                path="/dashboard"
                element={
                  <Suspense
                    fallback={
                      <div className="flex h-[100vh] w-full justify-center items-center">
                        <div className="rounded-full h-16 w-16 border-4 border-b-blue-600 animate-spin"></div>
                      </div>
                    }
                  >
                    <Dashboard />
                  </Suspense>
                }
              />
            </Route>
            <Route
              element={
                <Suspense
                  fallback={
                    <div className="flex h-[100vh] w-full justify-center items-center">
                      <div className="rounded-full h-16 w-16 border-4 border-b-blue-600 animate-spin"></div>
                    </div>
                  }
                >
                  <ProtectedAdmin />
                </Suspense>
              }
            >
              <Route
                path="/admin-dashboard/user-blog"
                element={
                  <Suspense
                    fallback={
                      <div className="flex h-[100vh] w-full justify-center items-center">
                        <div className="rounded-full h-16 w-16 border-4 border-b-blue-600 animate-spin"></div>
                      </div>
                    }
                  >
                    <AdminLayout>
                      <UserBlog />
                    </AdminLayout>
                  </Suspense>
                }
              />
              <Route
                path="/admin-dashboard/admin-blog"
                element={
                  <Suspense
                    fallback={
                      <div className="flex h-[100vh] w-full justify-center items-center">
                        <div className="rounded-full h-16 w-16 border-4 border-b-blue-600 animate-spin"></div>
                      </div>
                    }
                  >
                    <AdminLayout>
                      <AdminBlog />
                    </AdminLayout>
                  </Suspense>
                }
              />
            </Route>
            <Route
              element={
                <Suspense
                  fallback={
                    <div className="flex h-[100vh] w-full justify-center items-center">
                      <div className="rounded-full h-16 w-16 border-4 border-b-blue-600 animate-spin"></div>
                    </div>
                  }
                >
                  <NoneAdmin />
                </Suspense>
              }
            >
              <Route
                path="/admin-login"
                element={
                  <Suspense
                    fallback={
                      <div className="flex h-[100vh] w-full justify-center items-center">
                        <div className="rounded-full h-16 w-16 border-4 border-b-blue-600 animate-spin"></div>
                      </div>
                    }
                  >
                    <AdminLogin />
                  </Suspense>
                }
              />
            </Route>

            <Route
              path="*"
              element={
                <Suspense
                  fallback={
                    <div className="flex h-[100vh] w-full justify-center items-center">
                      <div className="rounded-full h-16 w-16 border-4 border-b-blue-600 animate-spin"></div>
                    </div>
                  }
                >
                  <NotFound />
                </Suspense>
              }
            />
          </Routes>
          <Toaster />
          {!footerIgnored && <Footer />}
        </AdminContext.Provider>
      </LoginContext.Provider>
    </>
  );
}

export default App;
