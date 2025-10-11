import React from "react";

export default function BackToProfileButton({navigate, usersId}) {
  return (
    <div>
      <button
        className="btn btn-outline-secondary m-2"
        onClick={() => navigate(`/users/${usersId}`)}
        style={{ position: "absolute", bottom: "1rem" }}
      >
        Back to Profile
      </button>
    </div>
  );
}
