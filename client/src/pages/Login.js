import React, { useState } from "react";
import { Container } from "react-bootstrap";
import "./Login.css";
import StudentLogin from "../components/StudentLogin";
import AdminLogin from "../components/AdminLogin";

export default function Login() {
  const [isStudent, setStudent] = useState(true);

  return (
    <Container className="container">
      <div className="login-wrap">
        <div className="login-html">
          <input
            id="tab-1"
            type="button"
            className="sign-in"
            onClick={() => {
              setStudent(true);
            }}
          />
          <label
            style={isStudent ? { color: "#fff", borderColor: "#1161ee" } : {}}
            htmlFor="tab-1"
            className="tab"
          >
            Öğrenci Giriş
          </label>
          <input
            id="tab-2"
            type="button"
            className="sign-up"
            onClick={() => {
              setStudent(false);
            }}
          />
          <label
            style={!isStudent ? { color: "#fff", borderColor: "#1161ee" } : {}}
            htmlFor="tab-2"
            className="tab"
          >
            Yönetici Giriş
          </label>
          <div className="login-form">
            {isStudent ? <StudentLogin /> : <AdminLogin />}
          </div>
        </div>
      </div>
    </Container>
  );
}
