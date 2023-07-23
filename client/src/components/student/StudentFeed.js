import axios from "axios";
import React, { useCallback, useState } from "react";
import { useStudentsContext } from "../../contexts/StudentContext";
import { Spinner } from "react-bootstrap";
import AddCourse from "../modals/AddCourse";
import { useBillsContext } from "../../contexts/BillContext";
import { useCoursesContext } from "../../contexts/CourseContext";

const StudentFeed = ({ student, handleClose }) => {
  const { mutate: mutateStudent } = useStudentsContext();
  const { mutate: mutateBills } = useBillsContext();
  const { mutate: mutateCourse } = useCoursesContext();
  const [isLoading, setLoading] = useState(false);
  const [isShow, setShow] = useState(false);

  const handleDelete = useCallback(async () => {
    try {
      setLoading(true);
      await axios.post("https://bill-track.onrender.com/student/delete", {
        _id: student._id,
      });
    } catch (err) {
      console.error(err);
    } finally {
      mutateStudent();
      mutateBills();
      handleClose();
      mutateCourse();
      setLoading(false);
    }
  }, [student._id, handleClose, mutateStudent, mutateBills, mutateCourse]);

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
                <div className="ps-5" key={item._id}>
                  {item.class} - {item.localDate}
                </div>
              );
            })
          ) : (
            <span>No Courses</span>
          )}
        </div>
      </div>
      <div className="row justify-content-end gap-2">
        <button
          className="btn btn-success col-3"
          onClick={() => {
            setShow(true);
          }}
        >
          Add
        </button>
        <button
          className="btn btn-danger col-3"
          disabled={isLoading}
          onClick={handleDelete}
        >
          {isLoading ? <Spinner /> : "Delete"}
        </button>
      </div>

      <AddCourse
        student={student}
        show={isShow}
        handleClose={() => {
          setShow(false);
        }}
      />
    </>
  );
};

export default StudentFeed;
