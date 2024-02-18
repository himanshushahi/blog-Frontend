import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import AdminContext from "../context/adminContext";

//now useAuth is not a function anymore is a hook (leaves in the component lifecycle).
const useAuth = () => {
  const [isAuth, setIsAuth] = useState(null);
  useEffect(() => {
    const authenticateAdmin = async () => {
      try {
        const response = await fetch("/api/authenticate-admin");
        const data = await response.json();
        setIsAuth(data.success);
      } catch (error) {
        console.log(error);
      }
    };

    authenticateAdmin();
  }, []);

  return isAuth;
};

const NoneAdmin = () => {
  const isAuth = useAuth();
  const navigate = useNavigate();
  if (isAuth === null) {
    return null;
  }

  return isAuth ? navigate('/admin-dashboard/user-blog') : <Outlet />;
};

export default NoneAdmin;
