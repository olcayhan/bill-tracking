import React from "react";
import { Spinner } from "react-bootstrap";

const Button = ({ isLoading, handleSubmit, title, loadingTitle, danger }) => {
  return (
    <button
      disabled={isLoading}
      className="btn w-100 text-light p-2 rounded-2"
      style={{
        backgroundColor: danger ? "#B70404" : "#526D82",
        border: "none",
      }}
      onClick={handleSubmit}
    >
      {isLoading ? (
        <div className="d-flex flex-row justify-content-center align-items-center gap-4">
          <div>{loadingTitle}</div>
          <Spinner />
        </div>
      ) : (
        <div>{title}</div>
      )}
    </button>
  );
};

export default Button;
