import img from '../assets/auth.png';
import { Outlet } from 'react-router-dom';

function AuthLayout(){
    return(
      <div className="min-h-screen flex items-center justify-center bg-[#0D1321]">

        <div className="w-full max-w-7xl min-h-[600px] flex overflow-hidden">

          {/* Left Side (Form) */}
          <div className="w-full lg:w-1/2 p-8 text-white flex flex-col">
            <Outlet/>
          </div>

          {/* Right Side (Image) */}
          <div
            className="hidden lg:block w-1/2 bg-[#FFEDDF] bg-cover bg-center bg-no-repeat rounded-xl"
            style={{ backgroundImage: `url(${img})` }}
          ></div>

        </div>

      </div>
    )
}

export default AuthLayout;