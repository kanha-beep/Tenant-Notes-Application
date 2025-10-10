import React from "react";
import { useNavigate } from "react-router-dom";

export default function HomePageButton() {
  const navigate = useNavigate();
  const userRole = localStorage.getItem("role");
  return (
    <div>
      <button
        className="btn btn-outline-primary"
        onClick={() => {
          if (userRole === "admin") navigate(`/admin/users`);
          else navigate(`/notes`);
        }}
      >
        Home Page
      </button>
    </div>
  );
}
