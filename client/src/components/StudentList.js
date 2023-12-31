import React, { useState, useEffect } from "react";
import { useStudentsContext } from "../contexts/StudentContext";
import { HiMagnifyingGlass } from "react-icons/hi2";

import Table from "./table/Table";

export default function StudentList() {
  const { students } = useStudentsContext();
  const [queryStudent, setQueryStudent] = useState(students);

  useEffect(() => {
    setQueryStudent(students);
  }, [students]);

  const handleFilterChange = (e) => {
    let newFiltered = students.filter((student) => {
      return student.name.toLowerCase().includes(e.target.value.toLowerCase());
    });
    setQueryStudent(newFiltered);
  };

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
            placeholder="Write here ..."
            onChange={handleFilterChange}
          />
        </div>
      </div>
      <Table queryStudent={queryStudent} />
    </div>
  );
}
