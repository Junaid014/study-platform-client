import {
  createBrowserRouter,
} from "react-router";
import Navbar from "../Component/Navbar";
import Root from "../Layouts/Root";
import Home from "../Pages/Home/Home";
import AuthLayout from "../Layouts/AuthLayout";
import Login from "../Pages/Authentication/Login";
import SignUp from "../Pages/Authentication/SignUp";
import CreateStudySession from "../Pages/StudySession/CreateStudySession";
import PrivetRoute from "../Provider/PrivetRoute";
import DashboardLayout from "../Pages/Authentication/DashboardLayout";
import PendingStudySessions from "../Pages/DashBord/Admin/PendingStudySessions";
import ApprovedStudySessions from "../Pages/StudySession/ApprovedStudySessions";
import AllStudySessions from "../Pages/StudySession/AllStudySessions";
import DetailsStudySessions from "../Pages/StudySession/DetailsStudySessions";
import Forbidden from "../Pages/Extra/Forbidden";
import MakeAdmin from "../Pages/DashBord/Admin/MakeAdmin";
import AdminRoute from "../Provider/AdminRoute";
import ApprovedSessionsAdmin from "../Pages/DashBord/Admin/ApprovedSessionsAdmin";

export const router = createBrowserRouter([
  {
    path: "/",
    Component:Root,
    children: [
      {
        path: '/',
        index: true,
        Component: Home
      },
      {
        path:'/createSession',
        element: <PrivetRoute><CreateStudySession/></PrivetRoute>
      },
      {
        path:'approvedSession',
        Component:ApprovedStudySessions
      },
      {
        path:'allStudySession',
        Component:AllStudySessions
      },
      {
        path:'/sessions/:id',
        element:<DetailsStudySessions/>
      },
      {
        path:'forbidden',
        Component:Forbidden
      },
      
]
  },
  {
    path: "/auth",
    Component: AuthLayout,
    children: [
      {
        path: "/auth/login",
        Component: Login
      },
      {
        path: "/auth/signUp",
        Component: SignUp
      },
    ]
  },
  {
    path:'/dashboard',
    element:<PrivetRoute><DashboardLayout/></PrivetRoute>,
    children:[
      {
        path:'pendingStudySession',
        element:<AdminRoute><PendingStudySessions/></AdminRoute>
      },
      {
        path:'makeAdmin',
        element: <AdminRoute> <MakeAdmin/> </AdminRoute> 
      },
      {
        path: 'approvedSessionAdmin',
        element:<AdminRoute> <ApprovedSessionsAdmin/> </AdminRoute>
      }
    ]
  }
]);