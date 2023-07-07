import React from "react";
import { useClass } from "../../../contexts/ClassContext";
import { Modal } from "react-bootstrap";
import useAnnounce from "../../../hooks/useAnnounce";

export default function Announces({ show, handleClose }) {
  const { data: announces } = useAnnounce();

  return (
    <Modal show={show} onHide={handleClose} size="m">
      <Modal.Header
        closeButton
        closeVariant="white"
        className="bg-dark text-light text-center"
      >
        <h4> Duyurular </h4>
      </Modal.Header>
      <Modal.Body className="bg-dark text-light">
        {announces?.length !== 0 ? (
          announces
            ?.sort((a, b) => (a.date < b.date ? 1 : -1))
            .map((announce, key) => {
              return (
                <div key={key} className="d-flex justify-content-center m-3">
                  {announce.message} - {announce.localDate}
                </div>
              );
            })
        ) : (
          <p className="text-center p-3">Duyuru Bulunmamaktadır</p>
        )}
      </Modal.Body>
    </Modal>
  );
}
