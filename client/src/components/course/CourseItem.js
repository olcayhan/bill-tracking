import axios from "axios";
import React, { useCallback, useState } from "react";
import Button from "../Button";
import config from "../../env/config";

import { toast } from "react-hot-toast";
import { useCoursesContext } from "../../contexts/CourseContext";
import { AiOutlineClose } from "react-icons/ai";

const CourseItem = ({ course }) => {
  const { mutate } = useCoursesContext();
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = useCallback(
    async (id) => {
      try {
        setIsLoading(true);
        const courseURL = new URL("/course/delete/" + id, config.API_URL);
        await axios.delete(courseURL);
        mutate();
        toast.success("Kurs Silindi");
      } catch (e) {
        toast.error("Something went wrong");
        console.error(e);
      } finally {
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

      <Button
        title={<AiOutlineClose size={30} />}
        handleSubmit={() => handleDelete(course?._id)}
        isLoading={isLoading}
        danger
      />
    </div>
  );
};

export default CourseItem;
