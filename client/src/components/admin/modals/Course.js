import React, { useCallback, useState } from "react";
import { Spinner } from "react-bootstrap";
import { useCoursesContext } from "../../../contexts/CourseContext";
import { toast } from "react-hot-toast";

import axios from "axios";
import CourseFeed from "../course/CourseFeed";
import ModalContent from "../../ModalContent";

export default function Course({ show, handleClose }) {
  const [courseName, setCourseName] = useState();
  const { mutate } = useCoursesContext();
  const [isLoading, setLoading] = useState(false);
  const handleSubmit = useCallback(async () => {
    try {
      setLoading(true);
      await axios.post("https://bill-track.onrender.com/course/add", {
        courseName: courseName,
        localDate: new Date().toLocaleDateString(),
        date: Date.now(),
      });
    } catch (e) {
      console.log(e);
    } finally {
      toast.success("Course Created");
      setCourseName("");
      mutate();
      setLoading(false);
    }
  }, [courseName, mutate]);

  const bodyContent = (
    <>
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
      <button
        className="border-0 p-2 rounded-2 ms-auto m-3 w-100"
        style={{ background: "#526D82", color: "#fff" }}
        onClick={handleSubmit}
        disabled={isLoading}
      >
        {isLoading ? (
          <div className="d-flex flex-row justify-content-center align-items-center gap-4">
            <div>Creating</div>
            <Spinner />
          </div>
        ) : (
          "Create"
        )}
      </button>
      <hr />
      <CourseFeed />
    </>
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
