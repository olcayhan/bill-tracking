import React, { useContext } from "react";
import useCourses from "../hooks/useCourses";

const CourseContext = React.createContext();

export function useCoursesContext() {
  return useContext(CourseContext);
}

export const CourseProvider = ({ children }) => {
  const { data: courses, isLoading, mutate } = useCourses();

  return (
    <CourseContext.Provider value={{ courses, isLoading, mutate }}>
      {children}
    </CourseContext.Provider>
  );
};
