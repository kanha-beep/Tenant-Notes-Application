import React from "react";
import { useNavigate } from "react-router-dom";

export default function ViewButton({ n, btnValue }) {
  const navigate = useNavigate();
  const userRole = localStorage.getItem("role");
  return (
    <div>
      {" "}
      <button
        onClick={() => {
          // console.log("notes id", n);
          if (userRole === "admin") navigate(`/admin/users/${n._id}`);
          else if (userRole === "user" && btnValue === "profile") {
            console.log("1. user role", userRole, "btnValue", n?._id);
            navigate(`/users/${n?._id}`);
          } else navigate(`/notes/${n?._id}`);
        }}
        className="m-1 btn btn-secondary rounded-4"
      >
        View{" "}
      </button>
    </div>
  );
}
