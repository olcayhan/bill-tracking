import React, { useCallback, useState } from "react";
import { Modal, Spinner } from "react-bootstrap";
import AnnounceFeed from "../announces/AnnounceFeed";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useAnnounceContext } from "../../../contexts/AnnounceContext";

export default function Annoucement({ show, handleClose }) {
  const [message, setMessage] = useState();
  const { mutate } = useAnnounceContext();
  const [isLoading, setLoading] = useState(false);

  const handleSubmit = useCallback(async () => {
    try {
      setLoading(true);
      await axios.post(
        "https://fatura-takip-backend.onrender.com/announce/add",
        {
          message: message,
          localDate: new Date().toLocaleDateString(),
          date: Date.now(),
        }
      );
    } catch (err) {
      console.log(err);
    } finally {
      toast.success("Anons Eklendi");
      setMessage("");
      mutate();
      setLoading(false);
    }
  }, [message, mutate]);

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton className="bg-secondary">
        <Modal.Title>Duyuru Ekle</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <input
          className="w-100 h-auto m-1 p-3"
          type="text"
          placeholder="Duyurunuzu bu kısıma yazınız ..."
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
        />
        <button
          className="btn btn-success ms-auto m-3 w-100"
          onClick={handleSubmit}
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="d-flex flex-row justify-content-center align-items-center gap-4">
              <div>Gönderiliyor</div>
              <Spinner />
            </div>
          ) : (
            "Gönder"
          )}
        </button>
        <h1 className="text-center">Duyurular</h1>
        <hr />
        <AnnounceFeed />
      </Modal.Body>
    </Modal>
  );
}
