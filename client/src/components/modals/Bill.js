import React from "react";
import BillFeed from "../bills/BillFeed";
import ModalContent from "../ModalContent";

export default function Bill({ show, handleClose, student }) {
  return (
    <ModalContent
      title="Bills"
      show={show}
      handleClose={handleClose}
      bodyContent={<BillFeed student={student} />}
    />
  );
}
