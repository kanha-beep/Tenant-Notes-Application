import React, { useState } from "react";
import AllNotesButton from "../../Components/Buttons/AllNotesButton.jsx";
import AllUsersButton from "../../Components/Buttons/AllUsersButton.jsx";
import PlanButton from "../../Components/Buttons/PlanButton.jsx";
import HealthButton from "../../Components/Buttons/HealthButton.jsx";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import api from "../../init/instance.js";

export default function Right({ details }) {
  const [value, setValue] = useState(new Date());
  const downloadUsers = async () => {
    try {
      const res = await api.get("/admin/users/reports");
      let csvContent = "data:text/csv;charset=utf-8,";
      // csvContent += "Username,Email,Password,CreatedAt\n";
      const row = res?.data?.split("\n");
      row.forEach((r) => {
        csvContent += r + "\n";
      });
      const encodeUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodeUri);
      link.setAttribute("download", "Users_Report.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (e) {
      console.log("error download: ", e?.response?.data?.message);
      alert(e?.response?.data?.message);
    }
  };
  const downloadNotes = async () => {
    try {
      const res = await api.get("/notes/reports");
      console.log("download notes: ", res?.data);
      const csvContent = "data:text/csv;charset=utf-8," + res?.data;
      const encodeUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodeUri);
      link.setAttribute("download", "Notes_Report.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (e) {
      alert(e?.response?.data?.message);
    }
  };
  return (
    <div className="h-100">
      {/* Header */}
      <div className="mb-4">
        <h1 className="text-white fw-bold mb-2">📈 Admin Dashboard</h1>
        <p className="text-white-50">
          Welcome back! Here's what's happening with your tenant management
          system.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="row g-4 mb-4">
        <div className="col-md-6">
          <div
            className="card shadow-lg border-0"
            style={{
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            }}
          >
            <div className="card-body text-white p-4">
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <h6 className="text-white-50 mb-2">Total Notes</h6>
                  <h2 className="fw-bold mb-0">{details?.totalNotes ?? 0}</h2>
                </div>
                <div className="bg-white bg-opacity-20 rounded-circle p-3">
                  <span style={{ fontSize: "2rem" }}>📝</span>
                </div>
              </div>
              <div className="mt-3">
                <AllNotesButton />
                {/* <button
                  onClick={() => window.open("/admin/users/reports", "_blank")}
                >
                  Download User Report
                </button> */}
                <button onClick={downloadNotes}>Download Notes</button>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div
            className="card shadow-lg border-0"
            style={{
              background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
            }}
          >
            <div className="card-body text-white p-4">
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <h6 className="text-white-50 mb-2">Total Users</h6>
                  <h2 className="fw-bold mb-0">{details?.totalUsers ?? 0}</h2>
                </div>
                <div className="bg-white bg-opacity-20 rounded-circle p-3">
                  <span style={{ fontSize: "2rem" }}>👥</span>
                </div>
              </div>
              <div className="mt-3">
                <AllUsersButton />
                <button onClick={downloadUsers}>Download All Users</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="row g-4">
        {/* Calendar */}
        <div className="col-lg-6">
          <div
            className="card shadow-lg border-0"
            style={{
              background: "rgba(255,255,255,0.95)",
              backdropFilter: "blur(10px)",
            }}
          >
            <div className="card-body p-4">
              <h5 className="fw-bold mb-3 text-dark">📅 Calendar</h5>
              <Calendar onChange={setValue} value={value} className="w-100" />

              <div className="d-flex gap-2 mt-4">
                <PlanButton />
                <HealthButton />
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="col-lg-6">
          <div
            className="card shadow-lg border-0"
            style={{
              background: "rgba(255,255,255,0.95)",
              backdropFilter: "blur(10px)",
            }}
          >
            <div className="card-body p-4">
              <h5 className="fw-bold mb-4 text-dark">🎯 Quick Actions</h5>
              <div className="d-grid gap-3">
                <div className="p-3 bg-light rounded-3 d-flex align-items-center justify-content-between">
                  <div>
                    <h6 className="mb-1 fw-semibold">System Health</h6>
                    <small className="text-muted">
                      All systems operational
                    </small>
                  </div>
                  <span className="badge bg-success">✓ Online</span>
                </div>
                <div className="p-3 bg-light rounded-3 d-flex align-items-center justify-content-between">
                  <div>
                    <h6 className="mb-1 fw-semibold">Active Sessions</h6>
                    <small className="text-muted">Users currently online</small>
                  </div>
                  <span className="badge bg-primary">
                    {details?.totalUsers ?? 0}
                  </span>
                </div>
                <div className="p-3 bg-light rounded-3 d-flex align-items-center justify-content-between">
                  <div>
                    <h6 className="mb-1 fw-semibold">Recent Activity</h6>
                    <small className="text-muted">Latest user actions</small>
                  </div>
                  <span className="badge bg-info">
                    {details?.totalNotes ?? 0}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
