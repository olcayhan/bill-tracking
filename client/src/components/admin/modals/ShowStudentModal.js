import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { useClass } from "../../../contexts/ClassContext";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
export default function ShowStudentModal({ show, studentID, handleClose }) {
  const { deleteStudentById, getStudent } = useClass();
  const student = getStudent(studentID);
  const [isVisible, setVisible] = useState(true);
  return (
    <Modal show={show} onHide={handleClose} size="m">
      <Modal.Header closeButton className="bg-secondary">
        <h4> Öğrenci Detayları </h4>
      </Modal.Header>
      <Modal.Body>
        <table className="table">
          <tbody>
            <tr>
              <td>Kayıt Tarihi</td>
              <td>:</td>
              <td>{student?.date}</td>
            </tr>
            <tr>
              <td>İsim</td>
              <td>:</td>
              <td>{student?.name.toUpperCase()}</td>
            </tr>
            <tr>
              <td>Soyisim</td>
              <td>:</td>
              <td>{student?.surname.toUpperCase()}</td>
            </tr>
            <tr>
              <td>Telefon Numarası</td>
              <td> : </td>
              <td>{student?.phone}</td>
            </tr>
            <tr>
              <td>E-mail</td>
              <td>:</td>
              <td>{student?.email}</td>
            </tr>
            <tr>
              <td>Sifre</td>
              <td>:</td>
              <td>
                {isVisible
                  ? "*".repeat(student?.password.length)
                  : student?.password}
                <span
                  className="ms-2 fs-5"
                  onClick={() => {
                    setVisible(!isVisible);
                  }}
                >
                  {" "}
                  {isVisible ? <BsEyeSlashFill /> : <BsEyeFill />}
                </span>
              </td>
            </tr>
            <tr>
              <td>Kayıtlı Kurslar</td>
              <td>:</td>
              <td>
                {student ? (
                  student.courses.map((item, key) => {
                    return (
                      <p key={key} className="">
                        {item.class} - {item.localDate}
                      </p>
                    );
                  })
                ) : (
                  <h1>Loading</h1>
                )}
              </td>
            </tr>
          </tbody>
        </table>
        <div className="row justify-content-end">
          <button
            className="btn btn-danger col-3"
            onClick={() => {
              deleteStudentById(student);
              handleClose();
            }}
          >
            Öğrenciyi sil
          </button>
        </div>
      </Modal.Body>
    </Modal>
  );
}
