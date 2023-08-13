import React from "react";
import useBill from "../../hooks/useBill";
import BillItem from "./BillItem";
import Spinner from "../Spinner";
import { RiErrorWarningLine } from "react-icons/ri";

const WARNING_COLOR = "#E74646";
const UPCOMING_COLOR = "#e78c46";

const BillFeed = ({ student }) => {
  const { data: bills, isLoading, mutate } = useBill(student._id);

  if (isLoading) {
    return <Spinner />;
  }

  if (!bills || bills.length === 0) {
    return <p className="text-center text-light fs-5 fw-semibold">No Bill</p>;
  }

  const billData = bills.sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <>
      {billData.map((item) => {
        const courseDate = new Date(item.date);
        const currentDate = new Date();
        const monthsDifference =
          (courseDate.getFullYear() - currentDate.getFullYear()) * 12 +
          courseDate.getMonth() -
          currentDate.getMonth();

        if (courseDate < currentDate) {
          return (
            <BillItem
              key={item._id}
              item={item}
              mutate={mutate}
              Icon={RiErrorWarningLine}
              color={WARNING_COLOR}
            />
          );
        } else if (monthsDifference <= -2 || monthsDifference >= 10) {
          return (
            <BillItem
              key={item._id}
              item={item}
              mutate={mutate}
              color={UPCOMING_COLOR}
            />
          );
        } else {
          return null;
        }
      })}
    </>
  );
};

export default BillFeed;
