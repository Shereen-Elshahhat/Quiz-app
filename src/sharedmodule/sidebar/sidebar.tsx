import React, { useContext, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaTachometerAlt, FaUsers, FaUserGraduate, FaQuestionCircle, FaClipboardList, FaLifeRing } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import { useAuth } from "../../context/Authcontext";

interface SideBarProps {
  isCollapsed: boolean;
  setIsCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}
function SideBar({ isCollapsed, setIsCollapsed }: SideBarProps){
   
    const menu = [
    { name: "Dashboard", icon: <FaTachometerAlt />, path: "/dashboard" },
    { name: "Students", icon: <FaUserGraduate />, path: "/dashboard/students" },
    { name: "Groups", icon: <FaUsers />, path: "/dashboard/groups" },
    { name: "Quizzes", icon: <FaQuestionCircle />, path: "/dashboard/quizzes" },
    { name: "Results", icon: <FaClipboardList />, path: "/dashboard/results" },
    { name: "Log out", icon: <BiLogOut />, path: "/login",action: "logout"},
  ];
   const navigate = useNavigate();
   const {logOutUser,loginData} =useAuth();
    const handleLogout =()=>{
    logOutUser();
    navigate("/auth/login",{replace:true});
  }

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsCollapsed(true); // mobile + tablet
      } else {
        setIsCollapsed(false); // desktop
      }
    };

    handleResize(); // يشتغل أول ما الصفحة تفتح
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [setIsCollapsed]);
    
    const filteredMenu =
  loginData?.role === "Student"
    ? menu.filter(
        (item) =>
          // item.name !== "Dashboard" &&
          item.name !== "Results" &&
          item.name !== "Students" &&
          item.name !== "Groups"
      )
    : menu;
    return(
        <>
        <div className={`bg-white shadow-md transition-all duration-300${
           isCollapsed ? "w-20" : "w-72"
         }`}>

         <div className="p-4 space-y-6">
         
         
        {filteredMenu.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            end={item.path === "/dashboard"}
            onClick={item.action ==="logout"? handleLogout : undefined}
            className={({ isActive }) =>
              `flex items-center gap-4 p-3 rounded-lg transition border-t-1 ${
                isActive
                  ? "bg-[#FFEDDF] font-semibold"
                  : "hover:border-t-1"
              }`
            }
          >
            {item.icon}
            {!isCollapsed && <span>{item.name}</span>}
          </NavLink>
        ))}

        {/* Help */}
        <div className="pt-10">
          <NavLink
            to="/help"
            className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-100"
          >
            <FaLifeRing />
            {!isCollapsed && <span>Help</span>}
          </NavLink>
        </div>

      </div>
      
       </div>
        </>
    )
}
export default SideBar;