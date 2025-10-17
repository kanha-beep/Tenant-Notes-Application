import React from "react";
import { useNavigate } from "react-router-dom";

export default function ViewButton({ n }) {
  const navigate = useNavigate();
  const userRole = localStorage.getItem("role");
  const toShowAdmin = localStorage.getItem("toShowAdmin");
  const buttonClass = "btn btn-secondary d-flex align-items-center gap-2 px-3 py-2 fw-medium rounded-2 shadow-sm m-1";

  return (
    <div>
       {/* user */}
      {userRole === "user" && (
        <button
          onClick={() => {
            navigate(`/notes/${n?._id}`);
          }}
          className={buttonClass}
        >
          <span>👁️</span>
          <span>View Note</span>
        </button>
      )}
      {/* admin + notes */}
      {userRole === "admin" && toShowAdmin === "notes" && (
        <button
          onClick={() => {
            navigate(`/notes/${n?._id}`);
          }}
          className={buttonClass}
        >
          <span>👁️</span>
          <span>View Note</span>
        </button>
      )}
      {/* admin + users */}
      {userRole === "admin" && toShowAdmin === "users" && (
        <button
          onClick={() => {
            navigate(`/admin/users/${n?._id}`);
          }}
          className={buttonClass}
        >
          <span>👤</span>
          <span>View User</span>
        </button>
      )}
    </div>
  );
}
