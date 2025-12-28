import React from 'react';
import { createBrowserRouter } from "react-router";
import RootLayout from '../layouts/RootLayout';
import Home from '../pages/Home/Home';
import Register from '../pages/Register/Register';
import SignIn from '../pages/SignIn/SignIn';
import PrivateRoute from '../provider/PrivateRoute';
import DashboardLayout from '../pages/DashBoard/DashboardLayout';
import DashboardHome from '../pages/DashBoard/Pages/DashboardHome';
import Profile from '../pages/DashBoard/Pages/Profile';
import PostJob from '../pages/DashBoard/Pages/PostJob';
import AllApplicants from '../pages/DashBoard/Pages/AllApplicants';
import ManageJobs from '../pages/DashBoard/Pages/ManageJobs';
import JobDetails from '../pages/JobDetails/JobDetails';
import JobApply from '../pages/JobApply/JobApply';
import ChangePassword from '../pages/DashBoard/Pages/ChangePassword';
import MyPostedJobs from '../pages/DashBoard/Pages/MyPostedJobs';
import PostedJobDetails from '../pages/DashBoard/Pages/PostedJobDetails';
import ApplicantReview from '../pages/JobApply/ApplicantReview';

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: 'register',
        element: <Register />
      },
      {
        path: 'signin',
        element: <SignIn />
      },

      {
        path: "jobs/:id",
        element: <JobDetails />,

        loader: ({ params }) => fetch(`http://localhost:3000/jobs/${params.id}`)
      },
      {
        path: "/apply/:id",
        element: <PrivateRoute> <JobApply></JobApply> </PrivateRoute>
      },
      
    ]
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      { index: true, element: <DashboardHome /> },
      { path: "profile", element: <Profile /> },
      { path: "postjob", element: <PostJob /> },
      { path: "myPostedJobs", element: <MyPostedJobs></MyPostedJobs> },
      { path: "myPostedJobs/:id", element: <PostedJobDetails /> },
      { path: "managejobs", element: <ManageJobs /> },
      { path: "applicants", element: <AllApplicants /> },
      { path: "password", element: <ChangePassword></ChangePassword> },
      {
        path: "review-applicant/:id",
        element: <ApplicantReview />
      },


    ]
  }
]);

export default router;