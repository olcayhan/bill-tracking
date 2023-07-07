import React from "react";
import TableItem from "./TableItem";

export default function Table({ queryStudent }) {
  if (queryStudent?.length !== 0) {
    <h3 className="text-center">Öğrenci Bulunamadı</h3>;
  }

  return (
    <table className="table">
      <thead className="bg-light m-1">
        <tr className=" font-weight-bold text-dark ">
          <th scope="col">#</th>
          <th scope="col">TARİH </th>
          <th scope="col">İSİM</th>
          <th scope="col">SOYİSİM</th>
          <th scope="col">FATURALARI GÖSTER</th>
          <th scope="col">DETAYLAR</th>
        </tr>
      </thead>
      <tbody className="text-dark">
        {queryStudent?.map((student, index) => (
          <TableItem student={student} key={index} index={index} />
        ))}
      </tbody>
    </table>
  );
}
