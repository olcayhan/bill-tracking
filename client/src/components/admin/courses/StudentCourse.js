import React from "react";

const StudentCourse = ({ newStudents }) => {
  if (newStudents.length === 0) {
    return (
      <p className="text-center text-light fs-5 fw-semibold">
        Öğrenci Bulunamadı
      </p>
    );
  }

  return (
    <>
      {newStudents.map((student, key) => {
        return (
          <div className="d-flex flex-row align-items-center justify-content-between rounded bg-light m-2 p-2 ">
            <div>
              {student.name.charAt(0).toUpperCase() + student.name.slice(1)}
            </div>
            <div>{student.surname.toUpperCase()}</div>
            <div>{student.date}</div>
          </div>
        );
      })}
    </>
  );
};

export default StudentCourse;
