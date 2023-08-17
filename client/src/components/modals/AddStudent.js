import axios from "axios";
import ModalContent from "../ModalContent";
import Button from "../Button";

import React, { useCallback, useState } from "react";
import { Form } from "react-bootstrap";
import { toast } from "react-hot-toast";
import { useStudentsContext } from "../../contexts/StudentContext";
import useUser from "../../hooks/useUser";
import config from "../../env/config";

export default function AddStudent({ show, handleClose }) {
  const { mutate: mutateStudent } = useStudentsContext();
  const [isLoading, setLoading] = useState(false);
  const { data: user } = useUser();

  const [student, setStudent] = useState({
    date: new Date().toLocaleDateString(),
    courses: [],
  });

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        setLoading(true);
        const studentURL = new URL("/student/add", config.API_URL);
        const studentData = {
          ...student,
          userId: user?._id,
        };

        await axios.post(studentURL, studentData);
        toast.success("Student Created");
      } catch (e) {
        console.error(e);
        toast.error("Something went wrong");
      } finally {
        setLoading(false);
        setStudent({
          date: new Date().toLocaleDateString(),
          name: "",
          surname: "",
          phone: "",
          email: "",
          courses: [],
        });
        mutateStudent();
        handleClose();
      }
    },
    [mutateStudent, user?._id, student, handleClose]
  );

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

      <Form.Group className="d-flex">
        <Button
          title="Create"
          loadingTitle="Creating"
          isLoading={isLoading}
          full
          primary
        />
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
