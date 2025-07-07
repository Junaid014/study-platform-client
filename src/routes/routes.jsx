import {
  createBrowserRouter,
} from "react-router";
import Navbar from "../Component/Navbar";
import Root from "../Layouts/Root";
import Home from "../Pages/Home/Home";
import AuthLayout from "../Layouts/AuthLayout";
import Login from "../Pages/Authentication/Login";
import SignUp from "../Pages/Authentication/SignUp";

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
]);