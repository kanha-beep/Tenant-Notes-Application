import React from "react";
import { useNavigate } from "react-router-dom";

export default function AllUsersButton() {
  const navigate = useNavigate();
  return (
    <div>
      <button onClick={() => navigate("/admin/users", { state: "users" })}>All Users</button>
    </div>
  );
}
