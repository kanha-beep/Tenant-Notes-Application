import React from "react";
import { useNavigate } from "react-router-dom";

export default function EditButton({ userId, noteId }) {
  // const location = useLocation();
  const navigate = useNavigate();
  const userRole = localStorage.getItem("role");
  // const toShowAdmin = localStorage.getItem("toShowAdmin");
  const toShowAdmin = localStorage.getItem("toShowAdmin");
  console.log("id for edit: ", userId); // currently notes thats good
  const buttonClass = "btn btn-primary d-flex align-items-center gap-2 px-3 py-2 fw-medium rounded-2 shadow-sm my-2";

  return (
    <div>
      {/* user = edit note*/}
      {userRole === "user" && (
        <button
          className={buttonClass}
          onClick={() => navigate(`/notes/${noteId}/edit`, { state: "notes" })}
        >
          <span>✏️</span>
          <span>Edit Note</span>
        </button>
      )}
      {/* admin and user = edit user */}
      {userRole === "admin" && toShowAdmin === "users" && (
        <button
          className={buttonClass}
          onClick={() => {
            console.log("Edit clicked id:", userId);
            navigate(`/admin/users/${userId}/edit`, { state: "users" });
          }}
        >
          <span>👤</span>
          <span>Edit User</span>
        </button>
      )}
      {/* admin and notes = edit note */}
      {userRole === "admin" && toShowAdmin === "notes" && (
        <button
          className={buttonClass}
          onClick={() => {
            console.log("Edit clicked id:", userId);
            navigate(`/notes/${noteId}/edit`, { state: "notes" });
          }}
        >
          <span>✏️</span>
          <span>Edit Note</span>
        </button>
      )}
    </div>
  );
}
