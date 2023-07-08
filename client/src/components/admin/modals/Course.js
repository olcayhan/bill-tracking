import React, { useCallback, useState } from "react";
import { Modal } from "react-bootstrap";
import { useCoursesContext } from "../../../contexts/CourseContext";
import { toast } from "react-hot-toast";
import axios from "axios";
import CourseFeed from "../course/CourseFeed";

export default function Course({ show, handleClose }) {
  const [courseName, setCourseName] = useState();
  const { mutate } = useCoursesContext();

  const handleSubmit = useCallback(async () => {
    try {
      await axios.post("https://fatura-takip-backend.onrender.com/course/add", {
        courseName: courseName,
        localDate: new Date().toLocaleDateString(),
        date: Date.now(),
      });
    } catch (e) {
      console.log(e);
    } finally {
      toast.success("Kurs Eklendi");
      setCourseName("");
      mutate();
    }
  }, [courseName]);

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton className="bg-secondary">
        <Modal.Title>Kurs Ekle</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <input
          className="w-100 h-auto m-1 p-3"
          type="text"
          placeholder="Kurs ismini bu kısıma yazınız ..."
          onChange={(e) => {
            setCourseName(e.target.value);
          }}
          value={courseName}
        />
        <button
          className="btn btn-success ms-auto m-3 w-100"
          onClick={handleSubmit}
        >
          Ekle
        </button>

        <h1 className="text-center">Kurslar</h1>
        <hr />
        <CourseFeed />
      </Modal.Body>
    </Modal>
  );
}
