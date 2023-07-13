import axios from "axios";

import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { toast } from "react-hot-toast";
import { useStudentsContext } from "../../../contexts/StudentContext";

export default function AddStudent({ show, handleClose }) {
  const { mutate: mutateStudent } = useStudentsContext();
  const [student, setStudent] = useState({
    date: new Date().toLocaleDateString(),
    name: "",
    surname: "",
    phone: "",
    email: "",
    password: "",
    courses: [],
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "https://bill-track.onrender.com/student/add",
        student
      );

      // selectCourse?.map(async (course) => {
      //   try {
      //     let courseID = courses?.find(
      //       (item) => item.courseName === course.class
      //     )._id;
      //     let courseStartDate = new Date(course.date);
      //     for (let index = 0; index < 12; index++) {
      //       courseStartDate.setMonth(courseStartDate.getMonth() + 1);
      //       await axios.post(
      //         "https://fatura-takip-backend.onrender.com/bill/add",
      //         {
      //           ...course,
      //           courseID: courseID,
      //           date: new Date(courseStartDate),
      //           localDate: new Date(courseStartDate).toLocaleDateString(),
      //         }
      //       );
      //     }
      //   } catch (err) {
      //     console.log(err);
      //   } finally {
      //     mutateBills();
      //   }
      // });
    } catch (e) {
      console.log(e);
    } finally {
      setStudent({
        date: new Date().toLocaleDateString(),
        name: "",
        surname: "",
        phone: "",
        email: "",
        password: "",
        courses: [],
      });
      toast.success("Öğrenci Eklendi");

      mutateStudent();

      handleClose();
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton className="bg-secondary">
        <Modal.Title>Ögrenci Ekle</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>İsim</Form.Label>
            <Form.Control
              value={student.name}
              type="text"
              onChange={(e) => setStudent({ ...student, name: e.target.value })}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="surname">
            <Form.Label>Soyisim</Form.Label>
            <Form.Control
              type="text"
              value={student.surname}
              onChange={(e) =>
                setStudent({ ...student, surname: e.target.value })
              }
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="phone">
            <Form.Label>Telefon</Form.Label>
            <Form.Control
              value={student.phone}
              type="text"
              placeholder="0530 000 00 00"
              onChange={(e) =>
                setStudent({ ...student, phone: e.target.value })
              }
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="mail">
            <Form.Label>E-mail</Form.Label>
            <Form.Control
              value={student.email}
              type="mail"
              placeholder="example@gmail.com"
              onChange={(e) =>
                setStudent({ ...student, email: e.target.value })
              }
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Şifre</Form.Label>
            <Form.Control
              value={student.password}
              type="text"
              onChange={(e) =>
                setStudent({ ...student, password: e.target.value })
              }
              required
            />
          </Form.Group>

          {/* <Form.Group className="mb-3">
            <Form.Label>Kurslar</Form.Label>
            <Multiselect
              className="text-dark"
              isObject={false}
              onSelect={(selectedItem) => {
                setCourses([...selectedItem]);
              }}
              onRemove={(selectedItem) => {
                setCourses([...selectedItem]);
                setSelectCourse(
                  selectCourse.filter((course) =>
                    selectedItem.includes(course.class)
                  )
                );
              }}
              options={courses?.map((item) => {
                return item?.courseName;
              })}
              placeholder="Kursu Seçiniz"
            />
          </Form.Group> */}
          {/* 
          {tempCourses?.map((item, key) => {
            return (
              <DatePickerForm
                item={item}
                count={key}
                studentID={student.billID}
                selectCourse={selectCourse}
                setSelectCourse={setSelectCourse}
              />
            );
          })} */}

          <Form.Group className="d-flex justify-content-end">
            <Button
              disabled={student.name.length < 2 || student.surname.length < 1}
              style={{ backgroundColor: "#511281", border: "none" }}
              type="submit"
            >
              Öğrenci Ekle
            </Button>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
