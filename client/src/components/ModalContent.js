import React from "react";
import { Modal } from "react-bootstrap";

const ModalContent = ({ title, bodyContent, show, handleClose }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header
        closeButton
        closeVariant="white"
        style={{ background: "#27374D", color: "#ddd" }}
      >
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body
        style={{
          background: "#27374D",
          height: "400px",
          overflowY: "auto",
        }}
      >
        {bodyContent}
      </Modal.Body>
    </Modal>
  );
};

export default ModalContent;
