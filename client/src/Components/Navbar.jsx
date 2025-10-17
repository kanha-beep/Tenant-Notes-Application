import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../init/instance.js";

export default function MyNavbar({ isLoggedIn, setMsg , userRole}) {
  const [owner, setOwner] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const currentOwner = async () => {
    try {
      const res = await api.get("/auth/me");
      setOwner(res.data);
    } catch (e) {
      if ([401, 402, 403].includes(e.response.status)) setMsg(e.response.data);
      console.log(e.response.data.message);
    }
  };

  useEffect(() => {
    if (isLoggedIn) currentOwner();
    // console.log("isLoggedIn value navbar: ", isLoggedIn);
  }, [isLoggedIn]);
  return (
    <nav className="navbar shadow-lg sticky-top" style={{background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(240,248,255,0.95) 100%)', backdropFilter: 'blur(10px)', zIndex: '1020'}}>
      <div className="container-fluid px-4">
        {/* Logo/Brand */}
        <Link className="navbar-brand d-flex align-items-center gap-2" to="/" style={{textDecoration: 'none'}}>
          <div className="d-flex align-items-center justify-content-center rounded-3" style={{width: '40px', height: '40px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'}}>
            <span className="text-white fw-bold">T</span>
          </div>
          <span className="fw-bold fs-4" style={{background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>TenantApp</span>
        </Link>

        {/* Mobile Toggle Button */}
        <button 
          className="navbar-toggler border-0 p-2 d-lg-none" 
          type="button" 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          style={{boxShadow: 'none'}}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navigation Menu */}
        <div className={`navbar-collapse d-lg-flex ${isMobileMenuOpen ? 'd-flex' : 'd-none d-lg-flex'}`} id="navbarNav" style={{transition: 'all 0.3s ease'}}>
          <ul className="navbar-nav me-auto align-items-lg-center gap-2 flex-lg-row">
            {isLoggedIn && (
              <>
                {userRole === "admin" && (
                  <li className="nav-item">
                    <Link 
                      className="nav-link px-3 py-2 rounded-3 fw-medium d-flex align-items-center gap-2 text-dark"
                      to="/admin/dashboard"
                      style={{transition: 'all 0.3s ease', textDecoration: 'none'}}
                      onMouseEnter={(e) => {
                        e.target.style.backgroundColor = 'rgba(13, 110, 253, 0.1)';
                        e.target.style.color = '#0d6efd';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor = 'transparent';
                        e.target.style.color = '#212529';
                      }}
                    >
                      <span>📊</span>
                      <span>Dashboard</span>
                    </Link>
                  </li>
                )}
                {userRole === "user" && (
                  <li className="nav-item">
                    <Link 
                      className="nav-link px-3 py-2 rounded-3 fw-medium d-flex align-items-center gap-2 text-dark"
                      to="/notes"
                      style={{transition: 'all 0.3s ease', textDecoration: 'none'}}
                      onMouseEnter={(e) => {
                        e.target.style.backgroundColor = 'rgba(13, 110, 253, 0.1)';
                        e.target.style.color = '#0d6efd';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor = 'transparent';
                        e.target.style.color = '#212529';
                      }}
                    >
                      <span>📊</span>
                      <span>Dashboard</span>
                    </Link>
                  </li>
                )}
                <li className="nav-item">
                  <Link 
                    className="nav-link px-3 py-2 rounded-3 fw-medium d-flex align-items-center gap-2 text-dark"
                    to={`/users/${owner?._id}`}
                    style={{transition: 'all 0.3s ease', textDecoration: 'none'}}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = 'rgba(13, 110, 253, 0.1)';
                      e.target.style.color = '#0d6efd';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = 'transparent';
                      e.target.style.color = '#212529';
                    }}
                  >
                    <span>👤</span>
                    <span>Profile</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link 
                    className="btn btn-danger d-flex align-items-center gap-2 px-3 py-2 rounded-3 fw-medium text-white"
                    to="/logout"
                    style={{transition: 'all 0.3s ease', transform: 'scale(1)', textDecoration: 'none'}}
                    onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                    onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                  >
                    <span>🚪</span>
                    <span>Logout</span>
                  </Link>
                </li>
              </>
            )}
            {!isLoggedIn && (
              <>
                <li className="nav-item">
                  <Link 
                    className="nav-link px-3 py-2 rounded-3 fw-medium d-flex align-items-center gap-2 text-dark"
                    to="/auth"
                    style={{transition: 'all 0.3s ease', textDecoration: 'none'}}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = 'rgba(13, 110, 253, 0.1)';
                      e.target.style.color = '#0d6efd';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = 'transparent';
                      e.target.style.color = '#212529';
                    }}
                  >
                    <span>📝</span>
                    <span>Sign Up</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link 
                    className="btn d-flex align-items-center gap-2 px-3 py-2 rounded-3 fw-medium text-white"
                    to="/auth"
                    style={{
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      transition: 'all 0.3s ease',
                      transform: 'scale(1)',
                      border: 'none',
                      textDecoration: 'none'
                    }}
                    onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                    onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                  >
                    <span>🔐</span>
                    <span>Login</span>
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
