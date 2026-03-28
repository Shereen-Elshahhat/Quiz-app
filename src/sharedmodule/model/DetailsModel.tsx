import { FaTimes } from "react-icons/fa";
import type { QuestionListOfProps } from "../interface/Interface";


interface QuestionDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  question: QuestionListOfProps | null;
}

export default function QuestionDetailsModal({
  isOpen,
  onClose,
  question,
}: QuestionDetailsModalProps) {
  if (!isOpen || !question) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md w-full max-w-md p-6 relative">
        
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-400 hover:text-gray-600">
          <FaTimes className="h-4 w-4" />
        </button>

        <h3 className="text-xl font-bold text-gray-700 dark:text-white mb-4">
          {question.title}
        </h3>

        <div className="flex flex-col gap-3 text-sm text-gray-600 dark:text-gray-300">
          <p><span className="font-semibold">Description: </span>{question.description}</p>
          <p><span className="font-semibold">Difficulty: </span>{question.difficulty}</p>
          <p><span className="font-semibold">Type: </span>{question.type}</p>
          <p><span className="font-semibold">Points: </span>{question.points}</p>
          <p><span className="font-semibold">Status: </span>{question.status}</p>

          <div>
            <p className="font-semibold mb-1">Options:</p>
            {Object.entries(question.options)
              .filter(([key]) => key !== "_id")
              .map(([key, value]) => (
                <p key={key} className={`px-2 py-1 rounded mb-1 ${key === question.answer ? "bg-green-100 text-green-700 font-bold" : ""}`}>
                  {key}: {value}
                </p>
              ))}
          </div>

          <p><span className="font-semibold">Answer: </span>
            <span className="text-green-600 font-bold">{question.answer}</span>
          </p>
        </div>
      </div>
    </div>
  );
}