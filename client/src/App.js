import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Admin from "./pages/Admin";
import Student from "./pages/Student";
import { Toaster } from "react-hot-toast";

export default function App() {
  return (
    <>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path={"/"} element={<Admin />} />
          <Route path={"/student/:id"} element={<Student />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
