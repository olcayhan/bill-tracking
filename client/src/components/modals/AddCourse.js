import React, { useCallback, useState } from "react";
import ModalContent from "../ModalContent";
import { useCoursesContext } from "../../contexts/CourseContext";
import { useStudentsContext } from "../../contexts/StudentContext";
import { useBillsContext } from "../../contexts/BillContext";
import DatePickerForm from "../DatePickerForm";
import axios from "axios";
import Button from "../Button";
import useUser from "../../hooks/useUser";
import config from "../../env/config";

const AddCourse = ({ show, handleClose, student }) => {
  const { courses, mutate: mutateCourse } = useCoursesContext();
  const { mutate: mutateStudents } = useStudentsContext();
  const { mutate: mutateBills } = useBillsContext();

  const [isLoading, setLoading] = useState(false);
  const { data: user } = useUser();

  const [course, setCourse] = useState({
    studentID: student?._id,
    courseID: courses[0]?._id,
    class: courses[0]?.courseName,
    date: new Date(),
    localDate: new Date().toLocaleDateString(),
    isPaid: false,
  });

  const handleAddCourseSubmit = useCallback(async () => {
    try {
      setLoading(true);
      const courseURL = new URL("/student/update", config.API_URL);
      await axios.post(courseURL, {
        studentID: student?._id,
        course: course,
      });

      for (let i = 0; i < 12; i++) {
        const billURL = new URL("/bill/add", config.API_URL);

        await axios.post(billURL, {
          ...course,
          userId: user?._id,
          date: course.date.setMonth(course.date.getMonth() + 1),
          localDate: course.date.toLocaleDateString(),
        });
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
      mutateCourse();
      mutateStudents();
      mutateBills();
      handleClose();
    }
  }, [
    course,
    student?._id,
    user?._id,
    handleClose,
    mutateBills,
    mutateCourse,
    mutateStudents,
  ]);

  const bodyContent = (
    <div className="d-flex flex-column justify-content-center align-items-center gap-3 p-3">
      <select
        onChange={(e) =>
          setCourse({
            ...course,
            class: e.target.value,
            courseID: courses[e.target.selectedIndex]?._id,
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

      <Button
        title="Add"
        loadingTitle="Adding"
        isLoading={isLoading}
        handleSubmit={handleAddCourseSubmit}
        primary
        full
      />
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
