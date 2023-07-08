import axios from "axios";
import React, { useCallback, useState } from "react";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import { useStudentsContext } from "../../../contexts/StudentContext";
import { Spinner } from "react-bootstrap";
const StudentFeed = ({ student }) => {
  const [isVisible, setVisible] = useState(true);
  const { mutate } = useStudentsContext();
  const [isLoading, setLoading] = useState(false);

  const handleDelete = useCallback(async () => {
    try {
      setLoading(true);
      await axios.post(
        "https://fatura-takip-backend.onrender.com/student/delete",
        { _id: student._id }
      );
    } catch (err) {
      console.error(err);
    } finally {
      mutate();
      setLoading(false);
    }
  }, []);

  return (
    <>
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
                {isVisible ? <BsEyeSlashFill /> : <BsEyeFill />}
              </span>
            </td>
          </tr>
          <tr>
            <td>Kayıtlı Kurslar</td>
            <td>:</td>
            <td>
              <div>
                {student?.courses.length > 0 ? (
                  student.courses.map((item) => {
                    return (
                      <p key={item._id} className="">
                        {item.class} - {item.localDate}
                      </p>
                    );
                  })
                ) : (
                  <p>Kayıtlı kurs yok</p>
                )}
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <div className="row justify-content-end">
        <button
          className="btn btn-danger col-3"
          disabled={isLoading}
          onClick={handleDelete}
        >
          {isLoading ? <Spinner /> : "Öğrenciyi sil"}
        </button>
      </div>
    </>
  );
};

export default StudentFeed;
