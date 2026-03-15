export const baseURL = "https://upskilling-egypt.com:3005/api"
export const imgBaseURL ="https://upskilling-egypt.com:3005/"

export  const User_URL = {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    FORGETPASS: "/auth/forgot-password",
    RESETPASS: "/auth/reset-password",
    CHANGEPASS: "/auth/change-password",
}

export const Students_URL = {
    GETALLSTUDENTS: "/student",
    GETSTUDENTSWITHOUTGROUP: "/student/without-group",
    GetTOPSTUDENTS: "/student/top-five",
    ADD_STUDENT: (id:string)=> `/student/${id}`,
    DELETE_STUDENT: (id:string)=> `/student/${id}`,
    UPDATE_STUDENT: (id:string)=> `/student/${id}`,
    GET_STUDENT: (id:string)=> `/student/${id}`,
}


export const Quiz_URL = {
    GETALLQUIZZES: "/quiz",
    CREATE_QUIZ:"/quiz",
    GETTOPQUIZZES: "/quiz/completed",
}

export const Results_URL = {
    GETALLRESULTS: "/quiz/result",

}

export const Groups_URL = {
    GETALLGroups: "/group",
    CREATEGroup: "/group",
    DELETE_GROUP: (id:string)=> `/group/${id}`,
    UPDATE_GROUP: (id:string)=> `/group/${id}`,


}


//////////////////

 export const GROUP = {
   GET_ALL: `/group`,
   CREATE_GROUP: `/group`,
   GET_BY_ID: (id: string) => `/group/${id}`,
   UPDATE_GROUP: (id: string) => `/group/${id}`,
   DELETE_GROUP: (id: string) => `/group/${id}`,
 };
 export const QUIZ = {
   GET_ALL: `/quiz`,
   GET_BY_ID: (id: string) => `/quiz/${id}`,
   CREATE_QUIZ: `/quiz`,
   UPDATE_QUIZ: (id: string) => `/quiz/${id}`,
   DELETE_QUIZ: (id: string) => `/quiz/${id}`,
   JOIN_QUIZ: `/quiz/join`,
   SUBMIT: (id: string) => `/quiz/submit/${id}`,
   QUESTIONS_WITHOUT_ANSWERS: (id: string) => `quiz/without-answers/${id}`,
   ALL_RESULTS: `quiz/result`,
   FIRST_FIVE_INCOMMING: `quiz/incomming`,
   LAST_FIVE_COMPLETED: `quiz/completed`,
   REASSIGN: (id: string) => `quiz/reassign/${id}`,
 };

 export const QUESTION = {
   GET_ALL: "/question",
   GET_BY_ID: (id: string) => `/question/${id}`,
   CREATE_QUESTION: "/question",
   UPDATE_QUESTION: (id: string) => `/question/${id}`,
   DELETE_QUESTION: (id: string) => `/question/${id}`,
   HARD_QUESTIONS :`/question/search?difficulty=hard`,
   MEDIUM_QUESTIONS :`/question/search?difficulty=medium`,
   EASY_QUESTIONS :`/question/search?difficulty=easy`,
   BE_QUESTIONS :`/question/search?type=BE`,
   FE_QUESTIONS :`/question/search?type=FE`,
   DB_QUESTIONS :`/question/search?type=DB`,

 
SEARCH_QUESTION: (difficulty: string, type: string) => {
  const queryParams: string[] = [];

  if (difficulty) queryParams.push(`difficulty=${difficulty}`);
  if (type) queryParams.push(`type=${type}`);

  const queryString = queryParams.length ? `?${queryParams.join("&")}` : "";

  return `${baseURL}/question/search${queryString}`;
}

 };
