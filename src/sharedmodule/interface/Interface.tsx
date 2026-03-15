export interface QuestionOptions {
  A: string;
  B: string;
  C: string;
  D: string;
}
export interface QuizQuestionPreview {
  _id: string;
  title: string;
  options: QuestionOptions;
}
export interface QuizInfo {
  _id: string;
  code: string;
  title: string;
  description: string;
  status: "open" | "closed" | string;
  instructor: string;
  group: string;
  questions_number: number;
  questions: QuizQuestionPreview[];
  schadule: string; // ISO string, e.g., "2025-07-30T06:33:00.000Z"
  duration: number;
  score_per_question: number;
  type: string; // e.g., "FE", "BE"
  difficulty: "easy" | "medium" | "hard";
  participants: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
export interface QuizQuestionPreview {
  _id: string;
  title: string;
  options: QuestionOptions;
}
export interface UpcommingQuizzProps {
  _id: string;
  code: string;
  title: string;
  description: string;
  status: "active" | "closed"; // or string if open-ended
  instructor: string;
  group: string;
  questions_number: number;
  questions: QuizQuestionPreview[];
  schadule: string; // ISO date string
  duration: number; // in minutes or hours
  score_per_question: number;
  type: string; // e.g. "FE", "BE", etc.
  difficulty: "easy" | "medium" | "hard";
  updatedAt: string;
  createdAt: string;
  __v: number;
  closed_at: string;
  participants: number;
}
export interface QuizQuestionPreview {
  _id: string;
  title: string;
  options: QuestionOptions;
}
 export interface CompletedQuizzProps {
  _id: string;
  code: string;
  title: string;
  description: string;
  status: "open" | "closed" | string;
  instructor: string;
  group: string;
  questions_number: number;
  questions: QuizQuestionPreview[];
  schadule: string; // ISO date string
  duration: number;
  score_per_question: number;
  type: string; // e.g., "FE", "BE"
  difficulty: "easy" | "medium" | "hard";
  participants: number;
  createdAt: string;
  updatedAt: string;
  closed_at: string;
  __v: number;
 }
export interface QuizListProps {
  _id: string;
  code: string;
  title: string;
  description: string;
  status: "open" | "closed" | string;
  instructor: string; // ID reference
  group: string; // ID reference
  questions_number: number;
  questions: string[]; // Array of question IDs
  schadule: string; // ISO date string
  duration: number; // in minutes
  score_per_question: number;
  type: string; // e.g., "FE", "BE", etc.
  difficulty: "easy" | "medium" | "hard";
  updatedAt: string;
  createdAt: string;
  closed_at: string;
  participants: number;
  __v: number;
}
export interface QuizzGroupList{
    _id: string;
    name: string;
}
export interface QuizResponseAfterCreateProps {
  code: string;
  title: string;
  description: string;
  status: "open" | "closed" | string;
  instructor: string;         // ObjectId (string)
  group: string;              // ObjectId (string)
  questions_number: number;
  questions: string[];        // Array of question IDs
  schadule: string;           // ISO string (e.g. "2024-02-15T21:19:34.000Z")
  duration: number;           // in minutes
  score_per_question: number;
  type: string;               // e.g., "FE", "BE", "DB"
  difficulty: "easy" | "medium" | "hard";
  _id: string;
  updatedAt: string;          // ISO string
  createdAt: string;          // ISO string
  __v: number;
}
export interface GroupStudent {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
}



export interface CreateAndUpdateQuizzProps {
  title: string;
  description: string;
  group: string; // Group ID
  questions_number: number;
  difficulty: "easy" | "medium" | "hard";
  type: "FE" | "BE"|"DB";
  schadule: string; // ISO string: "2024-02-15T21:19:34"
  duration: number; // in minutes
  score_per_question: number;
}
export interface QuizzAddAndUpdateProps{
  title:string | null;
  errorMessage:string| null
  onCreate:(dataInfo:CreateAndUpdateQuizzProps)=>Promise<void>;
  onUpdate:(dataInfo:CreateAndUpdateQuizzProps,quizzId:string)=>Promise<void>
  onClose:()=>void;
  currentQuizz:UpcommingQuizzProps | null;
}
export interface QuestionListOfProps {
     "_id":string,
        "title": string,
        "description": string,
        "options":keyof QuestionOptions,
        "answer": string,
        "status": "active"| "inactive",
        "instructor": string,
        "difficulty": "easy"|  "medium" | "hard",
        "points": number,
        "type": "FE"| "BE"| "DB",
}

export interface CreateQuestionPayload {
  title: string;
  description: string;
  options: {
    A: string;
    B: string;
    C: string;
    D: string;
  };
  answer: "A" | "B" | "C" | "D";
  difficulty: "easy" | "medium" | "hard";
  type: "BE" | "FE";
}