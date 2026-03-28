export const QUIZZ_MODULE={
  QUIZZ_DURATION:{required:"Duration Is Required",min:{value:1,message:"Duration Must Be More than 1 Minute"},max:{value:120,message:"Maximum Time Is 120 Minute"}},
  QUIZZ_QUESTION_NUMBER:{required:"Question Number Is Required",min:{value:1,message:"At least One Question"}},
  QUIZZ_SCHEDULE:{
    required: "Schedule is required",
  },
  QUIZZ_SCORE_PER_QUESTION:{required:"Score Is Required" ,min:{value:1,message:"At Least 1 Per Question"},max:{value:10,message:"Max Score 10 Per Question"}},
  QUIZZ_TITLE:{required:"Title Is Required",pattern:{value:/^[a-zA-Z][a-zA-Z0-9]/,message:"Title Must Start With Letter"}},
}