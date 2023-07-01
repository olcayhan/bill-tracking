import React, { useContext, useEffect, useState } from "react";
import {
  getAllStudent,
  addNewStudent,
  deleteStudent,
  togglePaid,
  addBilltoDB,
  getBillstoDB,
  validUser,
  addAnnouncestoDB,
  getAnnouncestoDB,
  validAdmin,
  deleteAnnouncestoDB,
  addCoursetoDB,
  getCoursetoDB,
  deleteCoursetoDB,
} from "../axios";

const ClassContext = React.createContext();

export function useClass() {
  return useContext(ClassContext);
}

export const ClassProvider = ({ children }) => {
  const [students, setStudents] = useState([]);
  const [bills, setBills] = useState([]);
  const [announces, setAnnounces] = useState([]);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    updateFunction();
  }, []);

  const updateFunction = () => {
    getAllStudents();
    getBills();
    getAnnounces();
    getCourses();
  };

  function getAllStudents() {
    getAllStudent()
      .then((res) => {
        setStudents(res.data.students);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function addStudent(student) {
    addNewStudent(student)
      .then((res) => updateFunction())
      .catch((err) => console.log(err));
  }

  function deleteStudentById(id) {
    deleteStudent(id)
      .then((response) => updateFunction())
      .catch((e) => console.log(e));
  }

  function getStudents(name) {
    return students.filter((student) =>
      student.courses.some((course) => course.class === name)
    );
  }

  function getStudent(studentID) {
    return students.find((student) => student._id === studentID);
  }

  function payBill(id) {
    togglePaid(id)
      .then((res) => {
        updateFunction();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function addBill(data) {
    addBilltoDB(data)
      .then((res) => {
        updateFunction();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function getBills() {
    getBillstoDB()
      .then((res) => {
        setBills(res.data.bills);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function getBillsByID(studentID) {
    return bills.filter((bill) => {
      return bill.studentID === studentID;
    });
  }

  function loginUser(studentLogin) {
    validUser(studentLogin)
      .then((res) => {
        localStorage.setItem("user", res.data.student._id);
        window.location.pathname = "/student";
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function loginAdmin(adminLogin) {
    validAdmin(adminLogin)
      .then((res) => {
        window.location.pathname = "/admin";
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function addAnnounces(data) {
    addAnnouncestoDB(data)
      .then((res) => {
        updateFunction();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function getAnnounces(data) {
    getAnnouncestoDB(data)
      .then((res) => {
        setAnnounces(res.data.announce);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function deleteAnnounces(data) {
    deleteAnnouncestoDB(data)
      .then((res) => {
        updateFunction();
      })
      .catch((err) => {
        console.log(err);
      });
  }
  /* Courses  */

  function addCourses(data) {
    addCoursetoDB({ ...data, adminID: localStorage.getItem("adminID") })
      .then((res) => {
        console.log(res);
        updateFunction();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function getCourses(data) {
    getCoursetoDB(data)
      .then((res) => {
        setCourses(res.data.courses);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function deleteCourse(data) {
    deleteCoursetoDB(data)
      .then((res) => {
        updateFunction();
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <ClassContext.Provider
      value={{
        addStudent,
        deleteStudentById,
        getStudent,
        getStudents,
        payBill,
        addBill,
        getBillsByID,
        loginUser,
        loginAdmin,
        addAnnounces,
        deleteAnnounces,
        addCourses,
        getCourses,
        deleteCourse,
        announces,
        students,
        bills,
        courses,
      }}
    >
      {children}
    </ClassContext.Provider>
  );
};
