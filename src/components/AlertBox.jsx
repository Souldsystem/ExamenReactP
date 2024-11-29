import React from "react";

const AlertBox = ({ type, mensaje }) => {
  return (
    <div className={`alert alert-${type} d-flex justify-content-between`} role="alert">
      <span>{mensaje}</span>
      <button
        type="button"
        className="btn-close"
        aria-label="Close"
        onClick={(e) => e.target.closest(".alert").remove()}
      />
    </div>
  );
};

export default AlertBox;
