import React from "react";

export default function EditButton({ navigate, userId }) {
  const userRole = localStorage.getItem("role");
  console.log("id for edit: ", userId)
  return (
    <div>
      <button
      type="submit"
      className="btn btn-outline-primary"
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
