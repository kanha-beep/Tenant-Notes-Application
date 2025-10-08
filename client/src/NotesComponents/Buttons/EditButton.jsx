import React from "react";

export default function EditButton({ navigate, userId }) {
  const userRole = localStorage.getItem("role");
  return (
    <div>
      <button
        onClick={() => {
          if (userRole === "admin") navigate(`/admin/users/${userId}/edit`);
          else navigate(`/notes/${userId}`);
        }}
      >
        Edit Page
      </button>{" "}
    </div>
  );
}
