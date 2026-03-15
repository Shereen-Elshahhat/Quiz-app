import { AiFillEdit } from 'react-icons/ai'
import { BiSolidPlusCircle } from 'react-icons/bi'
import { FaEye, FaPlus } from 'react-icons/fa'
import { FaRegTrashCan } from 'react-icons/fa6'

import { useEffect, useState } from 'react'
import { axiosInstance } from '../../constants/URL'
import { QUESTION } from '../../constants/api'
import type { CreateQuestionPayload, QuestionListOfProps } from '../../sharedmodule/interface/Interface'
import QuestionDetailsModal from '../../sharedmodule/model/DetailsModel'
import DeleteConfirmModal from '../../sharedmodule/model/DeleteModal'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import type { AxiosError } from 'axios'
import Modal from '../../sharedmodule/model/Model'
import Pagination from '../../sharedmodule/pagination/pagination'



export default function QuestionList() {
  const [selectedId, setSelectedId] = useState<string>("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionListOfProps[]>([]);
  const [selectedQuestion, setSelectedQuestion] = useState<QuestionListOfProps | null>(null);
  const [showQuestionDetails, setShowQuestionDetails] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [page, setPage] = useState(1);

  const studentsPerPage = 6;

const {
  register,
  handleSubmit,
  reset,
  formState: {errors},
} = useForm<CreateQuestionPayload>();


  const getQuestion = async () => {
    const res = await axiosInstance.get(QUESTION.GET_ALL);
    setQuestions(res.data);
  }

  const deleteQuestion = async () => {
    setLoading(true);
    await axiosInstance.delete(QUESTION.DELETE_QUESTION(selectedId));
    setLoading(false);
    setShowDeleteModal(false);
    getQuestion();
  }
  
  ///////create question ////////////
  const onSubmit = async (data: CreateQuestionPayload) => {
  try {

    if (selectedQuestion) {

      await axiosInstance.put(
        QUESTION.UPDATE_QUESTION(selectedQuestion._id),
        data
      );

      toast.success("Question updated successfully");

    } else {

      await axiosInstance.post(QUESTION.CREATE_QUESTION, data);

      toast.success("Question created successfully");

    }

    reset();
    setSelectedQuestion(null);
    setOpenModal(false);
    getQuestion();

  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    toast.error(err.response?.data?.message || "Something went wrong");
  }
};
  /////////////

  useEffect(() => {
  getQuestion();
}, []);

   // pagination logic
  const startIndex = (page - 1) * studentsPerPage;
  const endIndex = startIndex + studentsPerPage;

  const paginatedQuestions = questions.slice(startIndex, endIndex);

  const totalPages = Math.ceil(questions.length / studentsPerPage);


useEffect(() => {
  if (selectedQuestion) {
    const opts = selectedQuestion.options as unknown as {
      A: string;
      B: string;
      C: string;
      D: string;
    };

    reset({
      title: selectedQuestion.title,
      description: selectedQuestion.description,
      options: {
        A: opts.A || "",
        B: opts.B || "",
        C: opts.C || "",
        D: opts.D || "",
      },
      answer: selectedQuestion.answer as "A" | "B" | "C" | "D",
      difficulty: selectedQuestion.difficulty as "easy" | "medium" | "hard",
      type: selectedQuestion.type as "BE" | "FE",
    });
  }
}, [selectedQuestion, reset]);
  return (
    <>
      <div className="bg-white p-6 rounded-xl shadow">
               
         {/* Header */}
         <div className="flex justify-between items-center mb-6">
           <h2 className="text-lg font-semibold">Questions Bank</h2>
    
           <button onClick={() => {
              reset();
              setSelectedQuestion(null);
              setOpenModal(true);
            }} className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg">
             <FaPlus /> Add Question
           </button>
         </div>
                      

       <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="w-full text-left border-collapse">
          
          {/* Header */}
          <thead className="bg-black text-white">
            <tr>
              <th className="p-3">Question Title</th>
              <th className="p-3">Question Description</th>
              <th className="p-3">Diffculity level</th>
              <th className="p-3">Question type</th>
              <th className="p-3">Actions</th>
              
            </tr>
          </thead>

          
          {/* Body */}
          <tbody>
            {paginatedQuestions.map((question) => (
              <tr
                key={question._id}
                className="border-b hover:bg-gray-50 transition"
              >
                <td className="p-3">{question.title}</td>
                <td className="p-3">{question.description}</td>
                <td className="p-3">{question.difficulty}</td>
                <td className="p-3">{question.type}</td>
                <td className="p-3">
                  <div className='flex gap-2 h-full px-2 text-gray-700 flex-wrap md:flex-nowrap justify-evenly'>
                      <FaEye
                         onClick={() => {
                           setSelectedQuestion(question)
                           setShowQuestionDetails(true)
                         }}
                         className='cursor-pointer text-xl text-green-600 transition-colors duration-300 dark:text-white'
                       />

                      <AiFillEdit 
                        onClick={() => {
                           setSelectedQuestion(question);
                           setOpenModal(true);
                        }}
                        className='cursor-pointer text-xl text-yellow-500 transition-colors duration-300 dark:text-amber-400'
                      />
                      <FaRegTrashCan
                        onClick={() => {
                          setSelectedId(question._id)
                          setShowDeleteModal(true)
                        }}
                        className='cursor-pointer text-xl text-red-600 transition-colors duration-300 dark:text-red-700'
                      />
                    </div>
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
      
      
      <DeleteConfirmModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={deleteQuestion}
        loading={loading}
        title="Are you sure you want to delete this question?"
      />
      <QuestionDetailsModal
        isOpen={showQuestionDetails}
        onClose={() => setShowQuestionDetails(false)}
        question={selectedQuestion}
       />

       
       {/*add modal */}
        <Modal
        
          isOpen={openModal}
          onClose={() => setOpenModal(false)}
          title={selectedQuestion ? "Edit Question" : "Create Question"}>
         
         <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white p-6 rounded-lg shadow space-y-6"
            >
            {/* Title */}
            <input
              type="text"
              placeholder="Question title"
              {...register("title", { required: "Title is required" })}
              className="w-full border p-2 rounded"
            />

            {/* Description */}
            <input
              type="text"
              placeholder="Description"
             {...register("description")}
             className="w-full border p-2 rounded"
            />

           {/* Options */}
           <div className="grid grid-cols-2 gap-4">
             <input
               placeholder="Option A"
               {...register("options.A", { required: true })}
               className="border p-2 rounded w-full"
             />
         
             <input
               placeholder="Option B"
               {...register("options.B", { required: true })}
               className="border p-2 rounded w-full"
             />

             <input
               placeholder="Option C"
               {...register("options.C", { required: true })}
               className="border p-2 rounded w-full"
             />

             <input
               placeholder="Option D"
               {...register("options.D", { required: true })}
               className="border p-2 rounded w-full"
             />
           </div>

          {/* Selects */}
          <div className="grid grid-cols-3 gap-4">
            {/* Answer */}
                    <select
              {...register("answer", { required: true })}
              className="border p-2 rounded"
            >
              <option value="">Answer</option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="D">D</option>
            </select>
        
            {/* Difficulty */}
            <select
              {...register("difficulty", { required: true })}
              className="border p-2 rounded"
            >
             <option value="">Difficulty</option>
             <option value="easy">Easy</option>
             <option value="medium">Medium</option>
             <option value="hard">Hard</option>
            </select>

             {/* Type */}
             <select
               {...register("type", { required: true })}
               className="border p-2 rounded"
             >
               <option value="">Type</option>
               <option value="BE">Backend</option>
               <option value="FE">Frontend</option>
             </select>
           </div>

           {/* Submit */}
           <button
             type="submit"
             className="bg-yellow-500 text-white px-6 py-2 rounded hover:bg-orange-700"
           >
             {selectedQuestion ? "Update Question" : "Create Question"}
           </button>
         </form>
       </Modal>
    </>
  )
}