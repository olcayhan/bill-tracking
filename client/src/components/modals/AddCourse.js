import React, { useCallback, useState } from "react";
import ModalContent from "../ModalContent";
import { useCoursesContext } from "../../contexts/CourseContext";
import DatePickerForm from "../DatePickerForm";
import axios from "axios";

const AddCourse = ({ show, handleClose, student }) => {
  const { courses } = useCoursesContext();
  const [isLoading, setLoading] = useState(false);
  const [course, setCourse] = useState({
    studentID: student._id,
    courseID: courses[0]._id,
    class: courses[0].courseName,
    date: new Date(),
    localDate: new Date().toLocaleDateString(),
    isPaid: false,
  });

  console.log(course);
  const handleSubmit = useCallback(async () => {
    try {
      setLoading(true);
      await axios.post("https://bill-track.onrender.com/student/update", {
        studentID: student._id,
        course: course,
      });

      for (let i = 0; i < 12; i++) {
        await axios.post("https://bill-track.onrender.com/bill/add", {
          ...course,
          date: course.date.setMonth(course.date.getMonth() + 1),
          localDate: course.date.toLocaleDateString(),
        });
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
      handleClose();
      setCourse({
        studentID: student._id,
        courseID: courses[0]._id,
        class: courses[0].courseName,
        date: new Date(),
        localDate: new Date().toLocaleDateString(),
        isPaid: false,
      });
    }
  }, [course, student._id]);

  const bodyContent = (
    <div className="d-flex flex-column justify-content-center align-items-center gap-3 p-3">
      <select
        onChange={(e) =>
          setCourse({
            ...course,
            class: e.target.value,
            courseID: courses[e.target.selectedIndex]._id,
          })
        }
        className="w-100 bg-transparent border-1 border- p-2 text-light"
      >
        {courses.map((course) => {
          return (
            <option className="bg-dark text-light">{course.courseName}</option>
          );
        })}
      </select>
      <DatePickerForm course={course} setCourse={setCourse} />
      <button
        className="w-100 text-light p-2 rounded-2"
        style={{ backgroundColor: "#526D82", border: "none" }}
        onClick={handleSubmit}
      >
        Add
      </button>
    </div>
  );

  return (
    <div>
      <ModalContent
        title="Course"
        show={show}
        handleClose={handleClose}
        bodyContent={bodyContent}
      />
    </div>
  );
};

export default AddCourse;
