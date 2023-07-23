import React, { useState } from "react";
import Bill from "../modals/Bill";
import Student from "../modals/Student";

import { RiBillFill } from "react-icons/ri";
import { AiFillInfoCircle } from "react-icons/ai";
import { FaRegUserCircle } from "react-icons/fa";
import Button from "../Button";

export default function TableItem({ student, index }) {
  const [isShowBill, setIsShowBill] = useState();
  const [isShowStdudent, setIsShowStudent] = useState();

  return (
    <>
      <div
        className="d-flex flex-row justify-content-between align-items-center w-100 p-3 rounded-2 text-light"
        style={{ background: "#526D82" }}
      >
        <div className="d-flex flex-row justify-content-start align-items-center gap-5 fw-semibold fs-5 px-2">
          <FaRegUserCircle size={35} />
          <div>
            {student.name.charAt(0).toUpperCase() + student.name.slice(1)}
          </div>
          <div>{student.surname.toUpperCase()}</div>
        </div>
        <div className="d-flex flex-row justify-content-end align-items-center gap-3">
          <Button
            color="transparent"
            title={<RiBillFill size={35} color="white" />}
            handleSubmit={() => setIsShowBill(true)}
          />
          <Button
            color="transparent"
            title={<AiFillInfoCircle size={35} color="white" />}
            handleSubmit={() => setIsShowStudent(true)}
          />
        </div>
      </div>

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
