import React, { useCallback, useState } from "react";
import { useCoursesContext } from "../../contexts/CourseContext";
import { toast } from "react-hot-toast";

import axios from "axios";
import CourseFeed from "../course/CourseFeed";
import ModalContent from "../ModalContent";
import Button from "../Button";
import useUser from "../../hooks/useUser";
import config from "../../env/config";

export default function Course({ show, handleClose }) {
  const { mutate } = useCoursesContext();

  const [courseName, setCourseName] = useState("");
  const [isLoading, setLoading] = useState(false);

  const { data: user } = useUser();

  const handleSubmit = useCallback(async () => {
    try {
      setLoading(true);
      const courseURL = new URL("/course/add", config.API_URL);
      const courseData = {
        userId: user?._id,
        courseName: courseName,
        localDate: new Date().toLocaleDateString(),
        date: Date.now(),
      };
      
      await axios.post(courseURL, courseData);
      toast.success("Course Created");
      mutate();
    } catch (e) {
      console.error(e);
      toast.error("Something went wrong");
    } finally {
      setCourseName("");
      setLoading(false);
    }
  }, [courseName, mutate, user?._id]);

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
