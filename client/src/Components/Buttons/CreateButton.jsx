import React from "react";

export default function CreateButton() {
  return (
    <button 
      type="submit" 
      className="btn btn-success d-flex align-items-center gap-2 px-3 py-2 fw-semibold rounded-3 shadow mb-3"
    >
      <span className="text-lg">👤</span>
      <span>Create User</span>
    </button>
  );
}
