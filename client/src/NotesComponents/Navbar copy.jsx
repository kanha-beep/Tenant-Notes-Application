import React from "react";
import { Link } from "react-router-dom";

export default function Navbar({ isLoggedIn}) {
  return (
    <div className="container">
      <div className="p-1 rounded d-flex navbar navbar-expand-lg navbar-light bg-light col-12 col-md-6" style={{ backgroundColor: "black" }}>
        {/* <div className=""> */}
          <ul
            className="list-unstyled d-flex justify-content-start navbar-nav ms-auto"
            style={{ backgroundColor: "white", width: "50%" }}
          >
            {isLoggedIn && (
              <>
                <li className="ms- nav-item">
                  <Link
                    to="/admin/dashboard"
                    className="text-decoration-none nav-link"
                    style={{ color: "orange" }}
                  >
                    Dashboard
                  </Link>
                </li>
              </>
            )}
          </ul>
          {/* //onChange */}
          <ul
            className="list-unstyled d-flex justify-content-end ms-0.2"
            style={{ backgroundColor: "white", width: "50%" }}
          >
            {!isLoggedIn && (
              <>
                <li className="ms-3">
                  <Link
                    to={`/auth`}
                    className="text-decoration-none"
                    style={{ color: "orange" }}
                  >
                    Sign Up
                  </Link>
                </li>
                <li className="ms-3">
                  <Link
                    to={`/auth`}
                    className="text-decoration-none"
                    style={{ color: "orange" }}
                  >
                    Login
                  </Link>
                </li>
              </>
            )}
            {isLoggedIn && (
              <li className="ms-3">
                <Link
                  to="/logout"
                  className="text-decoration-none"
                  style={{ color: "orange" }}
                >
                  Log Out
                </Link>
              </li>
            )}
          </ul>
        {/* </div> */}
      </div>
    </div>
  );
}
