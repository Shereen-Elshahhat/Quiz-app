
import {ToastContainer} from "react-toastify";
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import AuthLayout from './layouts/Authlayout'
import Notfound from './sharedmodule/notfound/Notfound'
import Login from './AuthenticationModuel/login/login'
import Register from './AuthenticationModuel/register/register'
import ForgetPass from './AuthenticationModuel/forget/forgetpass'
import ResetPass from './AuthenticationModuel/reset/resetpass'
import ChangePass from './AuthenticationModuel/changepass/changepass'
import MasterLayout from "./layouts/Masterlayout";
import Dashboard from "./InstractorModule/dashboard/dashboard";
import Groups from "./InstractorModule/groups/GroupsModuel";
import Quizzes from "./InstractorModule/quizzes/QuizzesModuel";
import Students from "./InstractorModule/students/Students";
import AuthProvider from "./context/Authcontext";
import Results from "./InstractorModule/results/ResultsModuel";
import QuestionList from "./InstractorModule/question/QuestionList";
import ProtectedRoute from "./sharedmodule/ProtectedRoute/ProtectedRoute";

function App() {
  const routes = createBrowserRouter([
    {
      path:'',
      element:<AuthLayout/>,
      errorElement:<Notfound/>,
      children:[
        {index:true,element:<Login/>},
        {path:"login",element:<Login/>},
        {path:"register",element:<Register/>},
        {path:"forgetpass",element:<ForgetPass/>},
        {path:"resetpass",element:<ResetPass/>},
        {path:"changepass",element:<ChangePass/>},
        
      ]
    },
    {
      path:"/dashboard",
      element:<ProtectedRoute><MasterLayout/></ProtectedRoute>,
      errorElement:<Notfound/>,
      children:[
        {index:true,element:<Dashboard/>},
        {path:"groups",element:<Groups/>},
        {path:"quizzes",element:<Quizzes/>},
        {path:"students",element:<Students/>},
        {path:"results",element:<Results/>},
        {path:"questions",element:<QuestionList/>},

      ]
    }
  ])

  return (
    <>
    
    <AuthProvider>
      <RouterProvider router={routes}></RouterProvider>
      <ToastContainer position="top-center" autoClose={3000} theme="colored"/>
    </AuthProvider>
      
    </>
  )
}

export default App
