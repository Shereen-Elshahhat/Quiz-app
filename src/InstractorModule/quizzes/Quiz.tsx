import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { axiosInstance } from "../../constants/URL";
import { toast } from "react-toastify";

interface Question {
  _id: string;
  title: string;
  options: {
    A: string;
    B: string;
    C: string;
    D: string;
  };
}

interface AnswerPayload {
  question: string;
  answer: string;
}

export default function QuizPlay() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [chosen, setChosen] = useState<string>("");
  const [answers, setAnswers] = useState<AnswerPayload[]>([]);
  const [quizTitle, setQuizTitle] = useState("");
  const [scorePerQ, setScorePerQ] = useState(0);

  // ✅ get questions
  const loadQuiz = async () => {
    try {
      const res = await axiosInstance.get(`/quiz/without-answers/${id}`);

      const data = res.data.data;
      console.log(data)
      setQuizTitle(data.title);
      setScorePerQ(data.score_per_question || 1);
      const cleanedQuestions = data.questions.map((q: Question) => {
      const { _id, ...cleanOptions } = q.options as any;

       return {
         ...q,
         title: q.title.trim(),
         options: cleanOptions
       };
     });

setQuestions(cleanedQuestions);

    } catch (err: any) {
      toast.error(err.response?.data?.message || "Error loading quiz");
    }
  };

  useEffect(() => {
    if (id) loadQuiz();
  }, [id]);

  // ✅ next question
  const nextQuestion = () => {
    if (!chosen) {
      toast.warning("please select an answer ?");
      return;
    }

    const current = questions[currentQ];

    setAnswers(prev => [
      ...prev,
      {
        question: current._id,
        answer: chosen
      }
    ]);

    setChosen("");
    setCurrentQ(prev => prev + 1);
  };

  // ✅ submit
  const handleSubmit = async () => {
    if (!chosen) {
      toast.warning("اختاري إجابة قبل الإرسال");
      return;
    }

    const finalAnswers = [
      ...answers,
      {
        question: questions[currentQ]._id,
        answer: chosen
      }
    ];

    try {
      const res = await axiosInstance.post(
        `/quiz/submit/${id}`,
        { answers: finalAnswers }
      );
      console.log(res.data.data)
      const studentScore = res.data?.data?.score || 0;
      const totalScore = questions.length * scorePerQ;

      toast.success(" Quiz submitted successfully 🎉");

      navigate(`/dashboard/quiz/${id}/result`, {
       state: {
       quizTitle,
       score: studentScore,
       total: totalScore
       }
     });

    } catch (err: any) {
      toast.error(err.response?.data?.message || "Submit error");
    }
  };

  // 🛑 loading check
  if (!questions.length) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  const q = questions[currentQ];
  const percentage =
  questions.length > 0
    ? (answers.length / questions.length) * 100
    : 0;

  return (
    <div className="flex justify-center">
      <div className="w-[75%] p-6 mt-4 rounded-xl shadow-sm">

        <h1 className="text-xl font-bold mb-4 ">
          {quizTitle}
        </h1>

        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="bg-green-500 h-3 rounded-full transition-all duration-300"
            style={{ width: `${percentage}%` }}
          />
        </div>

        <div className="p-4 rounded mb-4 mt-5 rounded-xl shadow-sm">
          <h2 className="font-semibold mb-3">
            {q.title.split("_id")[0]}
          </h2>

          {Object.entries(q.options).map(([key, val]) => (
            <label key={key} className="block mb-2 bg-gray-50 p-3 rounded-xl">
              <input
                type="radio"
                name="answer"
                value={key}
                checked={chosen === key}
                onChange={() => setChosen(key)}
              />
              <span className="ml-2">
                {key} - {val}
              </span>
            </label>
          ))}
        </div>

        <div className="flex justify-end ">
          {currentQ < questions.length - 1 ? (
            <button
              onClick={nextQuestion}
              className="bg-blue-600 text-white px-6 py-2 rounded "
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="bg-green-600 text-white px-6 py-2 rounded"
            >
              Submit
            </button>
          )}
        </div>

      </div>
    </div>
  );
}



