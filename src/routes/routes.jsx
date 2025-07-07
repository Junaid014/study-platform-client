import {
  createBrowserRouter,
} from "react-router";
import Navbar from "../Component/Navbar";
import Root from "../Layouts/Root";
import Home from "../Pages/Home/Home";

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
]);