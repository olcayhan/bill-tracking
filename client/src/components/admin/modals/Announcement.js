import React, { useCallback, useState } from "react";
import { Modal } from "react-bootstrap";
import { useClass } from "../../../contexts/ClassContext";
import { toast } from "react-hot-toast";
import AnnounceItem from "../announces/AnnounceItem";
import useAnnounce from "../../../hooks/useAnnounce";
import axios from "axios";
import Spinner from "../../Spinner";

export default function Annoucement({ show, handleClose }) {
  const { addAnnounces } = useClass();
  const [message, setMessage] = useState();

  const { data: announces, isLoading, mutate } = useAnnounce();

  const handleSubmit = useCallback(async () => {
    try {
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
    }
  }, [message]);

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
        >
          Gönder
        </button>
        <h1 className="text-center">Duyurular</h1>
        <hr />
        <div className="flex flex-col w-100">
          {isLoading ? (
            <Spinner />
          ) : announces?.length !== 0 ? (
            announces?.map((announce, key) => {
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
