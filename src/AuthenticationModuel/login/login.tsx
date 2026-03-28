import { FaCheckCircle, FaUser, FaUserPlus } from 'react-icons/fa';
import logo from '../../assets/logo.png'
import { useNavigate } from 'react-router-dom';
import { baseURL , User_URL} from '../../constants/api';
import type { AxiosError } from 'axios';
import axios from 'axios';
import {useForm} from 'react-hook-form';
import { toast } from 'react-toastify';
import { useAuth } from '../../context/Authcontext';


interface LoginInputs {
  email: string;
  password: string;
}
interface LoginResponse {
   data: {
    accessToken: string;
    refreshToken: string;
    profile: {
      id: string;
      email: string;
      role: string;
    };
  };
  message: string;
}

function Login(){
  let { saveLoginData } = useAuth();
  let navigate = useNavigate();
  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInputs>();

  const onSubmit =async(data:LoginInputs) =>{
    try {
      let response = await axios.post<LoginResponse>(
        `${baseURL}${User_URL.LOGIN}`,data
      );
      console.log(response)
      const token =response.data.data.accessToken
      localStorage.setItem("token",token);
      saveLoginData();
      toast.success("Login Successfully")
      navigate("/dashboard")

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
      <div className="text-lime-400 text-xl mt-5">
        <h1>Continue your learning journey with QuizWiz!</h1>
      </div>
      
      {/* icons */}
      <div className="flex mt-5 mb-5">
        <div className="bg-[#333333] flex flex-col items-center justify-center p-4 rounded-lg border border-transparent hover:border-lime-400 hover:text-lime-400 transition duration-300 cursor-pointer mr-2">
          <FaUser className="text-3xl mb-1" />
          <span>Sign in</span>
        </div>
        <div onClick={()=>navigate("/register")} className='bg-[#333333] flex flex-col items-center justify-center p-4 rounded-lg border border-transparent hover:border-lime-400 hover:text-lime-400 transition duration-300 cursor-pointer'>
          <FaUserPlus className='text-3xl mb-1'/>
          <span>Sign up</span>
        </div>
      </div>

      {/* form */}
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}> 
        <div>
          <label className="block mb-2 text-sm">
            Registered email address
          </label>
          <input
            type="email"
            placeholder="type your email"
            {...register("email", {
              required: "email is required",
            })}
            className="w-full px-4 py-3 rounded-lg bg-transparent border border-gray-500 focus:outline-none focus:border-lime-400"
          />
          {errors.email && <p>{errors.email.message}</p>}
        </div>

        <div>
          <label className="block mb-2 text-sm">Password</label>
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
            className="w-full px-4 py-3 rounded-lg bg-transparent border border-gray-500 focus:outline-none focus:border-lime-400"
          />
          {errors.password && <p>{errors.password.message}</p>}
        </div>

        <div className="flex justify-between">
          <button type="submit" className="bg-gray-200 text-black px-6 py-3 rounded-lg font-semibold">
            Sign In 
          </button>
          <div>
            <span>Forget Password?</span>
            <span onClick={()=> navigate('/forgetpass')} className="text-lime-400">click here</span>
          </div>
        </div>
        
      </form>
      
      </>
    )
}
export default Login;