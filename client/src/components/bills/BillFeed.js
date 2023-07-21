import React from "react";
import useBill from "../../hooks/useBill";
import BillItem from "./BillItem";
import { RiErrorWarningLine } from "react-icons/ri";
import Spinner from "../Spinner";
const BillFeed = ({ student }) => {
  const { data: bills, isLoading, mutate } = useBill(student._id);

  if (isLoading) {
    return <Spinner />;
  }

  if (bills?.length === 0) {
    return <p className="text-center text-light fs-5 fw-semibold">No Bill</p>;
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
          } else {
            return <></>;
          }
        })}
    </>
  );
};

export default BillFeed;
