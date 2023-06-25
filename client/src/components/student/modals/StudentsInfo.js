import React from 'react'
import { Modal } from 'react-bootstrap'

export default function StudentsInfo({ show, handleClose, student }) {

    return (
        <Modal show={show} onHide={handleClose} size="m">
            <Modal.Header closeButton closeVariant="white" className='bg-dark text-light text-center'>
                <h4> Öğrenci Detayları </h4>
            </Modal.Header>

            <Modal.Body className='bg-dark text-light'>
                <p>Kayıt Tarihi : {student?.date}</p>
                <p> İsim : {student?.name.toUpperCase()} </p>
                <p>Soyisim : {student?.surname.toUpperCase()}</p>
                <p>Telefon Numarası : {student?.phone}</p>
                <p>E-mail : {student?.email}</p>
                <p>Sifre : {student?.password}</p>
                <p>Kayıtlı Kurslar :</p>

                {
                    student?.courses ? student.courses.map((item, key) => {
                        return <p key={key} className="ms-5">{item.class}  -  {item.localDate}</p>
                    }) : <h1>Loading</h1>
                }
            </Modal.Body>
        </Modal>
    )
}
