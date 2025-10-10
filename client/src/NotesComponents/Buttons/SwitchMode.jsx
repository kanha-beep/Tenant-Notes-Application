import React from "react";

export default function SwitchMode({ mode, setMode }) {
  return (
    <div>
      <button onClick={() => setMode((p) => !p)}>
        {mode ? "Light Mode" : "Dark Mode"}
      </button>
    </div>
  );
}
