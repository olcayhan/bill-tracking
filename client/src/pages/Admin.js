import React from "react";
import { Container } from "react-bootstrap";

import AdminClasses from "../components/admin/courses/CoursesFeed";
import AdminTopMenu from "../components/admin/AdminTopMenu";
import AdminStudentList from "../components/admin/AdminStudentList";

export default function AdminStudents() {
  return (
    <>
      <Container style={{ marginTop: "125px" }}>
        <AdminTopMenu />
        <AdminStudentList />
      </Container>
      <AdminClasses />
    </>
  );
}
