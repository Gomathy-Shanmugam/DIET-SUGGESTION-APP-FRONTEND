import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import AxiosService from "../utis/AxiosService";
import toast from "react-hot-toast";
import ApiRoutes from "../utis/ApiRoutes";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    age: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await AxiosService.post(
        ApiRoutes.USER_REGISTER.path,
        formData,
        {
          authenticate: ApiRoutes.USER_REGISTER.authenticate,
        }
      );
      if (res.status === 200) {
        toast.success(res.data.message);
        navigate("/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="banners">
      <div className="registerWrapper">
        <h3
          className="text"
          style={{ color: "green", textAlign: "center", fontStyle: "italic" }}
        >
          Join us For Fitness
        </h3>
        <Form onSubmit={handleRegister}>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              name="email"
              value={formData.email}
              onChange={handleChange}
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
              value={formData.password}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Age</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter your age"
              name="age"
              value={formData.age}
              onChange={handleChange}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Register
          </Button>
          <p>
            Already have a acoount ?{" "}
            <Link to="/" className="link">
              Login in here
            </Link>
          </p>
        </Form>
      </div>
    </div>
  );
}

export default Register;
