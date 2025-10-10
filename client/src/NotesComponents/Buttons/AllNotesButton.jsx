import React from "react";
import { useNavigate } from "react-router-dom";

export default function AllNotesButton() {
    const navigate = useNavigate();
  return (
    <div>
      <button onClick={()=>navigate("/notes", { state: "notes" })}>All Notes</button>
    </div>
  );
}
