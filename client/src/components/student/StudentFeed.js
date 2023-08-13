import axios from "axios";
import React, { useCallback, useState } from "react";
import Button from "../Button";
import AddCourse from "../modals/AddCourse";

import { toast } from "react-hot-toast";
import { useStudentsContext } from "../../contexts/StudentContext";
import { useBillsContext } from "../../contexts/BillContext";
import { useCoursesContext } from "../../contexts/CourseContext";
import { AiOutlineClose } from "react-icons/ai";
import config from "../../env/config";

const StudentFeed = ({ student, handleClose }) => {
  const { mutate: mutateStudent } = useStudentsContext();
  const { mutate: mutateBills } = useBillsContext();
  const { mutate: mutateCourse } = useCoursesContext();
  const [isLoading, setLoading] = useState(false);
  const [isShow, setShow] = useState(false);

  const handleDelete = useCallback(async () => {
    try {
      setLoading(true);
      await axios.post(config.API_URL + "/student/delete", {
        _id: student._id,
      });
      toast.success("Student deleted");
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    } finally {
      mutateStudent();
      mutateBills();
      mutateCourse();
      handleClose();
      setLoading(false);
    }
  }, [student._id, handleClose, mutateStudent, mutateBills, mutateCourse]);

  return (
    <>
      <div className="d-flex flex-column justify-content-center gap-3 p-4 fs-5 fw-semibold text-light">
        <div>Date : {student?.date}</div>
        <div>Name : {student?.name.toUpperCase()}</div>
        <div>Surname : {student?.surname.toUpperCase()}</div>
        <div>Phone : {student?.phone}</div>
        <div>E-mail : {student?.email}</div>
        <div>
          Courses :
          {student?.courses.length > 0 ? (
            student.courses.map((item) => {
              return (
                <div className="ps-5" key={item._id}>
                  {item.class} - {item.localDate}
                </div>
              );
            })
          ) : (
            <span>No Courses</span>
          )}
        </div>
      </div>
      <div className="d-flex flex-row justify-content-end gap-2">
        <Button
          title="Add Course"
          isLoading={isLoading}
          handleSubmit={() => setShow(true)}
          primary
        />
        <Button
          title={<AiOutlineClose size={30} />}
          isLoading={isLoading}
          handleSubmit={handleDelete}
          danger
        />
      </div>

      <AddCourse
        student={student}
        show={isShow}
        handleClose={() => {
          setShow(false);
        }}
      />
    </>
  );
};

export default StudentFeed;
