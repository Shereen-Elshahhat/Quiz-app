import { useLocation, useNavigate, useParams } from "react-router-dom";


interface ResultState {
  quizTitle: string;
  score: number;
  total: number;
}

export default function QuizResult() {
  const { id } = useParams<{ id: string }>();
  let navigate = useNavigate();

  const location = useLocation();
  const state = location.state as ResultState | null;

  const quizTitle = state?.quizTitle ?? "Quiz";
  const score = state?.score ?? 0;
  const total = state?.total ?? 0;

  const percentage = total ? Math.round((score / total) * 100) : 0;
 
  return (
    <div className="p-6 flex justify-center ">
      <div className="w-[75%] rounded-xl shadow-sm p-8">

        {/* Title */}
        <h1 className="text-2xl font-bold mb-6">
          {quizTitle} Result
        </h1>

        {/* Score Box */}
        <div className="flex justify-between items-center mb-6 flex-wrap gap-4 pb-5">

          <div>
            <p className="text-lg font-medium">
              Your Score: {score}
            </p>

            <p className="text-gray-600">
              Total: {total}
            </p>

            <p className="text-green-600 font-bold mt-2">
              {percentage}% Success
            </p>
          </div>

          {/* Circle */}
          <div className="w-24 h-24 rounded-full border-[10px] border-yellow-400 flex items-center justify-center text-lg font-bold">
            {percentage}%
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-gray-200 rounded-full h-3 ">
          <div
            className="bg-green-500 h-3 rounded-full"
            style={{ width: `${percentage}%` }}
          />
        </div>
        
        <div className="flex justify-end ">
            <button
              onClick={()=> navigate('/dashboard')}
              className="bg-blue-600 text-white px-6 py-2 rounded mt-5 "
            >
              Go Back
            </button>
            </div>
      </div>
      
    </div>
    
  );
}
