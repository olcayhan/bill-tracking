import React, { useCallback, useState } from "react";
import { toast } from "react-hot-toast";
import { useAnnounceContext } from "../../contexts/AnnounceContext";

import axios from "axios";
import AnnounceFeed from "../announces/AnnounceFeed";
import ModalContent from "../ModalContent";
import Button from "../Button";

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
    <div className="d-flex flex-column align-items-center justify-content-center gap-3">
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
      <Button
        title="Send"
        loadingTitle="Sending"
        isLoading={isLoading}
        handleSubmit={handleSubmit}
        full
        primary
      />
      <AnnounceFeed />
    </div>
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
