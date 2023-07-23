import React, { useState } from "react";
import Students from "../modals/Students";
import Course from "../modals/Course";
import CoursesItem from "./CoursesItem";
import { useCoursesContext } from "../../contexts/CourseContext";
import { useStudentsContext } from "../../contexts/StudentContext";
import Button from "../Button";

export default function CoursesFeed() {
  const [isStudents, setIsStudents] = useState();
  const [isCourse, setIsCourse] = useState();
  const [newStudents, setNewStudents] = useState([]);
  const [classroomName, setClassroomName] = useState("");

  const { courses } = useCoursesContext();
  const { students } = useStudentsContext();

  function getStudents(name) {
    return students.filter((student) =>
      student.courses.some((course) => course.class === name)
    );
  }

  const openModal = (name) => {
    setIsStudents(true);
    setNewStudents(getStudents(name));
    setClassroomName(name);
  };

  return (
    <>
      <div className="mt-5">
        <div className="d-flex flex-row justify-content-between">
          <h1 className="text-light">Courses</h1>
          <Button
            title="Create Course"
            handleSubmit={() => setIsCourse(true)}
            primary
          />
        </div>
        <div className="d-flex flex-row justify-content-center align-items-center flex-wrap">
          {courses ? (
            courses.map((course, key) => {
              return (
                <CoursesItem key={key} course={course} openModal={openModal} />
              );
            })
          ) : (
            <h3 className="text-light text-center m-3">No Courses</h3>
          )}
        </div>
      </div>

      <Students
        show={isStudents}
        newStudents={newStudents}
        handleClose={() => setIsStudents(false)}
        classroomName={classroomName}
      />

      <Course show={isCourse} handleClose={() => setIsCourse(false)} />
    </>
  );
}
