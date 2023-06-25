import React, { useState } from 'react'
import ShowBillModal from "./modals/ShowBillModal"
import ShowStudentModal from "./modals/ShowStudentModal"
import { useClass } from '../../contexts/ClassContext'

export default function QueryStudentTable({ student, index }) {
    const [isShowStudent, setIsShowStudent] = useState()
    const [isShowBill, setIsShowBill] = useState()
    const [viewStudent, setViewStudent] = useState()

    return (
        <>
            <tr className='text-dark-500'>
                <th scope='row'>{index + 1}</th>
                <td>{student.date}</td>
                <td>{student.name.charAt(0).toUpperCase() + student.name.slice(1)}</td>
                <td>{student.surname.toUpperCase()}</td>
                <td>
                    <button className='btn btn-success px-5' onClick={() => {
                        setViewStudent(student)
                        setIsShowBill(true);
                    }}>  <i className="fas fa-duotone fa-receipt fa-2x text-light"></i> </button>
                </td>

                <td>
                    <button className='btn btn-warning font-weight-bold px-3' onClick={() => {
                        setViewStudent(student)
                        setIsShowStudent(true)
                    }}>
                        <i className="fa-sharp fa-solid fa-circle-info fa-2x text-light"></i>
                    </button>
                </td>
            </tr>

            <ShowBillModal
                show={isShowBill}
                student={viewStudent}
                handleClose={() => setIsShowBill(false)}
            />

            <ShowStudentModal
                show={isShowStudent}
                studentID={viewStudent?._id}
                handleClose={() => setIsShowStudent(false)}
            />
        </>
    )
}
