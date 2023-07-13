import React, { useCallback, useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useAnnounceContext } from "../../../contexts/AnnounceContext";
import { Spinner } from "react-bootstrap";
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
      toast.error("Anons Silindi");
    } finally {
      mutate();
      setLoading(false);
    }
  }, [data?._id, mutate]);

  return (
    <div
      className="d-flex flex-row justify-content-between align-items-center fw-semibold fs-6 p-3 m-2"
      style={{ background: "#526D82", color: "#fff" }}
    >
      <div className="w-50">{data.message}</div>
      <div>{data.localDate}</div>
      <button
        className="btn btn-danger fw-semibold"
        onClick={handleDelete}
        disabled={isLoading}
      >
        {isLoading ? <Spinner /> : " Sil"}
      </button>
    </div>
  );
}
