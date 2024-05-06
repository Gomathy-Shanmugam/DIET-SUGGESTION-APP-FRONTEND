import { Navigate } from "react-router-dom";
import UserContext from "../Context/UserContext";
import { useContext } from "react";
export default function Private(props) {
  const { user } = useContext(UserContext);

  return user !== null ? <props.Component /> : <Navigate to="/" replace />;
}
