import React from "react";

export default function HomePageButton({ navigate }) {
  const userRole = localStorage.getItem("role");
  return (
    <div>
      <button
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
