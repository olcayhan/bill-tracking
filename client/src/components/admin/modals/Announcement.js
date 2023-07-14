import React, { useCallback, useState } from "react";
import { Spinner } from "react-bootstrap";
import { toast } from "react-hot-toast";
import { useAnnounceContext } from "../../../contexts/AnnounceContext";

import axios from "axios";
import AnnounceFeed from "../announces/AnnounceFeed";
import ModalContent from "../../ModalContent";

export default function Annoucement({ show, handleClose }) {
  const [message, setMessage] = useState();
  const { mutate } = useAnnounceContext();
  const [isLoading, setLoading] = useState(false);

  const handleSubmit = useCallback(async () => {
    try {
      setLoading(true);
      await axios.post("https://bill-track.onrender.com/announce/add", {
        message: message,
        localDate: new Date().toLocaleDateString(),
        date: Date.now(),
      });
    } catch (err) {
      console.log(err);
    } finally {
      if (message) toast.success("Anounnce added");
      setMessage("");
      mutate();
      setLoading(false);
    }
  }, [message, mutate]);

  const bodyContent = (
    <>
      <input
        className="w-100 h-auto m-1 p-3 bg-transparent border border-light rounded-3 text-light"
        style={{ outline: "none" }}
        type="text"
        placeholder="Write here ..."
        value={message}
        onChange={(e) => {
          setMessage(e.target.value);
        }}
      />
      <button
        className=" mx-auto m-3 w-100 border-0 p-2 rounded-2 fs-5 text-light"
        style={{ backgroundColor: "#526D82" }}
        onClick={handleSubmit}
        disabled={isLoading}
      >
        {isLoading ? (
          <div className="d-flex flex-row justify-content-center align-items-center gap-4">
            <div>Sending</div>
            <Spinner />
          </div>
        ) : (
          "Send"
        )}
      </button>
      <hr />
      <AnnounceFeed />
    </>
  );

  return (
    <ModalContent
      title="Announcement"
      bodyContent={bodyContent}
      show={show}
      handleClose={handleClose}
    />
  );
}
