import React from "react";
import QueryStudentTable from "./QueryStudentTable";

export default function StudentTable({ queryStudent }) {
  return (
    <>
      {queryStudent.length !== 0 ? (
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
            {queryStudent.map((student, index) => (
              <QueryStudentTable student={student} key={index} index={index} />
            ))}
          </tbody>
        </table>
      ) : (
        <h3 className="text-center">Öğrenci Bulunamadı</h3>
      )}
    </>
  );
}
