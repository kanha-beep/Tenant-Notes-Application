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
    <div>
      <button
        className="p-2 rounded btn btn-outline-secondary"
        onClick={() => handleDelete(n?._id)}
      >
        Delete
      </button>
    </div>
  );
}
