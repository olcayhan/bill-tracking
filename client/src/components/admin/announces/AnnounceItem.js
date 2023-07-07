import React, { useCallback } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useAnnounceContext } from "../../../contexts/AnnounceContext";

export default function AnnounceItem({ data }) {
  const { mutate } = useAnnounceContext();

  const handleDelete = useCallback(async () => {
    try {
      await axios.delete(
        `https://fatura-takip-backend.onrender.com/announce/delete/${data._id}`
      );
    } catch (e) {
      toast.error("Anons Silindi");
    } finally {
      mutate();
    }
  }, [data?._id]);

  return (
    <div
      className="d-flex p-3 m-2"
      style={{
        backgroundColor: "#ddd",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow: "revert",
      }}
    >
      <p className="w-50">{data.message}</p>
      <p>{data.localDate}</p>
      <button className="btn btn-danger" onClick={handleDelete}>
        Sil
      </button>
    </div>
  );
}
