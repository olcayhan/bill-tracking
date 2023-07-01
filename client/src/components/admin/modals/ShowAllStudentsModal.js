import React from "react";
import { Modal, Stack } from "react-bootstrap";

export default function ShowAllStudentsModal({
  show,
  newStudents,
  handleClose,
  classroomName,
}) {
  return (
    <>
      {newStudents ? (
        <Modal show={show} onHide={handleClose} size="m">
          <Modal.Header closeButton className="text-center">
            <h4>
              {classroomName} Kursu Öğrencileri &#40; {newStudents.length} &#41;
            </h4>
          </Modal.Header>

          <Modal.Body>
            <Stack
              direction="horizontal"
              className="px-3 d-flex  justify-content-between"
            >
              <p>İsim</p>
              <p>Soyisim</p>
              <p>Katılım Tarihi</p>
            </Stack>

            {newStudents.length !== 0 ? (
              newStudents.map((student, key) => {
                return (
                  <Stack
                    direction="horizontal"
                    className="bg-light m-2 p-2 d-flex align-items-center justify-content-between rounded"
                    key={key}
                  >
                    <p>
                      {student.name.charAt(0).toUpperCase() +
                        student.name.slice(1)}
                    </p>
                    <p>{student.surname.toUpperCase()}</p>
                    <p>{student.date}</p>
                  </Stack>
                );
              })
            ) : (
              <p>Öğrenci Bulunamadı</p>
            )}
          </Modal.Body>
        </Modal>
      ) : (
        <p>Yükleniyor</p>
      )}
    </>
  );
}
