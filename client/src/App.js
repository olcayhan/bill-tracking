import React from "react";
import Header from "./pages/Header";
import Login from "./pages/Login";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Admin from "./pages/Admin";
import Student from "./pages/Student";
import { RequireAuth } from "react-auth-kit";
import { Toaster } from "react-hot-toast";

export default function App() {
  return (
    <>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path={"/"} element={<Navigate replace to="/login" />} />
          <Route path={"/login"} element={<Login />} />
          <Route
            path={"/admin"}
            element={
              <RequireAuth loginPath="/login">
                <Admin />
              </RequireAuth>
            }
          />
          <Route path={"/student/:id"} element={<Student />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
