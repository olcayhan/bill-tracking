import React, { useCallback, useState } from "react";
import { useCoursesContext } from "../../contexts/CourseContext";
import { toast } from "react-hot-toast";

import axios from "axios";
import CourseFeed from "../course/CourseFeed";
import ModalContent from "../ModalContent";
import Button from "../Button";
import useUser from "../../hooks/useUser";

export default function Course({ show, handleClose }) {
  const [courseName, setCourseName] = useState();
  const { mutate } = useCoursesContext();
  const [isLoading, setLoading] = useState(false);
  const { data } = useUser();
  const handleSubmit = useCallback(async () => {
    try {
      setLoading(true);
      await axios.post("https://bill-track.onrender.com/course/add", {
        userId: data._id,
        courseName: courseName,
        localDate: new Date().toLocaleDateString(),
        date: Date.now(),
      });
    } catch (e) {
      console.error(e);
    } finally {
      toast.success("Course Created");
      setCourseName("");
      mutate();
      setLoading(false);
    }
  }, [courseName, mutate]);

  const bodyContent = (
    <div className="d-flex flex-column justify-content-center align-items-center gap-3">
      <input
        className="w-100 border broder-light rounded-3 m-1 p-3 bg-transparent text-light"
        style={{ outline: "none" }}
        type="text"
        placeholder="Write here ..."
        onChange={(e) => {
          setCourseName(e.target.value);
        }}
        value={courseName}
      />

      <Button
        title="Create"
        loadingTitle="Creating"
        isLoading={isLoading}
        handleSubmit={handleSubmit}
        primary
        full
      />
      <CourseFeed />
    </div>
  );

  return (
    <ModalContent
      title="Create Course"
      bodyContent={bodyContent}
      show={show}
      handleClose={handleClose}
    />
  );
}
