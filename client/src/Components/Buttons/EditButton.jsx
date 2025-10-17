import React from "react";
import { useNavigate } from "react-router-dom";

export default function EditButton({ userId, noteId }) {
  // const location = useLocation();
  const navigate = useNavigate();
  const userRole = localStorage.getItem("role");
  // const toShowAdmin = localStorage.getItem("toShowAdmin");
  const toShowAdmin = localStorage.getItem("toShowAdmin");
  console.log("id for edit: ", userId); // currently notes thats good
  return (
    <div>
      {/* user = edit note*/}
      {userRole === "user" && (
        <button
          className="p-2 btn btn-outline-primary my-2"
          onClick={() => navigate(`/notes/${noteId}/edit`, { state: "notes" })}
        >
          Edit Note
        </button>
      )}
      {/* admin and user = edit user */}
      {userRole === "admin" && toShowAdmin === "users" && (
        <button
          className="p-2 btn btn-outline-primary my-2"
          onClick={() => {
            console.log("Edit clicked id:", userId);
            navigate(`/admin/users/${userId}/edit`, { state: "users" });
          }}
        >
          Edit User
        </button>
      )}
      {/* admin and notes = edit note */}
      {userRole === "admin" && toShowAdmin === "notes" && (
        <button
          className="p-2 btn btn-outline-primary my-2"
          onClick={() => {
            console.log("Edit clicked id:", userId);
            navigate(`/notes/${noteId}/edit`, { state: "notes" });
          }}
        >
          Edit Note
        </button>
      )}
    </div>
  );
}
