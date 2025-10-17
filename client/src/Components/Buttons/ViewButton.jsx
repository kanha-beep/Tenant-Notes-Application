import React from "react";
import { useNavigate } from "react-router-dom";

export default function ViewButton({ n }) {
  const navigate = useNavigate();
  const userRole = localStorage.getItem("role");
  const toShowAdmin = localStorage.getItem("toShowAdmin");
  return (
    <div>
       {/* user */}
      {userRole === "user" && (
        <button
          onClick={() => {
            navigate(`/notes/${n?._id}`);
          }}
          className="m-1 btn btn-secondary rounded-4"
        >
          View Note by User{" "}
        </button>
      )}
      {/* admin + notes */}
      {userRole === "admin" && toShowAdmin === "notes" && (
        <button
          onClick={() => {
            navigate(`/notes/${n?._id}`);
          }}
          className="m-1 btn btn-secondary rounded-4"
        >
          View Note By Admin{" "}
        </button>
      )}
      {/* admin + users */}
      {userRole === "admin" && toShowAdmin === "users" && (
        <button
          onClick={() => {
            navigate(`/admin/users/${n?._id}`);
          }}
          className="m-1 btn btn-secondary rounded-4"
        >
          View User by Admin{" "}
        </button>
      )}
       
    </div>
  );
}
