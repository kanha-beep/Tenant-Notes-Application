import React from "react";
import { useNavigate } from "react-router-dom";

export default function HealthButton() {
  const navigate = useNavigate();
  return (
    <div>
      <button className="btn btn-warning" onClick={() => navigate("/health")}>
        Health Check
      </button>
    </div>
  );
}
