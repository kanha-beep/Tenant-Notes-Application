import React from "react";
import { Link } from "react-router-dom";

export default function Left() {
  return (
    <div className="card shadow-lg h-100" style={{background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(10px)'}}>
      <div className="card-body p-4">
        {/* Profile Section */}
        <div className="text-center mb-4">
          <div className="bg-primary rounded-circle d-inline-flex align-items-center justify-content-center" style={{width: '80px', height: '80px'}}>
            <span className="text-white" style={{fontSize: '2rem'}}>👨‍💼</span>
          </div>
          <h5 className="mt-3 mb-1 fw-bold text-dark">Admin Panel</h5>
          <p className="text-muted small">System Administrator</p>
        </div>
        
        {/* Navigation Menu */}
        <nav className="nav flex-column gap-2">
          <Link className="nav-link d-flex align-items-center gap-3 px-3 py-2 rounded-3 text-decoration-none text-dark" to="/admin/dashboard" style={{transition: 'all 0.2s ease'}}>
            <span>🏠</span>
            <span className="fw-medium">Dashboard</span>
          </Link>
          <Link className="nav-link d-flex align-items-center gap-3 px-3 py-2 rounded-3 text-decoration-none text-dark" to="/admin/users" style={{transition: 'all 0.2s ease'}}>
            <span>👥</span>
            <span className="fw-medium">Users</span>
          </Link>
          <Link className="nav-link d-flex align-items-center gap-3 px-3 py-2 rounded-3 text-decoration-none text-dark" to="/notes" style={{transition: 'all 0.2s ease'}}>
            <span>📝</span>
            <span className="fw-medium">Notes</span>
          </Link>
          <Link className="nav-link d-flex align-items-center gap-3 px-3 py-2 rounded-3 text-decoration-none text-dark" to="/admin/plan" style={{transition: 'all 0.2s ease'}}>
            <span>📈</span>
            <span className="fw-medium">Analytics</span>
          </Link>
          <Link className="nav-link d-flex align-items-center gap-3 px-3 py-2 rounded-3 text-decoration-none text-dark" to="/health" style={{transition: 'all 0.2s ease'}}>
            <span>⚙️</span>
            <span className="fw-medium">Settings</span>
          </Link>
        </nav>
      </div>
    </div>
  );
}
