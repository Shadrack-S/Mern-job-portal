import {createBrowserRouter} from "react-router-dom";
import App from "../App";
import Home from "../Pages/Home";
import About from "../Pages/About";
import PostJob from "../Pages/PostJob";
import MyJobs from "../Pages/MyJobs";
import SalaryEstimated from "../Pages/SalaryEstimated";
import UpdateJob from "../Pages/UpdateJob";
import Login from "../Pages/Login";
import JobDetails from "../Pages/JobDetails";
import SignUp from "../Pages/SignUp";

const router = createBrowserRouter([
  {
      
    path:'/login',
    element:<Login/>
  
},{
  path:'/sign-up',
  element:<SignUp/>
},
    {
      path: "/",
      element: <App/>,
      children:[
        {
            path:'/',
            element:<Home/>
        },
       {
          path:'/post-job',
          element:<PostJob/>
        },
        {
          path:'/my-job',
          element:<MyJobs/>
        },{
          path:'/salary',
          element:<SalaryEstimated/>
        },{
          path:'edit-jobs/:id',
          element:<UpdateJob/>,
          loader :({params})=>fetch(`http://localhost:3000/all-jobs/${params.id}`)
        },{
          path :'/jobs/:id',
          element:<JobDetails/>,
         
        }
      ]
    },
    
  ]);

  export default router;