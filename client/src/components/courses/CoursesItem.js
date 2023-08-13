import React from "react";

export default function CoursesItem({ course, openStudentsModal }) {
  return (
    <button
      onClick={() => {
        openStudentsModal(course.courseName);
      }}
      className="cardBackground"
    >
      <p>
        {course.courseName.charAt(0).toUpperCase() + course.courseName.slice(1)}
      </p>
    </button>
  );
}
