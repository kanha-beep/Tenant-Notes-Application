import React from "react";

export default function NewButton({ navigate, userRole, toShowAdmin }) {
  const getButtonText = () => {
    if (userRole === "admin" && toShowAdmin === "users") return "Add User";
    if (userRole === "admin" && toShowAdmin === "notes") return "Add Note";
    // if (userRole === "user") return "Add New Note";
    // return "Add New Item";
  };

  const getIcon = () => {
    if (userRole === "admin" && toShowAdmin === "users") return "👤";
    if (userRole === "admin" && toShowAdmin === "notes") return "📝";
    return "➕";
  };
  console.log("role: ", userRole);
  return (
    <div className="col-12 col-md-6 col-lg-4 order-lg-3 mb-3">
      {userRole !== "user" && (
        <button
          className="btn btn-primary d-flex align-items-center gap-2 px-3 py-2 fw-semibold rounded-3 shadow w-100"
          onClick={() => {
            if (userRole === "admin") {
              if (toShowAdmin === "users") navigate(`/admin/users/new`);
              if (toShowAdmin === "notes") navigate(`/notes/new`);
            } else navigate("/notes/new");
          }}
        >
          <span className="fs-5">{getIcon()}</span>
          <span>{getButtonText()}</span>
        </button>
      )}
    </div>
  );
}
