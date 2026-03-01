
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
    }
  ])

  return (
    <>
      <RouterProvider router={routes}></RouterProvider>
      <ToastContainer position="top-center" autoClose={3000} theme="colored"/>
      
    </>
  )
}

export default App
