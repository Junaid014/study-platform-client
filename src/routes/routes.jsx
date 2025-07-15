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
import TutorRoute from "../Provider/TutorRoute";
import ApprovedSessionsAdmin from "../Pages/DashBord/Admin/ApprovedSessionsAdmin";
import MyStudySessions from "../Pages/DashBord/Tutor/MyStudySessions";
import MyMaterials from "../Pages/DashBord/Tutor/MyMaterials";
import Payment from "../Pages/DashBord/Payment/Payment";
import MyBookedSessions from "../Pages/DashBord/Student/MyBookedSessions";
import BookedSessionDetailsWithReview from "../Pages/DashBord/Student/Review/BookedSessionDetailsWithReview ";
import BookedSessionMaterials from "../Pages/DashBord/Student/BookedSessionMaterials ";
import StudentNotesForm from "../Pages/DashBord/Student/StudentNotesForm ";
import ManageNotes from "../Pages/DashBord/Student/ManageNotes ";
import ManageMaterials from "../Pages/DashBord/Admin/ManageMaterials";
import StudentRoute from "../Provider/StudentRoute";
import ErrorElement from "../Pages/Extra/ErrorElement";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    errorElement: <ErrorElement />,
    children: [
      {
        path: '/',
        index: true,
        Component: Home
      },
      {
        path: '/createSession',
        element: <PrivetRoute><CreateStudySession /></PrivetRoute>
      },
      {
        path: 'approvedSession',
        Component: ApprovedStudySessions
      },
      {
        path: 'allStudySession',
        Component: AllStudySessions
      },
      {
        path: '/sessions/:id',
        element: <DetailsStudySessions />
      },

      {
        path: 'myBookedSessions/details/:id',
        element: <BookedSessionDetailsWithReview />,
      },
      {
        path: '/myBookedSessions/materials/:id',
        element: <BookedSessionMaterials />,
      },

      {
        path: 'forbidden',
        Component: Forbidden
      },
      {
        path: 'payment/:id',
        Component: Payment
      }

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
    path: '/dashboard',
    element: <PrivetRoute><DashboardLayout /></PrivetRoute>,
    children: [
      {
        path: 'pendingStudySession',
        element: <AdminRoute><PendingStudySessions /></AdminRoute>
      },
      {
        path: 'makeAdmin',
        element: <AdminRoute> <MakeAdmin /> </AdminRoute>
      },
      {
        path: 'approvedSessionAdmin',
        element: <AdminRoute> <ApprovedSessionsAdmin /> </AdminRoute>
      },
      {
        path: 'manageMaterials',
        element: <AdminRoute><ManageMaterials /></AdminRoute>
      },
      // tutor
      {
        path: 'myStudySessions',
        element: <TutorRoute><MyStudySessions /></TutorRoute>
      },
      {
        path: 'myMaterials',
        element: <TutorRoute><MyMaterials /></TutorRoute>
      },
      // student
      {
        path: 'myBookedSessions',
        element: <StudentRoute><MyBookedSessions /></StudentRoute>
      },
      {
        path: 'createNotes',
        element: <StudentRoute><StudentNotesForm /></StudentRoute>,
      },
      {
        path: 'manageNotes',
        element: <StudentRoute><ManageNotes /></StudentRoute>

      }
    ]
  }
]);