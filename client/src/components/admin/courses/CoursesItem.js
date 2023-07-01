import React from "react";

export default function CoursesItem({ course, openModal }) {
  return (
    <button
      onClick={() => {
        openModal(course.courseName);
      }}
      className="cardBackground col"
    >
      <p>
        {course.courseName.charAt(0).toUpperCase() + course.courseName.slice(1)}
      </p>
    </button>
  );
}
