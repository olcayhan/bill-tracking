import React from "react";
import StudentFeed from "../student/StudentFeed";
import ModalContent from "../../ModalContent";
export default function Student({ show, student, handleClose }) {
  return (
    <ModalContent
      bodyContent={<StudentFeed student={student} />}
      title="Öğrenci Detayları"
      show={show}
      handleClose={handleClose}
    />
  );
}
