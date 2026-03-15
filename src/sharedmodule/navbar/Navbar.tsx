import React from "react";
// import { Dispatch, SetStateAction } from "react";
import { FaBars, FaBell, FaEnvelope } from "react-icons/fa";
import user from '../../assets/user.jpg';
import NavLogo from '../../assets/Logo icon.png'
import { useAuth } from "../../context/Authcontext";
import { useLocation } from "react-router-dom";

interface NavbarProps {
  setIsCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}

function Navbar({ setIsCollapsed }: NavbarProps) {
    const { loginData } = useAuth();
    const location = useLocation();

    const titles: Record<string,string> ={
      "/dashboard/students" : "Students",
      "/dashboard/groups" : "Groups",
      "/dashboard/quizzes" : "Quizzes",
      "/dashboard/results" : "Results",
    }
    const pageTittle = titles[location.pathname] || "Dashboard"
  return (
    <>
    <div className="bg-white px-6  py-1 py-0 flex justify-between items-center border-b-1">

      {/* Left */}
     <div className="flex items-center ">
      <div className="flex items-center gap-4 pr-2 border-r-1">
        <button onClick={() => setIsCollapsed(prev => !prev)} >
          <FaBars size={25} />
        </button>
        <div className="hidden md:block w-22 h-15 bg-cover bg-center mr-2"
         style={{ backgroundImage: `url(${NavLogo})` }}
        ></div>
      </div>
        {/* center */}
      <div className="ml-2">
        <h2 className="p-2 md:p-0">{pageTittle}</h2>
      </div>
      </div>

      

      {/* Right */}
      <div className="hidden md:flex  items-center gap-6 ">
       <FaEnvelope className="cursor-pointer" />
        <FaBell className="cursor-pointer" />

        <div className="flex text-left border-l-1">
          <div className="ml-2">
            <p className="font-medium">{loginData?.email}</p>
            <p className="text-sm text-green-600">{loginData?.role}</p>
          </div>
          <div className="w-12 h-12 ml-2 rounded-full bg-cover bg-center"
               style={{ backgroundImage: `url(${user})` }}
          ></div>
          
        </div> 
      </div>
    </div>
    </>
  );
}

export default Navbar;