import React, { useState } from "react";
import Announcement from "./modals/Announcement";
import AddStudent from "./modals/AddStudent";
import { useAnnounceContext } from "../../contexts/AnnounceContext";
import { useBillsContext } from "../../contexts/BillContext";
import { useStudentsContext } from "../../contexts/StudentContext";

export default function TopMenu() {
  const [isAddStudent, setIsAddStudent] = useState();
  const [isAnnounce, setIsAnnounce] = useState();

  const { announces } = useAnnounceContext();
  const { bills } = useBillsContext();
  const { students } = useStudentsContext();

  return (
    <div className="row d-flex justify-content-center align-items-center">
      <div className="col-xl-4 col-md-6 ">
        <div className="card border-left border-left-5 border-left-primary  shadow  px-5 py-4">
          <div className="card-body">
            <div className="row no-gutters align-items-center">
              <div className="col mr-2">
                <div className=" font-weight-bold text-primary text-uppercase mb-1">
                  Students
                </div>
                <div className="fs-2 mb-0 font-weight-bold text-gray-800">
                  {students?.length}
                </div>
              </div>
              <div className="col-lg-3 col-sm-3">
                <div
                  className="btn btn-primary rounded-4"
                  onClick={(e) => {
                    setIsAddStudent(true);
                  }}
                >
                  <i className="fas fa-user-plus fa-3x text-white-300"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="col-xl-4 col-md-6 ">
        <div className="card border-left border-left-5 border-left-success  shadow  px-5 py-4">
          <div className="card-body">
            <div className="row no-gutters align-items-center">
              <div className="col mr-2">
                <div className=" font-weight-bold text-success text-uppercase mb-1">
                  Bills
                </div>
                <div className="fs-2 mb-0 font-weight-bold text-gray-800">
                  {bills?.length}
                </div>
              </div>
              <div className="col-auto">
                <i className="fas fa-duotone fa-receipt fa-3x text-success"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="col-xl-4 col-md-6 ">
        <div className="card border-left border-left-5 border-left-warning  shadow  px-5 py-4">
          <div className="card-body">
            <div className="row no-gutters align-items-center">
              <div className="col mr-2">
                <div className=" font-weight-bold text-warning text-uppercase mb-1">
                  Announces
                </div>
                <div className="fs-2 mb-0 font-weight-bold text-gray-800">
                  {announces?.length}
                </div>
              </div>
              <div className="col-auto">
                <div
                  className="btn btn-warning rounded-4"
                  onClick={(e) => {
                    setIsAnnounce(true);
                  }}
                >
                  <i className="fas fa-bullhorn fa-3x text-light"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

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
