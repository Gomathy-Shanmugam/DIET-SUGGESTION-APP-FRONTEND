import Login from "../Components/Login";
import { Navigate } from "react-router-dom";
import Register from "../Components/Register";
import Track from "../Components/Track";
import Notfound from "../Components/Notfound";
import Private from "../Components/Private";
import Home from "../Components/Home";
import Create from "../Components/Create";
import Diet from "../Components/Diet";
import BMI from "../Components/BMI";

const Approutes = [
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/bmi",
    element: <BMI />,
  },
  {
    path: "/track",
    element: <Private Component={Track} />,
  },
  {
    path: "/create",
    element: <Create />,
  },
  {
    path: "/diet",
    element: <Private Component={Diet} />,
  },
  {
    path: "*",
    element: <Notfound />,
  },
];

export default Approutes;
