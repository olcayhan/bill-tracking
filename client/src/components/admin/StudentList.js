import React, { useState, useEffect, useCallback } from "react";
import { useStudentsContext } from "../../contexts/StudentContext";
import Spinner from "../Spinner";
import Table from "./table/Table";

import { HiMagnifyingGlass } from "react-icons/hi2";

export default function StudentList() {
  const [queryStudent, setQueryStudent] = useState();

  const { students } = useStudentsContext();

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

  return (
    <div
      className="d-flex flex-column justify-content-center align-items-start mt-5 rounded-3 p-5 gap-5 shadow"
      style={{ background: "#27374D" }}
    >
      <div className="d-flex flex-row justify-content-start align-items-center gap-5 w-100">
        <div className="d-flex flex-row justify-content-start align-items-center border border-light rounded-5 py-2 px-3 gap-2 w-75">
          <HiMagnifyingGlass size={35} color="#ddd" />
          <input
            className="border-0 bg-transparent text-light px-1 fw-semibold py-1 text-dark-300 w-100"
            style={{ outline: "none" }}
            type="text"
            placeholder="Öğrenci ismini giriniz..."
          />
        </div>
        <div className="d-flex flex-row justify-content-center align-items-center gap-2">
          <input
            className=""
            type="checkbox"
            id="flexCheckDefault"
            onChange={toggleFilter}
          />
          <label className="fw-semibold fs-5 text-light" htmlFor="flexCheckDefault">
            Unpaid
          </label>
        </div>
      </div>
      <Table queryStudent={queryStudent} />
    </div>
  );
}
