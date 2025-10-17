import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../init/instance.js";
// import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';

export default function MyNavbar({ isLoggedIn, setMsg , userRole}) {
  const [owner, setOwner] = useState("");
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
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar">Click to Open</span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            {isLoggedIn && (
              <>
              {userRole === "admin" && (
                <li className="nav-item">
                  <Link className="nav-link text-warning" to="/admin/dashboard">
                    Dashboard
                  </Link>
                </li>
              )}
              {userRole === "user" && (
                <li className="nav-item">
                  <Link className="nav-link text-warning" to="/notes">
                    Dashboard
                  </Link>
                </li>
              )}
                {/* <li className="nav-item">
                  <Link className="nav-link text-warning" to="/admin/dashboard">
                    Dashboard
                  </Link>
                </li> */}
                <li className="nav-item">
                  <Link className="nav-link text-warning" to="/logout">
                    Log Out
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link text-warning"
                    to={`/users/${owner?._id}`}
                  >
                    Go to Profile
                  </Link>
                </li>
              </>
            )}
          </ul>
          <ul className="navbar-nav ms-auto">
            {!isLoggedIn && (
              <>
                <li className="nav-item">
                  <Link className="nav-link text-warning" to="/auth">
                    Sign Up
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-warning" to="/auth">
                    Login
                  </Link>
                </li>
              </>
            )}
            {isLoggedIn && <></>}
          </ul>
        </div>
      </div>
    </nav>
  );
}
