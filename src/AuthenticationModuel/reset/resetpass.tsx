// import { FaUser, FaUserPlus } from 'react-icons/fa';
import { FaCheckCircle,  FaRegEnvelope ,  FaKey, FaLongArrowAltDown } from "react-icons/fa";
import logo from '../../assets/logo.png';
import { useNavigate } from 'react-router-dom';
import { baseURL , User_URL} from '../../constants/api';
import type { AxiosError } from 'axios';
import axios from 'axios';
import {useForm} from 'react-hook-form';
import { toast } from 'react-toastify';

interface ResetInputs {
  email: string;
  password: string;
  confirmPassword: string;
  otp: string;
}

interface ResetResponse {
  token: string;
}

function ResetPass(){
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ResetInputs>();

  const password = watch("password");

  const onSubmit =async(data:ResetInputs) =>{
    try {
        const { confirmPassword, ...rest } = data;
      const response = await axios.post<ResetResponse>(
        `${baseURL}${User_URL.RESETPASS}`,rest
      );
      console.log(response)
      toast.success("Password reset successfully")
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
        <h1>Reset Password</h1>
      </div>
      
      {/* form */}
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}> 
        <div>
            <label className="block mb-2 text-sm">Your email address </label>
          <div className="relative">
              <FaRegEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type="email"  placeholder="type your email"
                {...register("email", {
                  required: "email is required",
                  pattern: {
                    value: /^\S+@\S+\.\S+$/,
                    message: "Invalid email format",
                  }
                })}
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-transparent border border-gray-500 focus:outline-none focus:border-lime-400"
              />
          </div>
            {errors.email && <p>{errors.email.message}</p>}
        </div>
        <div>
          <label className="block mb-2 text-sm">OTP</label>
          <div className="relative">
            <FaRegEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
      
          <input
            type="text"
            placeholder="Enter OTP"
            {...register("otp", {
              required: "OTP is required",
            })}
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-transparent border border-gray-500 focus:outline-none focus:border-lime-400"
          />
          <FaLongArrowAltDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
          {errors.otp && <p>{errors.otp.message}</p>}
        </div>

        <div>
          <label className="block mb-2 text-sm">Password</label>
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
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-transparent border border-gray-500 focus:outline-none focus:border-lime-400"
          />
          </div>
          {errors.password && <p>{errors.password.message}</p>}
        </div>
        <div>
          <label className="block mb-2 text-sm">Confirm Password</label>
           <div className="relative">
          <FaKey className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="password"
            placeholder="confirm your password"
            {...register("confirmPassword", {
              required: "confirmpassword is required",
              minLength:{
                value:6,
                message:"Minimum 6 characters"
              }
            })}
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-transparent border border-gray-500 focus:outline-none focus:border-lime-400"
          />
          </div>
          {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
        </div>
        
          <button 
            type="submit" 
            disabled={isSubmitting}
            className="bg-gray-200  flex items-center gap-2 text-black px-6 py-3 rounded-lg font-semibold disabled:opacity-50"
          >
          <span>  Reset</span> <FaCheckCircle className="text-xl" />
          </button>
      
      </form>
    </>
  )
}
export default ResetPass;
