import React from "react";
import { useNavigate } from "react-router-dom";

export default function ViewButton({ n }) {
  const navigate = useNavigate();
  const userRole = localStorage.getItem("role");
  const toShowAdmin = localStorage.getItem("toShowAdmin");
  console.log("admin will get to see what...from dashboard..", toShowAdmin);
  return (
    <div>
      {userRole === "users" && (
        <button
          onClick={() => {
            navigate(`/notes/${n?._id}`);
          }}
          className="m-1 btn btn-secondary rounded-4"
        >
          View Note by User{" "}
        </button>
      )}
      {userRole === "admin" && toShowAdmin === "users" ? (
        <button
          onClick={() => {
            navigate(`/admin/users/${n?._id}`);
          }}
          className="m-1 btn btn-secondary rounded-4"
        >
          View User by Admin{" "}
        </button>
      ) : (
        <button
          onClick={() => {
            navigate(`/notes/${n?._id}`);
            console.log(`874 & ${n?._id}`)
          }}
          className="m-1 btn btn-secondary rounded-4"
        >
          View Note By Admin{" "}
        </button>
      )}
    </div>
  );
}
