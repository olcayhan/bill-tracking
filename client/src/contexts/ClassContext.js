import React, { useContext } from "react";
import {
  addNewStudent,
  deleteStudent,
  addBilltoDB,
  addAnnouncestoDB,
  addCoursetoDB,
  deleteCoursetoDB,
} from "../axios";

const ClassContext = React.createContext();

export function useClass() {
  return useContext(ClassContext);
}

export const ClassProvider = ({ children }) => {


  
  function addStudent(student) {
    addNewStudent(student)
      .then((res) => {})
      .catch((err) => console.log(err));
  }

  function deleteStudentById(id) {
    deleteStudent(id)
      .then((response) => {})
      .catch((e) => console.log(e));
  }




  function addBill(data) {
    addBilltoDB(data)
      .then((res) => {})
      .catch((err) => {
        console.log(err);
      });
  }



  function addAnnounces(data) {
    addAnnouncestoDB(data)
      .then((res) => {})
      .catch((err) => {
        console.log(err);
      });
  }

  function addCourses(data) {
    addCoursetoDB({ ...data, adminID: localStorage.getItem("adminID") })
      .then((res) => {})
      .catch((err) => {
        console.log(err);
      });
  }

  function deleteCourse(data) {
    deleteCoursetoDB(data)
      .then((res) => {})
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <ClassContext.Provider
      value={{
        addStudent,
        deleteStudentById,
        addBill,
        addAnnounces,
        addCourses,
        deleteCourse,
      }}
    >
      {children}
    </ClassContext.Provider>
  );
};
