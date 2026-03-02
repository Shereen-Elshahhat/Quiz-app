import { FaCheckCircle, FaKey } from "react-icons/fa";
import logo from '../../assets/logo.png';
import { useNavigate } from 'react-router-dom';
import { baseURL , User_URL} from '../../constants/api';
import type { AxiosError } from 'axios';
import axios from 'axios';
import {useForm} from 'react-hook-form';
import { toast } from 'react-toastify';

interface ChangeInputs {
  password: string;
  newPassword: string;
  confirmPassword: string;
}

interface changeResponse {
  token: string;
}

function ChangePass(){
  const navigate = useNavigate();
  const { register, handleSubmit, watch, 
    formState: { errors, isSubmitting } } = useForm<ChangeInputs>();

  const newPassword = watch("newPassword");

  const onSubmit = async (data: ChangeInputs) =>{
    try {
      const token = localStorage.getItem("token");
      const { confirmPassword, ...rest } = data;
      
      const response = await axios.post<changeResponse>(
        `${baseURL}${User_URL.CHANGEPASS}`,
        rest,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      localStorage.setItem("token", response.data.token);
      console.log(response)
      toast.success("Password changed successfully")
      navigate("/login")

    } catch (error) {
      const err = error as AxiosError<{message:string}>;
      console.log(err)
      toast.error(err.response?.data?.message || "Something went wrong")
    }
  }
  return(
    <>
      {/* logo img */}
      <div className="w-[200px] h-[45px] bg-cover bg-center bg-no-repeat" style={{backgroundImage: `url(${logo})`}}></div>
      
      {/* title */}
      <div className="text-yellow-400 text-xl my-5">
        <h1>Change Password</h1>
      </div>
      
      {/* form */}
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}> 
        
        <div>
          <label className="block mb-2 text-sm">Old Password</label>
            <div className="relative">
                    <FaKey className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    
          <input
            type="password"
            placeholder="type your password"
            {...register("password", {
              required: "password is required",
              minLength:{
                value:6,
                message:"Minimum 6 characters"
              }
            })}
            className="w-full pl-10 pr-4 py-3 rounded-lg bg-transparent border border-gray-500 focus:outline-none focus:border-lime-400"
          />
          </div>
          {errors.password && <p>{errors.password.message}</p>}
        </div>
        <div>
          <label className="block mb-2 text-sm">New Password</label>
           <div className="relative">
                   <FaKey className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                   
          <input
            type="password"
            placeholder="type your new password"
            {...register("newPassword", {
              required: "New password is required",
              minLength:{
                value:6,
                message:"Minimum 6 characters"
              }
            })}
            className="w-full pl-10 pr-4 py-3 rounded-lg bg-transparent border border-gray-500 focus:outline-none focus:border-lime-400"
          />
          </div>
          {errors.newPassword && <p>{errors.newPassword.message}</p>}
        </div>
        <div>
          <label className="block mb-2 text-sm">Confirm New Password</label>
           <div className="relative">
                   <FaKey className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                   
          <input
            type="password"
            placeholder="confirm your new password"
            {...register("confirmPassword", {
              required: "Confirm password is required",
              validate: (value) =>
                value === newPassword || "Passwords do not match",
            })}
            className="w-full pl-10 pr-4 py-3 rounded-lg bg-transparent border border-gray-500 focus:outline-none focus:border-lime-400"
          />
          </div>
          {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
        </div>
 <button 
            type="submit" 
            disabled={isSubmitting}
            className="bg-gray-200  flex items-center gap-2 text-black px-6 py-3 rounded-lg font-semibold disabled:opacity-50"
          >
          <span> Change</span> <FaCheckCircle className="text-xl" />
          </button>
      </form>
    </>
  )
}
export default ChangePass;
