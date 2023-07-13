import React, { useState } from "react";
import Announcement from "./modals/Announcement";
import AddStudent from "./modals/AddStudent";
import { useAnnounceContext } from "../../contexts/AnnounceContext";
import { useBillsContext } from "../../contexts/BillContext";
import { useStudentsContext } from "../../contexts/StudentContext";
import Card from "./Card";

import { AiOutlineUserAdd } from "react-icons/ai";
import { RiBillFill } from "react-icons/ri";
import { MdAnnouncement } from "react-icons/md";
import { Spinner } from "react-bootstrap";

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
        length={students ? students.length : <Spinner />}
        color="#0B666A"
        callback={() => {
          setIsAddStudent(true);
        }}
        icon={<AiOutlineUserAdd color="white" size={50} />}
      />

      <Card
        title="Bills"
        length={bills ? bills.length : <Spinner />}
        color="#4A55A2"
        callback={() => {}}
        icon={<RiBillFill size={50} color="white" />}
      />

      <Card
        title="Announces"
        length={announces ? announces.length : <Spinner />}
        color="#898121"
        callback={() => {
          setIsAnnounce(true);
        }}
        icon={<MdAnnouncement color="white" size={50} />}
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
