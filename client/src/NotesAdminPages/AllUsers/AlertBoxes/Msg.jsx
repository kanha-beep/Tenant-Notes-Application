import React from "react";

export default function Msg({msg}) {
  return (
    <div>
      {msg !== "" && (
        <h4 className="alert alert-danger" role="alert">
          {msg}
        </h4>
      )}
    </div>
  );
}
