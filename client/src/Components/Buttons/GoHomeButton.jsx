import React from "react";

export default function GoHomeButton({ navigate }) {
  const userRole = localStorage.getItem("role");
  const toShowAdmin = localStorage.getItem("toShowAdmin");
  console.log("details: ", userRole, toShowAdmin);
  return (
    <div>
      {userRole === "users" && (
        <button
          className="p-2 btn btn-outline-primary my-2"
          onClick={() => navigate("/notes", { state: "notes" })}
        >
          User can go Home
        </button>
      )}
      {userRole === "admin" && toShowAdmin === "users" && (
        <button
          className="p-2 btn btn-outline-primary my-2"
          onClick={() => navigate("/admin/users", { state: "users" })}
        >
          Admin can go Home
        </button>
      )}
      {userRole === "admin" && toShowAdmin === "notes" && (
        <button
          className="p-2 btn btn-outline-primary my-2"
          onClick={() => navigate("/admin/users", { state: "users" })}
        >
          Admin can go Home
        </button>
      )}
    </div>
  );
}
