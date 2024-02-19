import {  Outlet, useNavigate } from "react-router-dom";
import {  useEffect, useState } from "react";

//now useAuth is not a function anymore is a hook (leaves in the component lifecycle).
const useAuth = () => {
  const [isAuth, setIsAuth] = useState(null);
  useEffect(() => {
    const authenticateuser = async () => {
      try {
        const response = await fetch("https://blog-app-api-x1ut.onrender.com/authenticate-user");
        const data = await response.json();
        setIsAuth(data.success);
      } catch (error) {
        console.log(error);
      }
    };

    authenticateuser();
  }, []);

  return isAuth;
};

const ProtectedRoutes = () => {
  const isAuth = useAuth();
  const navigate = useNavigate()
  if (isAuth === null){
      return null
  }
  

  return isAuth ? <Outlet /> : navigate(-1);
};

export default ProtectedRoutes;
