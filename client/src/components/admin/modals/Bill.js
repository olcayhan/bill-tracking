import React from "react";
import BillFeed from "../bills/BillFeed";

import { Modal } from "react-bootstrap";

export default function Bill({ show, handleClose, student }) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton className="bg-secondary">
        <Modal.Title>Faturalar</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <BillFeed student={student} />
      </Modal.Body>
    </Modal>
  );
}
