import React, { useCallback, useState } from "react";
import { Modal } from "react-bootstrap";
import { useClass } from "../../../contexts/ClassContext";
import { toast } from "react-hot-toast";

export default function ShowAddCourseModal({ show, handleClose }) {
  const { addCourses, courses, deleteCourse } = useClass();
  const [courseName, setCourseName] = useState();

  const handleSubmit = useCallback(() => {
    addCourses({
      courseName: courseName,
      localDate: new Date().toLocaleDateString(),
      date: Date.now(),
    });
    toast.success("Kurs Eklendi");
    setCourseName("");
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
        <table className="table">
          <tbody>
            {courses?.length !== 0 ? (
              courses.map((course, key) => {
                return (
                  <tr key={key}>
                    <td>{course.courseName}</td>
                    <td>:</td>
                    <td>{course.localDate}</td>
                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={() => {
                          deleteCourse(course?._id);
                          handleClose();
                        }}
                      >
                        Sil
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <p className="text-center">Kurs Bulunmamaktadır</p>
            )}
          </tbody>
        </table>
      </Modal.Body>
    </Modal>
  );
}
