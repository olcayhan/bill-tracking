import axios from "axios";

import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { toast } from "react-hot-toast";
import { useStudentsContext } from "../../../contexts/StudentContext";
import ModalContent from "../../ModalContent";

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
      await axios.post("https://bill-track.onrender.com/student/add", student);
    } catch (e) {
      console.log(e);
    } finally {
      setStudent({
        date: new Date().toLocaleDateString(),
        name: "",
        surname: "",
        phone: "",
        email: "",
        courses: [],
      });
      toast.success("Student Created");
      mutateStudent();
      handleClose();
    }
  };

  const bodyContent = (
    <Form
      onSubmit={handleSubmit}
      className="d-flex flex-column justify-content-center gap-3 text-light fw-semibold fs-5"
    >
      <Form.Group controlId="name">
        <Form.Label>Name</Form.Label>
        <Form.Control
          className="bg-transparent text-light"
          value={student.name}
          type="text"
          onChange={(e) => setStudent({ ...student, name: e.target.value })}
          required
        />
      </Form.Group>

      <Form.Group controlId="surname">
        <Form.Label>Surname</Form.Label>
        <Form.Control
          className="bg-transparent text-light"
          type="text"
          value={student.surname}
          onChange={(e) => setStudent({ ...student, surname: e.target.value })}
          required
        />
      </Form.Group>

      <Form.Group controlId="phone">
        <Form.Label>Phone</Form.Label>
        <Form.Control
          className="bg-transparent text-light"
          value={student.phone}
          type="text"
          onChange={(e) => setStudent({ ...student, phone: e.target.value })}
          required
        />
      </Form.Group>

      <Form.Group controlId="mail">
        <Form.Label>E-mail</Form.Label>
        <Form.Control
          className="bg-transparent text-light"
          value={student.email}
          type="mail"
          onChange={(e) => setStudent({ ...student, email: e.target.value })}
          required
        />
      </Form.Group>

      <Form.Group className="d-flex justify-content-end">
        <button
          disabled={student.name.length < 2 || student.surname.length < 1}
          style={{ backgroundColor: "#526D82", border: "none" }}
          type="submit"
          className="btn p-3 text-light"
        >
          Create
        </button>
      </Form.Group>
    </Form>
  );

  return (
    <ModalContent
      title="Create Student"
      bodyContent={bodyContent}
      show={show}
      handleClose={handleClose}
    />
  );
}
