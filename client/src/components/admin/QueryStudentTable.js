import React, { useState } from "react";
import Bill from "./modals/Bill";

export default function QueryStudentTable({ student, index }) {
  const [isShowBill, setIsShowBill] = useState();
  const [viewStudent, setViewStudent] = useState();

  return (
    <>
      <tr className="text-dark-500">
        <th scope="row">{index + 1}</th>
        <td>{student.date}</td>
        <td>{student.name.charAt(0).toUpperCase() + student.name.slice(1)}</td>
        <td>{student.surname.toUpperCase()}</td>
        <td>
          <button
            className="btn btn-success px-5"
            onClick={() => {
              setViewStudent(student);
              setIsShowBill(true);
            }}
          >
            <i className="fas fa-duotone fa-receipt fa-2x text-light"></i>{" "}
          </button>
        </td>

        <td>
          <a
            className="btn btn-warning font-weight-bold px-3"
            href={`student/${student._id}`}
            onClick={() => {}}
          >
            <i className="fa-sharp fa-solid fa-circle-info fa-2x text-light"></i>
          </a>
        </td>
      </tr>

      <Bill
        show={isShowBill}
        student={viewStudent}
        handleClose={() => setIsShowBill(false)}
      />
    </>
  );
}
