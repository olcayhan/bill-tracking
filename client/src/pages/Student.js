import React from "react";
import Cards from "../components/student/Cards";
import Header from "./Header";

export default function Student() {
  return (
    <>
      <Header />
      <div className="container">
        <Cards />
      </div>
    </>
  );
}
