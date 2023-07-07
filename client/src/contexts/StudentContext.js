import React, { useContext } from "react";
import useStudents from "../hooks/useStudents";

const StudentContext = React.createContext();

export function useStudentsContext() {
  return useContext(StudentContext);
}

export const StudentProvider = ({ children }) => {
  const { data: students, isLoading, mutate } = useStudents();

  return (
    <StudentContext.Provider value={{ students, isLoading, mutate }}>
      {children}
    </StudentContext.Provider>
  );
};
