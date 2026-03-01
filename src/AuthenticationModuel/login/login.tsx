import { FaUser, FaUserPlus } from 'react-icons/fa';
import logo from '../../assets/logo.png';
// import { AuthContext } from '../../context/Authcontext';
// import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { baseURL , User_URL} from '../../constants/api';
import type { AxiosError } from 'axios';
import axios from 'axios';
import {useForm} from 'react-hook-form';
import { toast } from 'react-toastify';

interface LoginInputs {
  email: string;
  password: string;
}
interface LoginResponse {
  token: string;
}

function Login(){
  // let { saveLoginData } = useContext(AuthContext);
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
      localStorage.setItem("token",response.data.token);
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
      <div className="text-yellow-400 text-xl mt-5">
        <h1>Continue your learning journey with QuizWiz!</h1>
      </div>
      
      {/* icons */}
      <div className="flex mt-5 mb-5">
        <div className='bg-[#333333] p-4 mr-3 rounded-lg border border-transparent hover:border-yellow-400 hover:text-yellow-400 transition duration-300 cursor-pointer'><FaUser className='text-3xl'/></div>
        <div onClick={()=>navigate("/register")} className='bg-[#333333] p-4 rounded-lg border border-transparent hover:border-yellow-400 hover:text-yellow-400 transition duration-300 cursor-pointer'><FaUserPlus className='text-3xl'/></div>
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
              // pattern:{
              //   value:/^\S+@\s+$/i,
              //   message:"Invaild email format",
              // }
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
            <span className="text-yellow-400">click here</span>
          </div>
        </div>
        
      </form>
      
      </>
    )
}
export default Login;