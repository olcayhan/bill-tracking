// src/RegisterPage.js
import React, { useEffect, useState } from "react";
import { Container, Form } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useUser from "../hooks/useUser";
import config from "../env/config";
import { toast } from "react-hot-toast";
import Button from "../components/Button";

const Register = () => {
  const { data: user, isLoading: isLoadingUser } = useUser();

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!isLoadingUser && user !== undefined) navigate("/");
  }, [navigate, user, isLoadingUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const registerURL = new URL("/users/register", config.API_URL);
      await axios.post(registerURL, {
        name,
        email,
        password,
      });
      toast.success("Registered successfully");
      navigate("/auth");
    } catch (e) {
      console.error(e);
      toast.error(e.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

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
        <h1 className="mb-4">Register</h1>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="name"
            placeholder="Username"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Form.Group>
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

        <Button title="Register" isLoading={isLoading} primary />

        <a href="/auth" className="text-light">
          Login Here
        </a>
      </Form>
    </Container>
  );
};

export default Register;
