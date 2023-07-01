import React, { useCallback, useState } from "react";
import { Modal } from "react-bootstrap";
import { useClass } from "../../../contexts/ClassContext";
import { toast } from "react-hot-toast";
import AnnounceItem from "../announces/AnnounceItem";

export default function ShowAddAnnouncementFormModal({ show, handleClose }) {
  const { addAnnounces, announces, deleteAnnounces } = useClass();
  const [message, setMessage] = useState();

  const handleSubmit = useCallback(() => {
    addAnnounces({
      message: message,
      localDate: new Date().toLocaleDateString(),
      date: Date.now(),
    });
    toast.success("Anons Eklendi");
    setMessage("");
  }, [message]);

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton className="bg-secondary">
        <Modal.Title>Duyuru Ekle</Modal.Title>
      </Modal.Header>
      <Modal.Body className="">
        <input
          className="w-100 h-auto m-1 p-3"
          type="text"
          placeholder="Duyurunuzu bu kısıma yazınız ..."
          onChange={(e) => {
            setMessage(e.target.value);
          }}
        />

        <button
          className="btn btn-success ms-auto m-3 w-100"
          onClick={handleSubmit}
        >
          Gönder
        </button>
        <h1 className="text-center">Duyurular</h1>
        <hr />
        <div className="flex flex-col">
          {announces?.length !== 0 ? (
            announces.map((announce, key) => {
              return <AnnounceItem key={key} data={announce} />;
            })
          ) : (
            <p className="text-center">Duyuru Bulunmamaktadır</p>
          )}
        </div>
      </Modal.Body>
    </Modal>
  );
}
