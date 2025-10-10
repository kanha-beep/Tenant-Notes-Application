import React from "react";
import { Link } from "react-router-dom";
export default function Left({className}) {
  return (
    <div className={className} style={{ backgroundColor: "orange" }}>
      <div
        className="picture"
        style={{ backgroundColor: "yellow", height: "5rem" }}
      >
        <img alt="coming" />
      </div>
      <div
        className="detail d-flex flex-column mt-1"
        style={{ backgroundColor: "yellow" }}
      >
        <p>Name</p>
        <p>Email</p>
      </div>
      <div className="mt-1" style={{ backgroundColor: "yellow" }}>
        <ul className="navbar-nav me-auto ms-2">
          <li>
            <Link className="nav-link text-decoration-none">Home</Link>
          </li>
          <li>
            <Link className="nav-link text-decoration-none">File</Link>
          </li>
          <li>
            <Link className="nav-link text-decoration-none">Messages</Link>
          </li>
          <li>
            <Link className="nav-link text-decoration-none">Notifications</Link>
          </li>
          <li>
            <Link className="nav-link text-decoration-none">Location</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
