import React from "react";
import api from "../../init/instance.js";
export default function DeleteButton({
  token,
  n,
  navigate,
  userRole,
  toShowAdmin,
}) {
  // console.log("noteId:", n?._id, toShowAdmin);
  const handleDelete = async (id) => {
    // admin + users
    if (userRole === "admin" && toShowAdmin === "users") {
      await api.delete(`/admin/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      navigate("/admin/users");
    }
    // admin + notes
    if (userRole === "admin" && toShowAdmin === "notes") {
      await api.delete(`/notes/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      navigate("/notes");
    }
    //notes
    if (userRole === "user") {
      await api.delete(`/notes/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      navigate("/notes");
    }
  };
  return (
    <button
      className="btn btn-danger d-flex align-items-center gap-2 px-3 py-2 fw-medium rounded-2 shadow-sm"
      onClick={() => handleDelete(n?._id)}
    >
      <span>🗑️</span>
      <span>Delete</span>
    </button>
  );
}
