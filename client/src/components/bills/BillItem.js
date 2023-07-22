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
        await axios.put("https://bill-track.onrender.com/bill/toggle", item);
        item.isPaid ? toast.success("Bill Unpaid") : toast.success("Bill Paid");
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
        mutate();
      }
    },
    [mutate]
  );

  return (
    <div
      className="d-flex flex-row justify-content-between align-items-center fw-semibold rounded-3 fs-6 p-3 m-2 gap-3"
      style={
        item.isPaid
          ? { backgroundColor: "#C7E9B0", color: "#111" }
          : { backgroundColor: color, color: "#fff" }
      }
    >
      <div className="d-flex flex-row justify-content-start gap-1 w-25">
        <div>{courseDate.toLocaleString("default", { month: "long" })}</div>
        <div>{courseDate.getFullYear()}</div>
        <div>{Icon && <Icon style={{ color: "yellow" }} />}</div>
      </div>

      <div>{item.class}</div>
      <button
        className="btn text-light"
        onClick={() => handlePay(item)}
        style={
          item.isPaid
            ? { backgroundColor: "#245953", border: "none" }
            : { backgroundColor: "#D21312", border: "none" }
        }
        disabled={Date.now() < Date.parse(item.date)}
      >
        {isLoading ? <Spinner /> : item.isPaid ? "Paid" : "Pay"}
      </button>
    </div>
  );
};

export default BillItem;
