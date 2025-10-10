import React from "react";

export default function Checkbox({ check, setCheck, toShowAdmin }) {
  const userRole = localStorage.getItem("role");
  return (
    <div>
      {userRole === "users" && (
        <input
          type="checkbox"
          checked={check}
          onChange={(e) => {
            setCheck(e.target.checked);
          }}
        />
      )}
      {userRole === "admin" && toShowAdmin === "notes" && (
        <input
          type="checkbox"
          checked={check}
          onChange={(e) => {
            setCheck(e.target.checked);
          }}
        />
      )}
    </div>
  );
}
