import React from "react";
import { Navigate } from "react-router-dom";

const Profile = React.lazy(() => import("@/views/profile"));
const Addpost = React.lazy(() => import("@/views/addpost"));
const Notifications = React.lazy(() => import("@/views/notifications"));
const Messages = React.lazy(() => import("@/views/messages"));
const Home = React.lazy(() => import("@/views/home"));
const MessagesDetail = React.lazy(() => import("@/views/messagesDetail"));
const Detail = React.lazy(() => import("@/views/detail"));
const Login = React.lazy(() => import("@/views/login"));
const Register = React.lazy(() => import("@/views/register"));

const routes = [
  {
    path: "/",
    element: <Navigate to="/home" />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/profile/:id",
    element: <Profile />,
  },
  {
    path: "/addpost",
    element: <Addpost />,
  },
  {
    path: "/notifications",
    element: <Notifications />,
  },
  {
    path: "/messages",
    element: <Messages />,
  },
  {
    path: "/messagesDetail/:id",
    element: <MessagesDetail />,
  },
  {
    path: "/detail/:id",
    element: <Detail />,
  },
];

export default routes;
