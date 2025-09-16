import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../init/api"

export default function Dashboard({isLoggedIn }) {
  const navigate = useNavigate();
  const [details, setDetails] = useState(null);
  const token = localStorage.getItem("tokens");
  const getAllDetails = async () => {
    try {
      const res = await api.get("/api/admin/dashboard", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("all details Dashboard:", res.data);
      setDetails(res.data);
    } catch (e) {
      console.log("error", e.response.data);
    }
  };
  useEffect(() => {
    getAllDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      {isLoggedIn && (
        <>
          <div>Dashboard</div>
          <div>Details</div>
          {details && (
            <div>
              <div>No of Notes: {details.totalNotes}</div>
              <div>No of users: {details.totalUsers}</div>
            </div>
          )}
          <div>
            <br />
            <button
              className="rounded p-1 m-3"
              onClick={() => navigate("/admin/users")}
            >
              All Users
            </button>
            <button
              className="rounded p-1 m-3"
              onClick={() => navigate("/notes")}
            >
              All Notes
            </button>
            <button
              className="rounded p-1 m-3"
              onClick={() => navigate("/admin/plan")}
            >
              Plan Buy
            </button>
            <button
              className="rounded p-1 m-3"
              onClick={() => navigate("/health")}
            >
              Health Check
            </button>
          </div>
        </>
      )}
    </div>
  );
}
