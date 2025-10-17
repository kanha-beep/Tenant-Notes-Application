import React from "react";

export default function UpdateButton() {
  return (
    <button 
      type="submit" 
      className="btn btn-warning d-flex align-items-center gap-2 px-3 py-2 fw-semibold rounded-3 shadow"
    >
      <span className="text-lg">🔄</span>
      <span>Update</span>
    </button>
  );
}
