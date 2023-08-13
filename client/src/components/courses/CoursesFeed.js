import React, { useState } from "react";
import Students from "../modals/Students";
import Course from "../modals/Course";
import CoursesItem from "./CoursesItem";
import { useCoursesContext } from "../../contexts/CourseContext";
import { useStudentsContext } from "../../contexts/StudentContext";
import Button from "../Button";

export default function CoursesFeed() {
  const [isStudentsModalOpen, setIsStudentsModalOpen] = useState(false);
  const [isCourseModalOpen, setIsCourseModalOpen] = useState(false);
  const [newStudents, setNewStudents] = useState([]);
  const [classroomName, setClassroomName] = useState("");

  const { courses } = useCoursesContext();
  const { students } = useStudentsContext();

  function getStudentsForCourse(name) {
    return students.filter((student) =>
      student.courses.some((course) => course.class === name)
    );
  }

  const openStudentsModal = (name) => {
    setIsStudentsModalOpen(true);
    setNewStudents(getStudentsForCourse(name));
    setClassroomName(name);
  };
  return (
    <>
      <div className="mt-5">
        <div className="d-flex flex-row justify-content-between">
          <h1 className="text-light">Courses</h1>
          <Button
            title="Create Course"
            handleSubmit={() => setIsCourseModalOpen(true)}
            primary
          />
        </div>
        <div className="d-flex flex-row justify-content-center align-items-center flex-wrap">
          {courses ? (
            courses.map((course, key) => {
              return (
                <CoursesItem
                  key={key}
                  course={course}
                  openStudentsModal={openStudentsModal}
                />
              );
            })
          ) : (
            <h3 className="text-light text-center m-3">No Courses</h3>
          )}
        </div>
      </div>

      <Students
        show={isStudentsModalOpen}
        newStudents={newStudents}
        handleClose={() => setIsStudentsModalOpen(false)}
        classroomName={classroomName}
      />

      <Course
        show={isCourseModalOpen}
        handleClose={() => setIsCourseModalOpen(false)}
      />
    </>
  );
}
