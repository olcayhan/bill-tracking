import axios from "axios";
import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button } from "react-bootstrap";
import useUser from "../hooks/useUser";
import config from "../env/config";

const Login = () => {
  const { data: user, isLoading } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && user !== undefined) navigate("/");
  }, [navigate, user, isLoading]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        const loginUrl = new URL("/users/login", config.API_URL);
        const login = await axios.post(loginUrl, {
          email,
          password,
        });
        localStorage.setItem("token", login.data.token);
        localStorage.setItem("userID", login.data.user._id);
        navigate("/");
      } catch (error) {
        console.error(error);
      }
    },
    [email, password, navigate]
  );

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <Form
        className="d-flex flex-column justify-content-center align-items-center gap-4 p-5 rounded-md text-light"
        onSubmit={handleSubmit}
        style={{
          width: "500px",
          maxWidth: "600px",
          backgroundColor: "#27374D",
        }}
      >
        <h1 className="mb-4">Login</h1>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>

        <a href="/register" className="text-light">
          Register Here
        </a>
      </Form>
    </Container>
  );
};

export default Login;
