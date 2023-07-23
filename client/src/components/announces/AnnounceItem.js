import React, { useCallback, useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useAnnounceContext } from "../../contexts/AnnounceContext";
import Button from "../Button";
import { AiOutlineClose } from "react-icons/ai";
export default function AnnounceItem({ data }) {
  const { mutate } = useAnnounceContext();
  const [isLoading, setLoading] = useState(false);

  const handleDelete = useCallback(async () => {
    try {
      setLoading(true);
      await axios.delete(
        `https://bill-track.onrender.com/announce/delete/${data._id}`
      );
    } catch (e) {
      console.error(e);
    } finally {
      toast.error("Announce Deleted");
      mutate();
      setLoading(false);
    }
  }, [data?._id, mutate]);

  return (
    <div
      className="d-flex flex-row justify-content-between align-items-center gap-3 fw-semibold rounded-3 fs-6 p-3 m-2"
      style={{ background: "#526D82", color: "#fff" }}
    >
      <div className="w-25">{data.message}</div>
      <div>{data.localDate}</div>

      <Button
        title={<AiOutlineClose size={30} />}
        isLoading={isLoading}
        handleSubmit={handleDelete}
        danger
      />
    </div>
  );
}
