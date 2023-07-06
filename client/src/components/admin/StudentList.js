import React, { useState, useEffect, useCallback } from "react";
import { Form, Stack } from "react-bootstrap";
import { useClass } from "../../contexts/ClassContext";
import StudentTable from "./StudentTable";
import useStudents from "../../hooks/useStudents";
import Spinner from "../Spinner";

export default function StudentList() {
  const { getBillsByID } = useClass();
  const [queryStudent, setQueryStudent] = useState();
  const [filteredStudent, setFilteredStudent] = useState();

  const { data: students, isLoading } = useStudents();

  useEffect(() => {
    setQueryStudent(students);
  }, [students]);

  
  const writeFilter = (e) => {
    let newFiltered = students.filter((student) => {
      return student.name.toLowerCase().includes(e.target.value.toLowerCase());
    });
    setFilteredStudent(newFiltered);
    setQueryStudent(newFiltered);
  };

  const toggleFilter = useCallback(
    (e) => {
      let studentArray = queryStudent.filter((student) => {
        return (
          getBillsByID(student.billID).filter((course) => {
            return !course.isPaid;
          }).length !== 0
        );
      });
      if (e.target.checked) setQueryStudent(studentArray);
      else
        filteredStudent
          ? setQueryStudent(filteredStudent)
          : setQueryStudent(students);
    },
    [queryStudent, filteredStudent, getBillsByID]
  );
  if (isLoading) {
    return (
      <div className="row d-flex justify-content-center align-items-center w-100">
        <Spinner />
      </div>
    );
  }
  return (
    <div className="card shadow mt-5 container-fluid ">
      <div className="rounded bg-light card-body">
        <div className="studentTable table-responsive rounded p-5">
          <Stack direction="horizontal" gap={3}>
            <div>
              <i className="fa-solid fa-magnifying-glass fa-2x text-primary"></i>
            </div>
            <Form.Control
              className="border border-5 border-primary text-dark-300"
              style={{ width: "400px" }}
              type="text"
              placeholder="Öğrenci ismini giriniz..."
              onChange={writeFilter}
            />
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
                onChange={toggleFilter}
              />
              <label className="form-check-label" htmlFor="flexCheckDefault">
                Ödenmemiş Faturaları Göster
              </label>
            </div>
          </Stack>
          <hr />
          {queryStudent ? (
            <StudentTable queryStudent={queryStudent} />
          ) : (
            <h3 className="text-center">Yükleniyor</h3>
          )}
        </div>
      </div>
    </div>
  );
}
