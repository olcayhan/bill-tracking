import React, { useContext } from "react";
import { deleteStudent, addBilltoDB } from "../axios";

const ClassContext = React.createContext();

export function useClass() {
  return useContext(ClassContext);
}

export const ClassProvider = ({ children }) => {
  
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

  return (
    <ClassContext.Provider
      value={{
        deleteStudentById,
        addBill,
      }}
    >
      {children}
    </ClassContext.Provider>
  );
};
