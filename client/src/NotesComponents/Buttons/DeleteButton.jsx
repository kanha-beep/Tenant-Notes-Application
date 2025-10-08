import React from "react";
import api from "../../init/api.js";
export default function DeleteButton({ token, n, navigate }) {
  const handleDelete = async (userId) => {
    const userRole = localStorage.getItem("role");
    await api.delete(`/api/admin/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // getAllUsers();
    // currentAdmin();
    if (userRole === "admin") navigate("/admin/users");
    else navigate("/notes");
  };
  return (
    <div>
      <button className="p-2 rounded" onClick={() => handleDelete(n._id)}>
        Delete
      </button>
    </div>
  );
}
