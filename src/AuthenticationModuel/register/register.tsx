import { FaUser, FaUserPlus } from 'react-icons/fa';
import logo from '../../assets/logo.png';
import { useNavigate } from 'react-router-dom';
import type { AxiosError } from 'axios';
import axios from 'axios';
import { User_URL, baseURL } from '../../constants/api';
import {useForm} from 'react-hook-form';
import { toast } from 'react-toastify';



type Role = "Instructor" | "Student";
interface RegisterInputs {
  first_name: string;
  last_name: string;
  email: string;
  role: Role;
  password: string;
} 

interface RegisterResponse {
  message: string;
}
function Register(){
  let navigate = useNavigate();
  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInputs>();

  const onSubmit = async(data:RegisterInputs) =>{
    try {
      let response = await axios.post<RegisterResponse>(
        `${baseURL}${User_URL.REGISTER}`,data
      );
      console.log(response)
      toast.success("Login Successfully")
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
      <div className="text-yellow-400 text-xl mt-5">
        <h1>Create your account and start using QuizWiz!</h1>
      </div>
      
      {/* icons */}
      <div className="flex mt-5 mb-5">
        <div onClick={()=>navigate("/login")} className='bg-[#333333] p-4 mr-3 rounded-lg border border-transparent hover:border-yellow-400 hover:text-yellow-400 transition duration-300 cursor-pointer'><FaUser className='text-3xl'/></div>
        <div className='bg-[#333333] p-4 rounded-lg border border-transparent hover:border-yellow-400 hover:text-yellow-400 transition duration-300 cursor-pointer'><FaUserPlus className='text-3xl'/></div>
      </div>

      {/* register form */}
      <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}> 

        {/* name */}
        <div className=' flex grid-cols-2 gap-4'>
          <div >
             <label className="text-sm">
                 Your first name
             </label>
             <input
               type="first_name"
               placeholder="type your first name"
               {...register("first_name",{required:"firstname is required"})}
               className="w-full px-4 py-2 mt-2 rounded-lg bg-transparent border border-gray-500 focus:outline-none focus:border-lime-400"
             />
          {errors.first_name && <p>{errors.first_name.message}</p>}
          </div>

          <div >
             <label className=" text-sm">
                 Your last name
             </label>
             <input
               type="name"
               placeholder="type your last name"
               {...register("last_name",{required:"lastname is required"})}
               className="w-full px-4 py-2 mt-2 rounded-lg bg-transparent border border-gray-500 focus:outline-none focus:border-lime-400"
             />
          {errors.last_name && <p>{errors.last_name.message}</p>}
          </div>
        </div>

        {/* email */}
        <div>
          <label className="block mb-1 text-sm">
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
            className="w-full px-4 py-2 rounded-lg bg-transparent border border-gray-500 focus:outline-none focus:border-lime-400"
          />
          {errors.email && <p>{errors.email.message}</p>}
        </div>
        
        {/* role */}
        <div>
          <label className="block mb-1 text-sm">
            Your role
          </label>
          <select
           {...register("role",{required:'role is required'})}
           className="w-full px-4 py-2  rounded-lg bg-transparent border border-gray-500 focus:outline-none focus:border-lime-400"
            >
            <option value="" className="bg-[#0D1321] text-white">Choose your role</option>
            <option value="Instructor" className="bg-[#0D1321] text-white">Instructor</option>
            <option value="Student" className="bg-[#0D1321] text-white">Student</option>
          </select>
          {errors.role && <p>{errors.role.message}</p>}
        </div>

       {/* password */}
        <div>
          <label className="block mb-1 text-sm">Password</label>
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
            className="w-full px-4 py-2 rounded-lg bg-transparent border border-gray-500 focus:outline-none focus:border-lime-400"
          />
          {errors.password && <p>{errors.password.message}</p>}
        </div>

        {/* Button */}
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
export default Register;