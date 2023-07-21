import axios from "axios";
import React, { useCallback, useState } from "react";
import { useStudentsContext } from "../../contexts/StudentContext";
import { Spinner } from "react-bootstrap";
const StudentFeed = ({ student }) => {
  const { mutate } = useStudentsContext();
  const [isLoading, setLoading] = useState(false);

  const handleDelete = useCallback(async () => {
    try {
      setLoading(true);
      await axios.post("https://bill-track.onrender.com/student/delete", {
        _id: student._id,
      });
    } catch (err) {
      console.error(err);
    } finally {
      mutate();
      setLoading(false);
    }
  }, [student._id, mutate]);

  return (
    <>
      <div className="d-flex flex-column justify-content-center gap-3 p-4 fs-5 fw-semibold text-light">
        <div>Date : {student?.date}</div>
        <div>Name : {student?.name.toUpperCase()}</div>
        <div>Surname : {student?.surname.toUpperCase()}</div>
        <div>Phone : {student?.phone}</div>
        <div>E-mail : {student?.email}</div>
        <div>
          Courses :
          {student?.courses.length > 0 ? (
            student.courses.map((item) => {
              return (
                <span key={item._id}>
                  {item.class} - {item.localDate}
                </span>
              );
            })
          ) : (
            <span>No Courses</span>
          )}
        </div>
      </div>
      <div className="row justify-content-end">
        <button
          className="btn btn-danger col-3"
          disabled={isLoading}
          onClick={handleDelete}
        >
          {isLoading ? <Spinner /> : "Delete"}
        </button>
      </div>
    </>
  );
};

export default StudentFeed;
