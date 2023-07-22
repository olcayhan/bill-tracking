import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function DatePickerForm({ course, setCourse }) {
  return (
    <DatePicker
      className="w-100 bg-transparent border text-light p-2"
      dateFormat="dd/MM/yyyy"
      selected={course.date}
      onChange={(date) =>
        setCourse({
          ...course,
          date: date,
          localDate: date.toLocaleDateString(),
        })
      }
    />
  );
}
