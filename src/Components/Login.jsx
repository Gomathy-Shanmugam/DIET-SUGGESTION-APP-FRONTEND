import React, { useState } from "react";
import { useContext } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import ApiRoutes from "../utis/ApiRoutes";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import UserContext from "../Context/UserContext";
import AxiosService from "../utis/AxiosService";
import { useNavigate } from "react-router-dom";

function Login() {
  const loggedData = useContext(UserContext);
  const navigate = useNavigate();
  // const history = useHistory();
  const [userCreds, setUserCreds] = useState({
    email: "",
    password: "",
  });

  function handleInput(event) {
    setUserCreds((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
   

    try {
      let res = await AxiosService.post(ApiRoutes.USER_LOGIN.path, userCreds, {
        authenticate: ApiRoutes.USER_LOGIN.authenticate,
      });

      if (res.status === 404) {
        throw new Error("Username or Email Doesnt Exist");
      } else if (res.status === 403) {
        throw new Error("Incorrect Password");
      }

      const data = res.data;
      if (data.token !== undefined) {
        localStorage.setItem("nutrify-user", JSON.stringify(data));
        loggedData.setUser(data);

        toast.success(data.message);
        navigate("/home");
        // history.push("/home");
      }
    } catch (error) {
      console.error("Error:", error.message);
      toast.error("Invalid credentials");
    }
  }
  return (
    <>
    <div className="banners">
    <div className="loginWrapper">
        <h3 className = "text"style={{ color: "green", fontStyle: "italic"}}>Login to become the Best Version</h3>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              name="email"
              onChange={handleInput}
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleInput}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Get In
          </Button>
          <p>
            Not Registered ?{" "}
            <Link to="/register" className="link">
              Create Account
            </Link>
          </p>
        </Form>
      </div>
    </div>
     
    </>
  );
}

export default Login;
