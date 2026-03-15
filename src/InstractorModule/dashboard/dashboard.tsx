import type { AxiosError } from "axios";
import img from "../../assets/user.jpg";
import { useEffect, useState } from 'react';
import { toast } from "react-toastify";
import { axiosInstance } from "../../constants/URL";
import { Quiz_URL, Students_URL } from "../../constants/api";
import vec1 from'../../assets/vector1.png'
import vec2 from'../../assets/vector2.png'
import user1 from "../../assets/user.jpg";
import user2 from "../../assets/user3.jpg";
import user3 from "../../assets/user4.jpg";
import user4 from "../../assets/user2.jpg";
import { useNavigate } from "react-router-dom";

interface GroupInfo {
  _id: string;
  name: string;
}

interface Student {
  _id: string
  first_name: string
  last_name: string
  email: string
  avg_score:number
  group: GroupInfo;
}

interface Quiz {
  title: string
  status: string
  type: string
  difficulty: string
  score_per_question: number

}
function Dashboard(){
    const [topstudents ,setTopStudents] =useState<Student[]>([]);
    const [topquizzez ,setTopquizzez] =useState<Quiz[]>([]);
    const userImages = [user1, user2, user3, user4];
    const vecImage = [vec1,vec2];
    const navigate = useNavigate();

    const getTopFiveStudent =async()=>{
        try {
           let response= await axiosInstance.get(`${Students_URL.GetTOPSTUDENTS}`);
           console.log(response.data)
            setTopStudents(response.data);
        } catch (error) {
            const err = error as AxiosError<{ message: string }>;
            toast.error(err.response?.data?.message || "Something went wrong");
        }
    }

    const getTopFiveQuizzes =async()=>{
        try {
           let response= await axiosInstance.get(`${Quiz_URL.GETTOPQUIZZES}`);
           console.log(response.data)
            setTopquizzez(response.data);
        } catch (error) {
            const err = error as AxiosError<{ message: string }>;
            toast.error(err.response?.data?.message || "Something went wrong");
        }
    }

    useEffect(()=>{
       getTopFiveStudent();
       getTopFiveQuizzes();
    },[])
    
    return(
        <>
        
      {/* Grid */}
      <div className="grid lg:grid-cols-2 gap-3">

        {/* Upcoming Quizzes */}
        <div className="bg-white rounded-xl p-5 shadow-sm">
          <h2 className="font-semibold mb-4">Upcoming 5 quizzes</h2>
          <div className="space-y-4">
            {topquizzez.map((quiz,index) => (
              <div className="flex gap-4 border border-gray-200 rounded-xl hover:bg-gray-50">
                <div className="bg-[#FFEDDF] rounded-xl p-2"><img src={vecImage[index % vecImage.length]} className="w-16 h-16  rounded-xl object-cover"/></div>

                <div className="flex-1 mt-2">
                  <h3 className="font-medium text-sm">{quiz.title}</h3>
                  <p className="text-gray-500 text-xs">{quiz.type} | {quiz.difficulty} </p>
                  <p className="text-xs mt-1 text-gray-600"> No. of student's enrolled: {quiz.score_per_question} </p>
                </div>

                <button className="text-green-500 font-medium text-sm mx-3">
                  Open →
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Top Students */}
        <div className="bg-white rounded-xl p-3 shadow-sm">
         <div className="flex justify-between ">
          <h2 className="font-semibold mb-4">Top 5 Students</h2>
          <h2 onClick={()=>navigate("/dashboard/students")} className="text-green-500">All Students →</h2>
          </div>
          <div className="space-y-4">
            {topstudents.map((student,index) => (
              <div key={student._id} className="flex items-center justify-between border border-gray-200 rounded-lg">
                <div className="flex gap-3 items-center">
                  <img
                    src={userImages[index % userImages.length]}
                    className="w-15 h-15 rounded-lg object-cover"
                  />

                  <div>
                    <h3 className="font-medium text-sm">{student.first_name} {student.last_name}</h3>

                    <p className="text-xs text-gray-500">
                      Group Name: {student.group?.name} | Average score: 11
                    </p>
                  </div>
                </div>

                <button className="text-gray-500 hover:text-black">
                  →
                </button>
              </div>
            ))}
          </div>
        </div>
        </div>
        </>
    )
}
export default Dashboard;