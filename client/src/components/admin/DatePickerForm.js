import React from "react";
import { Form } from "react-bootstrap";
import DatePicker from "react-datepicker";

export default function DatePickerForm({
  studentID,
  item,
  count,
  selectCourse,
  setSelectCourse,
}) {
  console.log(item);
  return (
    <Form.Group className="mb-3">
      <Form.Label>{item} Dersine Katılım Tarihi</Form.Label>
      <DatePicker
        dateFormat="dd/MM/yyyy"
        selected={selectCourse[count]?.date}
        onChange={(date) => {
          let newSelected = [...selectCourse];
          newSelected[count] = {
            studentID: studentID,
            class: item,
            date: date,
            localDate: date.toLocaleDateString(),
            isPaid: false,
          };
          setSelectCourse([...newSelected]);
        }}
      />
    </Form.Group>
  );
}
