import React from "react";
import { ClipLoader } from "react-spinners";
export default function Spinner() {
  return (
    <div className="row d-flex justify-content-center align-items-center w-100 h-100">
      <ClipLoader color="#36d7b7" size={64} />
    </div>
  );
}
