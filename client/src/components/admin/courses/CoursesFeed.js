import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { useClass } from "../../../contexts/ClassContext";
import ShowAllStudentsModal from "../modals/ShowAllStudentsModal";
import ShowAddCourseModal from "../modals/ShowAddCourseModal";
import CoursesItem from "./CoursesItem";

export default function CoursesFeed() {
  const { courses, getStudents } = useClass();
  const [isShowShowAllStudents, setIsShowShowAllStudents] = useState();
  const [isShowAdd, setIsShowShowAdd] = useState();
  const [newStudents, setNewStudents] = useState([]);
  const [classroomName, setClassroomName] = useState("");

  const openModal = (name) => {
    setIsShowShowAllStudents(true);
    setNewStudents(getStudents(name));
    setClassroomName(name);
  };

  return (
    <>
      <Container className="mt-5">
        <div className="d-flex justify-content-center">
          <h1 className="w-75" style={{ color: "#fff" }}>
            {" "}
            Dersler
          </h1>
          <button
            className="btn btn-dark"
            onClick={() => setIsShowShowAdd(true)}
          >
            {" "}
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

      <ShowAllStudentsModal
        show={isShowShowAllStudents}
        newStudents={newStudents}
        handleClose={() => setIsShowShowAllStudents(false)}
        classroomName={classroomName}
      />

      <ShowAddCourseModal
        show={isShowAdd}
        handleClose={() => setIsShowShowAdd(false)}
      />
    </>
  );
}
