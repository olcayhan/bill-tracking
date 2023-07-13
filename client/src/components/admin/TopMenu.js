import React, { useState } from "react";
import Announcement from "./modals/Announcement";
import AddStudent from "./modals/AddStudent";
import { useAnnounceContext } from "../../contexts/AnnounceContext";
import { useBillsContext } from "../../contexts/BillContext";
import { useStudentsContext } from "../../contexts/StudentContext";
import Card from "./Card";

export default function TopMenu() {
  const [isAddStudent, setIsAddStudent] = useState();
  const [isAnnounce, setIsAnnounce] = useState();

  const { announces } = useAnnounceContext();
  const { bills } = useBillsContext();
  const { students } = useStudentsContext();

  return (
    <div className="d-flex flex-row flex-wrap justify-content-center align-items-center gap-5">
      <Card
        title="Student"
        length={students?.length}
        color="#0B666A"
        callback={() => {
          setIsAddStudent(true);
        }}
        icon={<i className="fas fa-user-plus fa-3x text-light"></i>}
      />

      <Card
        title="Bills"
        length={bills?.length}
        color="#4A55A2"
        callback={() => {}}
        icon={<i className="fas fa-duotone fa-receipt fa-3x text-light"></i>}
      />

      <Card
        title="Announces"
        length={announces?.length}
        color="#898121"
        callback={() => {
          setIsAnnounce(true);
        }}
        icon={<i className="fas fa-bullhorn fa-3x text-light"></i>}
      />

      <AddStudent
        show={isAddStudent}
        handleClose={() => setIsAddStudent(false)}
      />

      <Announcement
        show={isAnnounce}
        handleClose={() => setIsAnnounce(false)}
      />
    </div>
  );
}
