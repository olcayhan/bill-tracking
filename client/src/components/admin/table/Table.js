import React from "react";
import TableItem from "./TableItem";
import Spinner from "../../Spinner";

export default function Table({ queryStudent }) {
  if (queryStudent?.length !== 0) {
    <h3 className="text-center">Öğrenci Bulunamadı</h3>;
  }

  if (!queryStudent) {
    return <Spinner />;
  }
  return (
    <div className="d-flex flex-column justify-content-center align-items-center gap-2 w-100">
      {queryStudent?.map((student, index) => (
        <TableItem student={student} key={index} index={index} />
      ))}
    </div>
  );
}
