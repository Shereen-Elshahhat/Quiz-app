import { FaCheck } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import { useForm } from "react-hook-form";
import type { CreateAndUpdateQuizzProps, QuizzAddAndUpdateProps, QuizzGroupList } from "../../sharedmodule/interface/Interface";
import { useAuth } from "../../context/Authcontext";
import { useEffect, useState } from "react";
// import { form } from "react-router-dom";
import { QUIZZ_MODULE } from "../../constants/vaildation";
import { axiosInstance } from "../../constants/URL";
import { GROUP } from "../../constants/api";
import { isAxiosError } from "axios";
import { toast } from "react-toastify";


export default function QuizzesSetUp({
  errorMessage,
  onClose,
  onCreate,
  title,
  currentQuizz,
  onUpdate,
}: QuizzAddAndUpdateProps) {
  const [groupList, setGroupList] = useState<QuizzGroupList[] | []>([]);
  const { loginData, isLoading } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateAndUpdateQuizzProps>({
    defaultValues: {
      title: currentQuizz?.title,
      description: currentQuizz?.description,
      group: currentQuizz?.group,
      difficulty: currentQuizz?.difficulty,
      duration: currentQuizz?.duration,
      questions_number: currentQuizz?.questions_number,
      score_per_question: currentQuizz?.score_per_question,
      schadule: currentQuizz?.schadule?.slice(0, 16),
      type: (["FE", "BE", "DB"].includes(currentQuizz?.type as string)
        ? currentQuizz?.type
        : undefined) as "FE" | "BE" | "DB" | undefined,
    },
  });

  useEffect(() => {
    console.log("isLoading:", isLoading);
    console.log("role:", loginData?.role);
    if (isLoading) return;
    if (loginData?.role !== "Instructor") return;
    async function fetchAllGroups() {
      try {
        const { data } = await axiosInstance.get(GROUP.GET_ALL);
        setGroupList(data);
      } catch (error) {
        if (isAxiosError(error))
          toast.error(error.response?.data.message || "Some Thing Go Wrong");
      }
    }
    fetchAllGroups();
  }, [loginData?.role, isLoading]);

  const now = new Date();
  const minDate = new Date(now.getTime() + 60 * 60 * 1000);
  const minDateValue = minDate.toISOString().slice(0, 16);

  // ✅ shared styles
  const inputBox =
    "flex items-center overflow-hidden rounded border border-orange-200";
  const labelStyle =
    "px-2 py-2 text-xs font-medium text-gray-600 whitespace-nowrap border-r border-orange-200 bg-orange-50";
  const selectStyle =
    "outline-none px-2 py-2 text-sm bg-white text-gray-800 grow";
  const inputStyle =
    "outline-none grow px-2 py-2 text-sm bg-white text-gray-800";

  return (
    <div className="fixed inset-0 flex justify-center z-50 items-start overflow-y-auto bg-black/30 ">
      <div className="bg-white w-full max-w-2xl pb-5 mt-10 rounded-md shadow-lg border border-gray-200 ">
        <form
          onSubmit={handleSubmit((data) => {
            if (!currentQuizz) onCreate(data);
            else onUpdate(data, currentQuizz!._id);
          })}
        >
          {/* ===== Header ===== */}
          <div className="flex justify-between items-center px-5 py-3 border-b border-gray-200">
            <h2 className="font-semibold text-gray-700 text-base">{title}</h2>
            <div className="flex">
              <button
                disabled={isSubmitting}
                type="submit"
                className="p-3 border-l border-gray-200 text-gray-500 hover:text-green-600 transition">
                <FaCheck className="text-lg" />
              </button>
              <button
                onClick={onClose}
                disabled={isSubmitting}
                type="button"
                className="p-3 border-l border-gray-200 text-gray-500 hover:text-red-500 transition"
              >
                <IoCloseSharp className="text-xl" />
              </button>
            </div>
          </div>
          {/* ===== Body ===== */}
          <div className="px-5 py-4 flex flex-col gap-4">
            <span className="text-sm text-gray-600">Details</span>

            {/* Title */}
            <div>
              <div className={inputBox}>
                <span className={labelStyle}>Title:</span>
                <input
                  {...register("title", QUIZZ_MODULE.QUIZZ_TITLE)}
                  className={inputStyle} // ✅
                  type="text"
                />
              </div>
              {errors.title && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.title.message}
                </p>
              )}
            </div>

            {/* Duration + No. of questions + Score per question */}
            <div className="flex gap-2 flex-wrap">
              {/* Duration */}
              <div className="flex-1 min-w-32.5">
                <div className={inputBox}>
                  <span className={labelStyle}>Duration (in minutes)</span>
                  <select
                    {...register("duration", QUIZZ_MODULE.QUIZZ_DURATION)}
                    className={selectStyle}
                  >
                    {[10, 20, 30, 45, 60, 90, 120].map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>
                {errors.duration && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.duration.message}
                  </p>
                )}
              </div>

              {/* No. of questions */}
              <div className="flex-1 min-w-32.5">
                <div className={inputBox}>
                  <span className={labelStyle}>No. of questions</span>
                  <select
                    {...register(
                      "questions_number",
                      QUIZZ_MODULE.QUIZZ_QUESTION_NUMBER,
                    )}
                    className={selectStyle}
                  >
                    {[1,2,3,5, 10, 12,15, 20].map((q) => (
                      <option key={q} value={q}>
                        {q}
                      </option>
                    ))}
                  </select>
                </div>
                {errors.questions_number && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.questions_number.message}
                  </p>
                )}
              </div>

              {/* Score per question */}
              <div className="flex-1 min-w-32.5">
                <div className={inputBox}>
                  <span className={labelStyle}>Score per question</span>
                  <select
                    {...register(
                      "score_per_question",
                      QUIZZ_MODULE.QUIZZ_SCORE_PER_QUESTION,
                    )}
                    className={selectStyle}
                  >
                    {[1, 2, 3, 4, 5].map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
                {errors.score_per_question && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.score_per_question.message}
                  </p>
                )}
              </div>
            </div>

            {/* Description */}
            <div>
              <div className={`${inputBox} items-start`}>
                <span className={`${labelStyle} py-2`}>Description</span>
                <textarea
                  {...register("description", {
                    required: "Description Is Required",
                  })}
                  className="outline-none grow px-3 py-2 text-sm bg-white text-gray-800 resize-none h-24" 
                />
              </div>
              {errors.description && (
                <p className="text-red-500 text-xs mt-1">
                {errors.description.message}
                </p>
              )}
            </div>

            {/* Schedule */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-3 py-2 text-sm font-medium text-gray-600 border border-orange-200 bg-orange-50 rounded">
                Schedule
              </span>
              <div className="flex items-center gap-2 border border-orange-200 bg-orange-50 rounded px-3 py-2">
                <svg
                  className="w-4 h-4 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <rect
                    x="3"
                    y="4"
                    width="18"
                    height="18"
                    rx="2"
                    strokeWidth="2"
                  />
                  <line
                    x1="16"
                    y1="2"
                    x2="16"
                    y2="6"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <line
                    x1="8"
                    y1="2"
                    x2="8"
                    y2="6"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <line x1="3" y1="10" x2="21" y2="10" strokeWidth="2" />
                </svg>
                <input
                  type="datetime-local"
                  min={minDateValue}
                  {...register("schadule", QUIZZ_MODULE.QUIZZ_SCHEDULE)}
                  className="text-sm text-gray-800 bg-transparent outline-none" // ✅
                />
              </div>
              {errors.schadule && (
                <p className="text-red-500 text-xs mt-1 w-full">
                  {errors.schadule.message}
                </p>
              )}
            </div>

            {/* Difficulty + Category type + Group name */}
            <div className="flex gap-2 flex-wrap">
              {/* Difficulty */}
              <div className="flex-1 min-w-30">
                <div className={inputBox}>
                  <span className={labelStyle}>Difficulty level</span>
                  <select
                    defaultValue=""
                    {...register("difficulty", {
                      required: "Difficulty Is Required",
                    })}
                    className={selectStyle}
                  >
                    <option disabled value="">
                      Select
                    </option>
                    <option value="easy">entry</option>
                    <option value="medium">medium</option>
                    <option value="hard">hard</option>
                  </select>
                </div>
                {errors.difficulty && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.difficulty.message}
                  </p>
                )}
              </div>
              </div>

              {/* Category type */}
              <div className="flex-1 min-w-30">
                <div className={inputBox}>
                  <span className={labelStyle}>Category type</span>
                  <select
                    defaultValue=""
                    {...register("type", { required: "Type Is Required" })}
                    className={selectStyle}
                  >
                    <option disabled value="">
                      Select
                    </option>
                    <option value="FE">FE</option>
                    <option value="BE">BE</option>
                    <option value="DB">DB</option>
                  </select>
                </div>
                {errors.type && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.type.message}
                  </p>
                )}
              </div>

              {/* Group name */}

             <div className="flex-1 min-w-30">
             <div className={inputBox}>
              <span className={labelStyle}>Group name</span>

              <select
                defaultValue=""
                {...register("group", { required: "Group Is Required" })}
                className={selectStyle}
              >
                 <option disabled value="">
                   {groupList.length === 0 ? "Loading..." : "Select"}
                 </option>

                 {groupList.map((group: QuizzGroupList) => (
                   <option key={group._id} value={group._id}>
                     {group.name}
               </option>
               ))}
             </select>

          </div>

         {errors.group && (
           <p className="text-red-500 text-xs mt-1">
             {errors.group.message}
           </p>
         )}
       </div>
          

          {/* /* Error Message */ }
          {errorMessage && (
            <p className="text-red-500 text-sm text-center mb-3 px-5">
              {errorMessage ===
              "Cannot read properties of undefined (reading 'sort')"
                ? "Backend Error, try Again later"
                : errorMessage}
            </p>
          )}
         </div>
         
         </form>
      </div>
 </div>
 )
}