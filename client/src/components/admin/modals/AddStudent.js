import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { useClass } from "../../../contexts/ClassContext";
import Multiselect from "multiselect-react-dropdown";
import "react-datepicker/dist/react-datepicker.css";
import DatePickerForm from "../DatePickerForm";
import { v4 as uuid } from "uuid";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useCoursesContext } from "../../../contexts/CourseContext";
import { useStudentsContext } from "../../../contexts/StudentContext";
import { useBillsContext } from "../../../contexts/BillContext";

export default function AddStudent({ show, handleClose }) {
  const [tempCourses, setCourses] = useState([]);
  const [selectCourse, setSelectCourse] = useState([]);
  const { courses } = useCoursesContext();
  const { mutate: mutateStudent } = useStudentsContext();
  const { mutate: mutateBills } = useBillsContext();

  const [student, setStudent] = useState({
    date: new Date().toLocaleDateString(),
    name: "",
    surname: "",
    phone: "",
    email: "",
    password: "",
    courses: [],
    billID: uuid(),
  });
  console.log(student);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "https://fatura-takip-backend.onrender.com/student/add",
        student
      );

      selectCourse?.map(async (course) => {
        try {
          let courseID = courses?.find(
            (item) => item.courseName === course.class
          )._id;
          let courseStartDate = new Date(course.date);
          for (let index = 0; index < 12; index++) {
            courseStartDate.setMonth(courseStartDate.getMonth() + 1);
            await axios.post(
              "https://fatura-takip-backend.onrender.com/bill/add",
              {
                ...course,
                courseID: courseID,
                date: new Date(courseStartDate),
                localDate: new Date(courseStartDate).toLocaleDateString(),
              }
            );
          }
        } catch (err) {
          console.log(err);
        } finally {
          mutateBills();
        }
      });
    } catch (e) {
      console.log(e);
    } finally {
      setCourses([]);
      setSelectCourse([]);
      setStudent({
        date: new Date().toLocaleDateString(),
        name: "",
        surname: "",
        phone: "",
        email: "",
        password: "",
        courses: [],
        billID: uuid(),
      });
      toast.success("Öğrenci Eklendi");
      toast.success("Faturalar Eklendi");

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

          <Form.Group className="mb-3">
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
          </Form.Group>

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
          })}

          <Form.Group className="d-flex justify-content-end">
            <Button
              disabled={student.name.length < 2 || student.surname.length < 1}
              style={{ backgroundColor: "#511281", border: "none" }}
              type="submit"
              onClick={() =>
                setStudent({ ...student, courses: [...selectCourse] })
              }
            >
              Öğrenci Ekle
            </Button>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
