import React from "react";
import { Spinner } from "react-bootstrap";

const Button = ({
  isLoading,
  handleSubmit,
  title,
  loadingTitle,
  primary,
  danger,
  full,
  color,
  disabled,
}) => {
  return (
    <button
      disabled={disabled || isLoading}
      className={`btn ${full && "w-100"} text-light border-0 p-2 rounded-2`}
      style={{
        backgroundColor: primary
          ? "#526D82"
          : danger
          ? "#B70404"
          : color && color,
      }}
      onClick={handleSubmit}
    >
      {isLoading ? (
        <div className="d-flex flex-row justify-content-center align-items-center gap-4">
          {loadingTitle && <div>{loadingTitle}</div>}
          <Spinner />
        </div>
      ) : (
        <div>{title}</div>
      )}
    </button>
  );
};

export default Button;
