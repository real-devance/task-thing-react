// src/router.ts
import { createBrowserRouter } from 'react-router-dom';
import AuthHandler from './AuthHandler';

import { TaskBoard, NotesBoard, DashBoard } from '../../components/layout/Board';
import { ErrorPage, HomePage, LandingPage } from '../index';
import LoginCard from '../../components/section/LoginCard/index.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthHandler />, // Redirects based on authentication status
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <LandingPage /> // Renders LandingPage for non-authenticated users
      },
      {
        path: "login",
        element: <LandingPage />,
        children: [
          {
            index: true,
            element: <LoginCard /> // LoginCard is shown as part of LandingPage
          }
        ]
      }
    ]
  },
  {
    path: "/home",
    element: <HomePage />,
    children: [
      { index: true, element: <DashBoard /> },
      { path: "tasks/:listName", element: <TaskBoard /> },
      { path: "notes", element: <NotesBoard /> }
    ]
  }
]);

export default router;  // Export router so it can be imported elsewhere
