import axios from "axios";
import React, { useCallback, useState } from "react";
import { toast } from "react-hot-toast";
import { useCoursesContext } from "../../../contexts/CourseContext";
import { Spinner } from "react-bootstrap";

const CourseItem = ({ course }) => {
  const { mutate } = useCoursesContext();
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = useCallback(
    async (id) => {
      try {
        setIsLoading(true);
        await axios.delete(
          `https://bill-track.onrender.com/course/delete/${id}`
        );
      } catch (e) {
        console.log(e);
      } finally {
        toast.success("Kurs Silindi");
        mutate();
        setIsLoading(false);
      }
    },
    [mutate]
  );

  return (
    <div
      className="d-flex flex-row justify-content-between align-items-center fw-semibold rounded-3 fs-6 p-3 m-2"
      style={{ background: "#526D82", color: "#fff" }}
    >
      <div className="w-25">{course.courseName}</div>
      <div>{course.localDate}</div>
      <button
        className="btn btn-danger"
        onClick={() => handleDelete(course?._id)}
        disabled={isLoading}
      >
        {isLoading ? <Spinner /> : "Delete"}
      </button>
    </div>
  );
};

export default CourseItem;
