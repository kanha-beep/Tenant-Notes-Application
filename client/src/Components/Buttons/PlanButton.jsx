import React from "react";
import { useNavigate } from "react-router-dom";

export default function PlanButton() {
  const navigate = useNavigate();
  return (
    <div>
      {" "}
      <button
        className="btn btn-success"
        onClick={() => navigate("/admin/plan")}
      >
        Plan Buy
      </button>
    </div>
  );
}
