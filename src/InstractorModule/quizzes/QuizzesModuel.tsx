import { FaBell, FaBook} from "react-icons/fa";
import img from "../../assets/user.jpg";
import Results from "../results/ResultsModuel";
import { useState } from "react";
import QuizzesSetUp from "./SetupQuiz";
import { useNavigate } from "react-router-dom";
import { QUIZ } from "../../constants/api";
import { axiosInstance } from "../../constants/URL";
import { toast } from "react-toastify";
import type { AxiosError } from "axios";
import vec1 from'../../assets/vector1.png'
import vec2 from'../../assets/vector2.png'
import { useAuth } from "../../context/Authcontext";
import JoinQuizModal from "../../sharedmodule/model/JoinQuizModal";


function Quizzes(){
const [openQuizSetup, setOpenQuizSetup] = useState(false);
const [open , setOpen] =useState(false)
const [code, setCode] = useState<string | null>(null);
const [showSuccessModal, setShowSuccessModal] = useState(false);
const {loginData}=useAuth();
let navigate = useNavigate();

    return(
    <>
      {/* Top cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
       <div className="grid grid-cols-2 gap-4">
        {/* Setup quiz */}
        <div onClick={() => {if (loginData?.role === "Student") {setOpen(true); 
                             } else {setOpenQuizSetup(true);}}}
           className="bg-white rounded-lg shadow p-2 flex flex-col items-center justify-center hover:shadow-md cursor-pointer">
          <FaBell size={50} className="text-black mb-3" />
          <p className="font-medium">{loginData?.role !== "Student"? "Set up a new quiz" :"Join Quiz"}</p>
        </div>

        {/* Question bank */}
        {loginData?.role !== "Student"?
        <div onClick={() => navigate("/dashboard/questions")} className="bg-white rounded-lg shadow p-2 flex flex-col items-center justify-center hover:shadow-md cursor-pointer">
          <FaBook size={50} className="text-black mb-3" />
          <p className="font-medium">Question Bank</p>
        </div>
        :''}
        </div>

        {/* Upcoming quizzes */}
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="font-semibold mb-4">Upcoming quizzes</h3>

          {/* Quiz card */}
          <div className="flex items-center bg-gray-50 rounded-lg p-2 mb-3">
            <img src={vec1} className="w-14 h-14 rounded mr-3" />
            <div className="flex-1">
              <p className="font-medium text-sm">
                Introduction to computer programming
              </p>
              <p className="text-xs text-gray-500">
                25 / 03 / 2023 &nbsp; 12:00 AM
              </p>
              <p className="text-xs text-gray-500">
                No. of student's enrolled: 32
              </p>
            </div>

            <span className="text-green-600 text-sm font-medium mr-2">Open</span>
          </div>

          {/* Quiz card */}
          <div className="flex items-center bg-orange-50 rounded-lg p-2">
            <img src={vec2} className="w-14 h-14 rounded mr-3" />
            <div className="flex-1">
              <p className="font-medium text-sm">Psychology 101</p>
              <p className="text-xs text-gray-500">
                27 / 03 / 2023 &nbsp; 12:00 PM
              </p>
              <p className="text-xs text-gray-500">
                No. of student's enrolled: 17
              </p>
            </div>

            <span className="text-green-600 text-sm font-medium mr-2">Open</span>
          </div>
        </div>
      </div>

      {/* Completed Quizzes Table */}
      <Results/>
      
      {openQuizSetup && (
       <QuizzesSetUp
         title="Create Quiz"
         errorMessage=""
         currentQuizz={null}
         onClose={() => setOpenQuizSetup(false)}
         onCreate={async (data) => {
             try {
               const res = await axiosInstance.post(QUIZ.CREATE_QUIZ, data);
               const quizCode = res.data.data.code;
               setCode(quizCode);
               toast.success("Quiz Created Successfully");
               setOpenQuizSetup(false);
               setShowSuccessModal(true); 
             
             } catch (error) {
               const err = error as AxiosError<{message:string}>;
               console.log(err)
               toast.error(err.response?.data?.message || "Something went wrong")
             }
            }}
         onUpdate={async (_dataInfo, _quizzId) => {}}
        />
        )}

        <JoinQuizModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onSubmit={async(code) => {
          console.log("Quiz Code:", code);
          console.log(localStorage.getItem("token"));
          try {
            let res =await axiosInstance.post(`${QUIZ.JOIN_QUIZ}`,{code})
            console.log(res) 
            const id = res.data.data.quiz;
            toast.success("Joined quiz successfully!");
            navigate(`/dashboard/quiz/${id}`);
          } catch (error) {
            const err = error as AxiosError<{ message: string }>;
            console.log(err);
            toast.error(err.response?.data?.message || "Something went wrong");
          }
          setOpen(false);
        }}
      />

        {showSuccessModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
          <div className="bg-white rounded-xl p-8 w-[400px] text-center shadow-lg">
      
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center">
                <span className="text-white text-2xl">✓</span>
              </div>
            </div>
      
            <h2 className="text-lg font-semibold mb-4">
              Quiz was successfully created
            </h2>
      
            <div className="flex justify-center items-center gap-2 bg-gray-100 rounded-lg px-4 py-2 mb-6">
              <span className="font-medium">CODE:</span>
              <span className="font-bold">{code}</span>
              <button onClick={() => navigator.clipboard.writeText(code ?? "")}
                      className="ml-2 bg-gray-300 hover:bg-gray-400 text-black px-2 py-1 rounded"
                      title="Copy code">
                📋
              </button>
            </div>

            <button
              onClick={() => setShowSuccessModal(false)}
              className="bg-lime-400 hover:bg-lime-500 text-black px-8 py-2 rounded-full"
            >
              Close
            </button>

          </div>
        </div>
      )}
 
    </>
    )
}
export default Quizzes;