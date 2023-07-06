import React from "react";
import { Container } from "react-bootstrap";

import AdminClasses from "../components/admin/courses/CoursesFeed";
import TopMenu from "../components/admin/TopMenu";
import StudentList from "../components/admin/StudentList";
import useAnnounce from "../hooks/useAnnounce";
import useStudents from "../hooks/useStudents";
import useBills from "../hooks/useBills";
import Spinner from "../components/Spinner";

export default function AdminStudents() {
  const { data: announces, isLoading: isLoadingAnnounce } = useAnnounce();
  const { data: students, isLoading: isLoadingStudents } = useStudents();
  const { data: bills, isLoading: isLoadingBills } = useBills();

  if (isLoadingAnnounce || isLoadingBills || isLoadingStudents) {
    return <Spinner />;
  }
  return (
    <>
      <Container style={{ marginTop: "125px" }}>
        <TopMenu announces={announces} students={students} bills={bills} />
        <StudentList />
      </Container>
      <AdminClasses />
    </>
  );
}
