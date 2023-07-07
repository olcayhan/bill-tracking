import React, { useCallback, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Spinner } from "react-bootstrap";

const BillItem = ({ item, mutate, Icon, color }) => {
  const courseDate = new Date(item.date);

  const [isLoading, setLoading] = useState(false);

  const handlePay = useCallback(
    async (item) => {
      setLoading(true);
      try {
        await axios.put("https://fatura-takip-backend.onrender.com/bill/toggle", item);
        item.isPaid
          ? toast.success("Fatura Ödemesi Geri Alındı")
          : toast.success("Fatura Ödendi");
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
        mutate();
      }
    },
    [isLoading]
  );

  return (
    <div
      className="d-flex flex-row justify-content-between align-items-center rounded-2 m-2 p-3 gap-2"
      style={
        item.isPaid
          ? { backgroundColor: "#C7E9B0", color: "#111" }
          : { backgroundColor: color, color: "#fff" }
      }
    >
      <div>
        {courseDate.toLocaleString("default", { month: "long" }) +
          " " +
          courseDate.getFullYear()}
      </div>
      {Icon && <Icon style={{ color: "yellow" }} />}
      <div>{item.class}</div>
      <button
        className="btn ms-auto text-light"
        onClick={() => handlePay(item)}
        style={
          item.isPaid
            ? { backgroundColor: "#245953", border: "none" }
            : { backgroundColor: "#D21312", border: "none" }
        }
        disabled={Date.now() < Date.parse(item.date)}
      >
        {isLoading ? <Spinner /> : item.isPaid ? "Ödenmiş" : "Öde"}
      </button>
    </div>
  );
};

export default BillItem;
