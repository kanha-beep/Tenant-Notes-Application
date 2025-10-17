import { useState } from "react";
import api from "../init/instance.js"

export default function Health() {
  const [status, setStatus] = useState("");

  const checkHealth = async () => {
    try {
      const res = await api.get("/health");
      setStatus(res.data);
    } catch (err) {
      setStatus("Error: " + err.message);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Health Check Page</h1>
      <button onClick={checkHealth}>Check API Health</button>
      <p>Backend says: {JSON.stringify(status)}</p>
    </div>
  );
}
