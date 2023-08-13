import React, { useCallback, useState } from "react";
import axios from "axios";
import Button from "../Button";
import { toast } from "react-hot-toast";
import config from "../../env/config";

const BillItem = ({ item, mutate, Icon, color }) => {
  const courseDate = new Date(item.date);

  const [isLoading, setLoading] = useState(false);

  const handlePay = useCallback(async () => {
    setLoading(true);
    try {
      await axios.put(config.API_URL + "/bill/toggle", item);
      const successMessage = item.isPaid ? "Bill Unpaid" : "Bill Paid";
      toast.success(successMessage);
      mutate();
    } catch (e) {
      console.error(e);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  }, [item, mutate]);

  const shouldShowIcon = Icon && !item.isPaid;

  return (
    <div
      className="d-flex flex-row justify-content-between align-items-center fw-semibold rounded-3 fs-6 p-3 m-2 gap-3"
      style={
        item.isPaid
          ? { backgroundColor: "#C7E9B0", color: "#111" }
          : { backgroundColor: color, color: "#fff" }
      }
    >
      <div className="d-flex flex-row justify-content-start align-items-center gap-1 w-25">
        <div>{courseDate.toLocaleString("default", { month: "long" })}</div>
        <div>{courseDate.getFullYear()}</div>
        {shouldShowIcon && <Icon style={{ color: "yellow" }} size={25} />}
      </div>
      <div>{item.class}</div>
      <Button
        title={item.isPaid ? "Paid" : "Pay"}
        handleSubmit={handlePay}
        color={item.isPaid ? "#245953" : "#D21312"}
        disabled={Date.now() < Date.parse(item.date)}
        isLoading={isLoading}
      />
    </div>
  );
};

export default BillItem;
