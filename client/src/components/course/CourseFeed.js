import React from "react";
import { useCoursesContext } from "../../contexts/CourseContext";
import Spinner from "../Spinner";
import CourseItem from "./CourseItem";

const CourseFeed = () => {
  const { courses, isLoading } = useCoursesContext();

  if (isLoading) {
    return <Spinner />;
  }

  if (courses?.length === 0) {
    return <p className="text-center text-light">No Course</p>;
  }
  return (
    <div className="flex flex-col w-100">
      {courses?.map((course) => {
        return <CourseItem course={course} />;
      })}
    </div>
  );
};

export default CourseFeed;
