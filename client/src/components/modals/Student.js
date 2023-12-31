import React from "react";
import StudentFeed from "../student/StudentFeed";
import ModalContent from "../ModalContent";
export default function Student({ show, student, handleClose }) {
  return (
    <ModalContent
      bodyContent={<StudentFeed student={student} handleClose={handleClose} />}
      title="Students Details"
      show={show}
      handleClose={handleClose}
    />
  );
}
