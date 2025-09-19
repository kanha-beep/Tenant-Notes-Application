import React from "react";
import { Link } from "react-router-dom";

export default function Navbar({ isLoggedIn}) {
  return (
    <div>
      <div className="p-1 rounded " style={{ backgroundColor: "yellow" }}>
        <div className="d-flex">
          <ul
            className="list-unstyled d-flex justify-content-start"
            style={{ backgroundColor: "white", width: "50%" }}
          >
            {isLoggedIn && (
              <>
                <li className="ms-1">
                  <Link
                    to="/admin/dashboard"
                    className="text-decoration-none"
                    style={{ color: "orange" }}
                  >
                    Dashboard/Home
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
        </div>
      </div>
    </div>
  );
}
