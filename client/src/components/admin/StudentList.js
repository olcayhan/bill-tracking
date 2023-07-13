import React, { useState, useEffect, useCallback } from "react";
import { useStudentsContext } from "../../contexts/StudentContext";
import Spinner from "../Spinner";
import Table from "./table/Table";

export default function StudentList() {
  const [queryStudent, setQueryStudent] = useState();

  const { students, isLoading } = useStudentsContext();

  useEffect(() => {
    setQueryStudent(students);
  }, [students]);

  const writeFilter = (e) => {
    let newFiltered = students.filter((student) => {
      return student.name.toLowerCase().includes(e.target.value.toLowerCase());
    });
    setQueryStudent(newFiltered);
  };

  const toggleFilter = useCallback((e) => {}, []);

  if (isLoading) {
    return (
      <div className="row d-flex justify-content-center align-items-center w-100">
        <Spinner />
      </div>
    );
  }
  return (
    <div
      className="d-flex flex-column justify-content-center align-items-start mt-5 rounded-3 p-5 gap-5"
      style={{ background: "#F5F5F5" }}
    >
      <div className="d-flex flex-row justify-content-start align-items-center gap-5 w-100">
        <div
          className="d-flex flex-row justify-content-start align-items-center border border-dark rounded-5 py-2 px-3 text-dark-300 gap-3 w-50"
        >
          <i className="fa-solid fa-magnifying-glass fa-2x text-dark"></i>
          <input
            className="border-0 bg-transparent px-2 py-1 text-dark-300 w-100"
            style={{ outline: "none" }}
            type="text"
            placeholder="Öğrenci ismini giriniz..."
          />
        </div>
        <div className="d-flex flex-row justify-content-center align-items-center gap-2">
          <input
            className=""
            type="checkbox"
            value=""
            id="flexCheckDefault"
            onChange={toggleFilter}
          />
          <label className="fw-semibold fs-5" htmlFor="flexCheckDefault">
            Unpaid
          </label>
        </div>
        <hr />
      </div>
      <Table queryStudent={queryStudent} />
    </div>
  );
}
