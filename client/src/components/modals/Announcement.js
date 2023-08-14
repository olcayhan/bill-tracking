import React, { useCallback, useState } from "react";
import { toast } from "react-hot-toast";
import { useAnnounceContext } from "../../contexts/AnnounceContext";

import axios from "axios";
import AnnounceFeed from "../announces/AnnounceFeed";
import ModalContent from "../ModalContent";
import Button from "../Button";
import useUser from "../../hooks/useUser";
import config from "../../env/config";

export default function Annoucement({ show, handleClose }) {
  const [message, setMessage] = useState("");
  const { mutate } = useAnnounceContext();
  const [isLoading, setLoading] = useState(false);
  const { data: user } = useUser();

  const handleSubmit = useCallback(async () => {
    try {
      setLoading(true);
      const announceURL = new URL("/announce/add", config.API_URL);
      const announceData = {
        userId: user?._id,
        message: message,
        localDate: new Date().toLocaleDateString(),
        date: Date.now(),
      };
      await axios.post(announceURL, announceData);
      toast.success("Anounnce added");
      mutate();
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    } finally {
      setMessage("");
      setLoading(false);
    }
  }, [message, mutate, user?._id]);

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
        disabled={message.length < 5}
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
