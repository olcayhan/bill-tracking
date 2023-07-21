import React from "react";

const Card = ({ title, length, color, callback, icon }) => {
  return (
    <div
      className="d-flex flex-row justify-content-between align-items-center p-4 rounded-2 shadow"
      style={{ width: "350px", height: "150px", background: `${color}` }}
    >
      <div className="flex flex-column justify-content-center align-items-center text-light">
        <h3 className="fs-3 fw-bold">{title}</h3>
        <p className="fs-4 fw-semibold">{length}</p>
      </div>
      <button
        className="border-0 rounded-1 p-3 bg-transparent"
        onClick={callback}
      >
        {icon}
      </button>
    </div>
  );
};

export default Card;
