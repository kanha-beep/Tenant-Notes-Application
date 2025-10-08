import React from "react";

export default function NewButton({ navigate, userRole }) {
  console.log("role:", userRole)
  return (
    <div>
      <div>
        <button
          className="btn btn-primary rounded-5 mt-2 mb-2"
          onClick={() => {
            if (userRole === "admin") navigate(`/admin/users/new`);
            else navigate("/notes/new");
          }}
        >
          {userRole === "admin" ? "New User by admin" : "New Note"}
        </button>
      </div>
    </div>
  );
}
