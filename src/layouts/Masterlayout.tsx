import { useState } from "react";
import Navbar from "../sharedmodule/navbar/Navbar";
import SideBar from "../sharedmodule/sidebar/sidebar";
import { Outlet } from "react-router-dom";

function MasterLayout(){
    const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
    return(
        <>
        <div className="min-h-screen flex flex-col">
      
           {/* Navbar */}
            <Navbar setIsCollapsed={setIsCollapsed} />

           {/* Body */}
            <div className="flex flex-1">
            <SideBar
                isCollapsed={isCollapsed}
                setIsCollapsed={setIsCollapsed} 
            />

           <div className={`flex-1 p-3 transition-all duration-300 ${
                isCollapsed ? "ml-0" : "ml-0" }`}>
              
              <Outlet />
           </div>
      </div>
    </div>
    </>
    )
}
export default MasterLayout;


