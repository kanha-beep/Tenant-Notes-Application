import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function EditButton({ userId, notesId }) {
  const location = useLocation();
  const navigate = useNavigate();
  const userRole = localStorage.getItem("role");
  // const toShowAdmin = localStorage.getItem("toShowAdmin");
  const toShowAdmin =
    location.state || localStorage.getItem("toShowAdmin") || "notes"; // ✅ fallback fixed
  // console.log("id for edit: ", notesId);
  return (
    <div>
      {userRole === "user" && (
        <button
          className="p-2 btn btn-outline-primary my-2"
          onClick={() => navigate(`/notes/${notesId}`, { state: "notes" })}
        >
          Edit Note
        </button>
      )}
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
      {userRole === "admin" && toShowAdmin === "notes" && (
        <button
          className="p-2 btn btn-outline-primary my-2"
          onClick={() => {
            console.log("Edit clicked id:", userId);
            navigate(`/notes/${notesId}`, { state: "notes" });
          }}
        >
          Edit Note
        </button>
      )}
      {/* <button
        type="submit"
        className="btn btn-outline-primary"
        onClick={() => {
          if (userRole === "admin") navigate(`/admin/users/${userId}/edit`);
          else navigate(`/notes/${userId}`);
        }}
      >
        Edit Page
      </button>{" "} */}
    </div>
  );
}
