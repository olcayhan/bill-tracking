import React, { useCallback, useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useAnnounceContext } from "../../contexts/AnnounceContext";
import Button from "../Button";
import { AiOutlineClose } from "react-icons/ai";
import config from "../../env/config";

export default function AnnounceItem({ data }) {
  const { mutate } = useAnnounceContext();
  const [isLoading, setLoading] = useState(false);

  const handleDelete = useCallback(async () => {
    try {
      setLoading(true);
      await axios.delete(config.API_URL + "/announce/delete/" + data._id);
      mutate();
      toast.error("Announce Deleted");
    } catch (e) {
      console.error(e);
      toast.error("Error deleting announcement");
    } finally {
      setLoading(false);
    }
  }, [data._id, mutate]);

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
