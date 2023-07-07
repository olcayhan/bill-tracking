import React, { useState } from "react";
import StudentsBills from "./modals/Bills";
import StudentsInfo from "./modals/Info";
import StudentUnpaidBills from "./modals/UnpaidBills";
import StudentAnnounces from "./modals/Announces";

import { RiFilePaper2Fill } from "react-icons/ri";
import { HiInformationCircle } from "react-icons/hi";
import { GoAlert } from "react-icons/go";
import { MdAnnouncement } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import { useClass } from "../../contexts/ClassContext";

export default function Cards() {
  const [isStudentInfo, setStudentInfo] = useState();
  const [isStudentBill, setStudentBill] = useState();
  const [isStudentUnpaid, setStudentUnpaid] = useState();
  const [isStudentAnnounces, setStudentAnnounces] = useState();

  const { id } = useParams();
  const navigate = useNavigate();

  // const student = getStudent(id);

  let student;
  if (!student) {
    return (
      <div>
        <h1>404</h1>
      </div>
    );
  }

  return (
    <div className="row row-cols-3 justify-content-center">
      <button
        className="cardBackground col"
        onClick={() => {
          setStudentInfo(true);
        }}
        style={{ backgroundColor: "#F5E9CF" }}
      >
        <HiInformationCircle size={70} />
        <br />
        Bilgilerim
      </button>
      <button
        className="cardBackground col"
        onClick={() => {
          setStudentBill(true);
        }}
        style={{ backgroundColor: "#86A3B8" }}
      >
        <RiFilePaper2Fill size={70} />
        <br />
        Faturalarım
      </button>

      <button
        className="cardBackground col"
        onClick={() => {
          setStudentUnpaid(true);
        }}
        style={{ backgroundColor: "#D0B8A8" }}
      >
        <GoAlert size={70} />
        <br />
        Ödenmeyen
      </button>
      <button
        className="cardBackground col"
        onClick={() => {
          setStudentAnnounces(true);
        }}
        style={{ backgroundColor: "#FFFFD0" }}
      >
        <MdAnnouncement size={70} />
        <br />
        Duyurular
      </button>

      <StudentsInfo
        student={student}
        show={isStudentInfo}
        handleClose={() => setStudentInfo(false)}
      />

      <StudentsBills
        student={student}
        show={isStudentBill}
        handleClose={() => setStudentBill(false)}
      />
      <StudentUnpaidBills
        student={student}
        show={isStudentUnpaid}
        handleClose={() => setStudentUnpaid(false)}
      />
      <StudentAnnounces
        show={isStudentAnnounces}
        handleClose={() => setStudentAnnounces(false)}
      />
    </div>
  );
}
