import {  Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

//now useAuth is not a function anymore is a hook (leaves in the component lifecycle).
const useAuth = () => {
  const [isAuth, setIsAuth] = useState(null);
  useEffect(() => {
    const authenticateuser = async () => {
      try {
        const response = await fetch("/api/authenticate-user");
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

const ProtectAuthRoutes = () => {
  const isAuth = useAuth();
  const navigate = useNavigate()
  if (isAuth === null){
      return null
  }
  

  return isAuth ? navigate(-1) : <Outlet />;
};

export default ProtectAuthRoutes;
