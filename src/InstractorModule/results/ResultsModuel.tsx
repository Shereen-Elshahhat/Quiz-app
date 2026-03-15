import type { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { axiosInstance } from "../../constants/URL";
import { Results_URL } from "../../constants/api";
import Pagination from "../../sharedmodule/pagination/pagination";

interface Quiz {
  _id: string
  title: string
  group: string
  createdAt: string
}

interface Result {
  quiz: Quiz
  participants: any[]
}
function Results(){
    const [resultsList, setResultsList] = useState<Result[]>([])
    const [page, setPage] = useState(1);

  const studentsPerPage = 8;

    const getAllResults =async()=>{
        try {
            let response =await axiosInstance.get(`${Results_URL.GETALLRESULTS}`)
            setResultsList(response.data)
        } catch (error) {
            const err = error as AxiosError<{message:string}>;
            console.log(err)
            toast.error(err.response?.data?.message || "Something went wrong")
            
        }
     }
    

useEffect(()=>{
     getAllResults();
 },[])

  // pagination logic
  const startIndex = (page - 1) * studentsPerPage;
  const endIndex = startIndex + studentsPerPage;

  const paginatedResults = resultsList.slice(startIndex, endIndex);

  const totalPages = Math.ceil(resultsList.length / studentsPerPage);

return(
    <>
    <div className="bg-white p-6 rounded-xl shadow">
         <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold">Completed Quizzes</h2>
        </div>
         
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="w-full text-left border-collapse">
          
          {/* Header */}
          <thead className="bg-black text-white">
            <tr>
              <th className="p-3">Title</th>
              <th className="hidden md:block p-3">Group name</th>
              <th className="p-3">No. of persons in group</th>
              <th className="hidden md:block p-3">Participants</th>
              <th className="p-3">Date</th>
              <th className="p-3"></th>
            </tr>
          </thead>

          {/* Body */}
          <tbody>
            {paginatedResults.map((result) => (
              <tr
                key={result.quiz._id}
                className="border-b hover:bg-gray-50 transition"
              >
                <td className="p-3">{result.quiz.title}</td>
                <td className="hidden md:block p-3">{result.quiz.group}</td>
                <td className="p-3">{result.participants.length} persons</td>
                <td className="hidden md:block p-3">{result.participants.length} participants</td>
                <td className="p-3">
                  {new Date(result.quiz.createdAt).toLocaleDateString()}
                </td>
                <td className="p-3">
                  <button className="bg-yellow-100 hover:bg-yellow-200 px-4 py-1 rounded-full font-medium">
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
      {/* Pagination */}
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={(page) => setPage(page)}
      />
    </div>  
 </>
    )
}
export default Results;