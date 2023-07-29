import React, { useEffect } from "react";
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
import { useNavigate } from "react-router-dom";
import useUser from "../hooks/useUser";

export default function Admin() {
  const { data: user, isLoading: isLoadingUser } = useUser();
  const { isLoading: isLoadingAnnounce } = useAnnounce();
  const { data: students, isLoading: isLoadingStudents } = useStudents();
  const { data: bills, isLoading: isLoadingBills } = useBills();

  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoadingUser && user === undefined) navigate("/auth");
  }, [navigate, isLoadingUser, user]);

  if (isLoadingAnnounce || isLoadingBills || isLoadingStudents) {
    return <Spinner />;
  }
  return (
    <CourseProvider>
      <StudentProvider>
        <BillProvider>
          <AnnounceProvider>
            <div className="container mt-5">
              <button
                onClick={() => {
                  localStorage.removeItem("token");
                  localStorage.removeItem("userID");
                  navigate("/auth");
                }}
              >
                Logout
              </button>
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
