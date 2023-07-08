import React, { useState } from "react";
import Bill from "../modals/Bill";
import Student from "../modals/Student";

export default function TableItem({ student, index }) {
  const [isShowBill, setIsShowBill] = useState();
  const [isShowStdudent, setIsShowStudent] = useState();

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
              setIsShowBill(true);
            }}
          >
            <i className="fas fa-duotone fa-receipt fa-2x text-light"></i>{" "}
          </button>
        </td>

        <td>
          <button
            className="btn btn-warning font-weight-bold px-3"
            onClick={() => {
              setIsShowStudent(true);
            }}
          >
            <i className="fa-sharp fa-solid fa-circle-info fa-2x text-light"></i>
          </button>
        </td>
      </tr>

      <Bill
        show={isShowBill}
        student={student}
        handleClose={() => setIsShowBill(false)}
      />

      <Student
        show={isShowStdudent}
        student={student}
        handleClose={() => setIsShowStudent(false)}
      />
    </>
  );
}
