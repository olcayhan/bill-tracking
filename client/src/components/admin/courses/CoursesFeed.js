import React, { useState } from "react";
import { Container } from "react-bootstrap";
import Students from "../modals/Students";
import Course from "../modals/Course";
import CoursesItem from "./CoursesItem";
import useCourses from "../../../hooks/useCourses";
import useStudents from "../../../hooks/useStudents";

export default function CoursesFeed() {
  const [isStudents, setIsStudents] = useState();
  const [isCourse, setIsCourse] = useState();
  const [newStudents, setNewStudents] = useState([]);
  const [classroomName, setClassroomName] = useState("");

  const { data: courses } = useCourses();
  const { data: students } = useStudents();

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
      <Container className="mt-5">
        <div className="d-flex justify-content-center">
          <h1 className="w-75" style={{ color: "#fff" }}>
            Dersler
          </h1>
          <button className="btn btn-dark" onClick={() => setIsCourse(true)}>
            Ders Ekle
          </button>
        </div>
        <div className="row row-cols-3 justify-content-center">
          {courses ? (
            courses.map((course, key) => {
              return (
                <CoursesItem key={key} course={course} openModal={openModal} />
              );
            })
          ) : (
            <h3 className="text-light text-center m-3">Ders Bulunmamaktadır</h3>
          )}
        </div>
      </Container>

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
