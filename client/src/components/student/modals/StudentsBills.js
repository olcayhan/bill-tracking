import React from 'react'
import { Modal } from 'react-bootstrap'
import { useClass } from '../../../contexts/ClassContext';


export default function StudentsBills({ show, handleClose, student }) {

    const { getBillsByID } = useClass();
    const bills = getBillsByID(student?.billID);

    return (
        <Modal show={show} onHide={handleClose} size="m">
            <Modal.Header closeButton closeVariant="white" className='bg-dark text-light text-center'>
                <h4> Faturalarım </h4>
            </Modal.Header>
            <Modal.Body className='bg-dark text-light'>
                <table className='table text-light'>
                    <thead>
                        <tr>
                            <th>Ders</th>
                            <th>Tarih</th>
                            <th>Durum</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            bills ? bills.map((item, key) => {
                                return (
                                    <tr key={key} className="ms-5" style={item.isPaid ? { backgroundColor: "#7AA874" } : { backgroundColor: "#FC2947" }}>
                                        <td>{item.class}</td>
                                        <td>{item.localDate}</td>
                                        <td>{item.isPaid ? "Ödendi" : "Ödenmedi"}</td>
                                    </tr>)
                            }) : <h1>Loading</h1>
                        }
                    </tbody>
                </table>
            </Modal.Body>
        </Modal>
    )
}
