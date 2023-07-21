import React from "react";
import AdminClasses from "../components/courses/CoursesFeed";
import TopMenu from "../components/TopMenu";
import StudentList from "../components/StudentList";
import useAnnounce from "../hooks/useAnnounce";
import useStudents from "../hooks/useStudents";
import useBills from "../hooks/useBills";
import Spinner from "../components/Spinner";

import { StudentProvider } from "../contexts/StudentContext";
import { CourseProvider } from "../contexts/CourseContext";
import { BillProvider } from "../contexts/BillContext";
import { AnnounceProvider } from "../contexts/AnnounceContext";

export default function AdminStudents() {
  const { isLoading: isLoadingAnnounce } = useAnnounce();
  const { data: students, isLoading: isLoadingStudents } = useStudents();
  const { data: bills, isLoading: isLoadingBills } = useBills();

  if (isLoadingAnnounce || isLoadingBills || isLoadingStudents) {
    return <Spinner />;
  }
  return (
    <CourseProvider>
      <StudentProvider>
        <BillProvider>
          <AnnounceProvider>
            <div className="container mt-5">
              <TopMenu students={students} bills={bills} />
              <StudentList />
              <AdminClasses />
            </div>
          </AnnounceProvider>
        </BillProvider>
      </StudentProvider>
    </CourseProvider>
  );
}
