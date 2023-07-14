import React from "react";
import ModalContent from "../../ModalContent";
import StudentCourse from "../courses/StudentCourse";

export default function Students({
  show,
  newStudents,
  handleClose,
  classroomName,
}) {
  return (
    <ModalContent
      title={`${classroomName} Course Students`}
      bodyContent={<StudentCourse newStudents={newStudents} />}
      show={show}
      handleClose={handleClose}
    />
  );
}
