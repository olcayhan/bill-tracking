import React from "react";
import { Modal } from "react-bootstrap";
import StudentFeed from "../student/StudentFeed";
export default function Student({ show, student, handleClose }) {
  return (
    <Modal show={show} onHide={handleClose} size="m">
      <Modal.Header closeButton className="bg-secondary">
        <h4> Öğrenci Detayları </h4>
      </Modal.Header>
      <Modal.Body>
        <StudentFeed student={student} />
      </Modal.Body>
    </Modal>
  );
}
