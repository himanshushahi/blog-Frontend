import { Link, useLocation, useNavigate } from 'react-router-dom';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { FaArrowCircleRight } from 'react-icons/fa';
import AdminContext from '../context/adminContext';

function Navbar() {
  const navigate = useNavigate();
  const { setAdminLogin } = useContext(AdminContext);

  const logoutAdmin = async () => {
    const response = await fetch('/api/admin-logout', { method: 'POST' });
    if (response.ok) {
      setAdminLogin(false);
      navigate('/admin-login');
    }
  };

  const { pathname } = useLocation();
  const [width,setWidth] = useState(0)
  const [left,setLeft] = useState(0);
  const linkRef = useRef(null);
  useEffect(()=>{
  if(linkRef.current){
    setWidth(linkRef.current.offsetWidth);
    setLeft(linkRef.current.offsetLeft)
  }
  },[pathname,linkRef])

  return (
    <nav className={`bg-slate-200 text-indigo-800 z-50 flex items-center shadow-md p-4 sticky top-0 min-h-[10vh] overflow-hidden`}>
      <div className="container mx-auto flex justify-between items-center">
        <div className=" font-semibold text-xl max-md:hidden">
          Dashboard
        </div>
        <ul className="flex relative gap-2 p-[4px] justify-center">
            <Link
            ref={pathname==='/admin-dashboard/user-blog'?linkRef:null}
              to="/admin-dashboard/user-blog"
              className={` text-xl font-bold max-md:text-base p-2 transition-colors duration-300 hover:text-indigo-500`}
            >
              Users
            </Link>
            <Link
            ref={pathname==='/admin-dashboard/admin-blog'?linkRef:null}
              to="/admin-dashboard/admin-blog"
              className={`text-xl font-bold p-2 max-md:text-base transition-colors duration-300 hover:text-indigo-500`}
            >
              Admin
            </Link>
          <div className='active-indicator' style={{ width: width, backgroundColor:'indigo', transform:`translateX(${left}px)` }}></div>
        </ul>
        <div className="flex justify-end px-5">
          <button
            onClick={logoutAdmin}
            className="flex gap-1 items-center bg-gray-400 justify-center rounded-sm  p-2 font-semibold bg-text-white transition-colors duration-300 hover:bg-gray-500"
          >
            Logout <FaArrowCircleRight size={20} />
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
