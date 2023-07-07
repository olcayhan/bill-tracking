import React from "react";
import useBill from "../../../hooks/useBill";
import BillItem from "./BillItem";
import { RiErrorWarningLine } from "react-icons/ri";

const BillFeed = ({ student }) => {
  const { data: bills, mutate } = useBill(student._id);

  if (bills?.length === 0) {
    return <p className="text-center">Fatura Bulunmamaktadır</p>;
  }
  return (
    <>
      {bills
        ?.sort((a, b) => new Date(a.date) - new Date(b.date))
        .map((item) => {
          const courseDate = new Date(item.date);
          const currentDate = new Date();

          if (courseDate < currentDate) {
            return (
              <BillItem
                key={item._id}
                item={item}
                mutate={mutate}
                Icon={RiErrorWarningLine}
                color={"#E74646"}
              />
            );
          } else if (
            (courseDate.getFullYear() === currentDate.getFullYear() &&
              courseDate.getMonth() - 2 <= currentDate.getMonth()) ||
            (courseDate.getFullYear() > currentDate.getFullYear() &&
              courseDate.getMonth() + 10 <= currentDate.getMonth())
          ) {
            return (
              <BillItem
                key={item._id}
                item={item}
                mutate={mutate}
                color={"#e78c46"}
              />
            );
          }
        })}
    </>
  );
};

export default BillFeed;
