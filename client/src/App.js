import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Admin from "./pages/Admin";
import Student from "./pages/Student";
import { Toaster } from "react-hot-toast";
import { ClassProvider } from "./contexts/ClassContext";

export default function App() {
  return (
    <>
      <ClassProvider>
        <Toaster />
        <BrowserRouter>
          <Routes>
            <Route path={"/"} element={<Admin />} />
            <Route path={"/student/:id"} element={<Student />} />
          </Routes>
        </BrowserRouter>
      </ClassProvider>
    </>
  );
}
