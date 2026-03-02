import { FaCheckCircle,  FaRegEnvelope  } from "react-icons/fa";
import logo from '../../assets/logo.png';
import { useNavigate } from 'react-router-dom';
import type { AxiosError } from 'axios';
import axios from 'axios';
import { User_URL, baseURL } from '../../constants/api';
import {useForm} from 'react-hook-form';
import { toast } from 'react-toastify';

interface ForgetInputs {
  email: string;
}

interface ForgetResponse {
  message: string;
}

function ForgetPass(){
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgetInputs>();

  const onSubmit = async(data:ForgetInputs) =>{
    try {
      const response = await axios.post<ForgetResponse>(
        `${baseURL}${User_URL.FORGETPASS}`, data
      );
      console.log(response)
      toast.success("Email sent successfully")
      navigate("/resetpass")
      
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
      <div className="text-yellow-400 text-xl mb-16 mt-7">
        <h1>Forgot password</h1>
      </div>
      

      {/* forget form */}
      <form className="" onSubmit={handleSubmit(onSubmit)}> 

        {/* email */}
        <div>
          <label className="block mb-2 text-sm">
            Email address
          </label>
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
       
        {/* Button */}
        <button 
          type="submit" 
          disabled={isSubmitting}
          className=" bg-gray-200 flex items-center gap-2 my-24 text-black px-6 py-3 rounded-lg font-semibold disabled:opacity-50"
        >
         <span> {isSubmitting ? "Sending..." : "Send email"} </span>
          <FaCheckCircle className="text-xl" />
        </button>

        <div className='text-right space-y-4'>
          <span className='text-sm text-gray-400'>Login? </span>
          <a onClick={()=>navigate("/login")} 
                className="text-yellow-400 cursor-pointer hover:underline text-sm">
            Click here
          </a>
        </div>
      </form>
    </>
  )
}
export default ForgetPass;
