import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../init/api";

export default function Dashboard({ isLoggedIn }) {
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
    <div className="mt-4">
      {/* //main div */}
      <div
        className="main container-fluid mx-auto"
        style={{ height: "80vh", width: "80%", backgroundColor: "red" }}
      >
        {/* //need left and right to move */}
        <div className="row justify-content-between">
          {/* //left div starts - Profile */}
          <div className="m-1 col-md-2" style={{ backgroundColor: "orange" }}>
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
                  <Link className="nav-link text-decoration-none">
                    Messages
                  </Link>
                </li>
                <li>
                  <Link className="nav-link text-decoration-none">
                    Notifications
                  </Link>
                </li>
                <li>
                  <Link className="nav-link text-decoration-none">
                    Location
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          {/* ///left div ends */}
          {/* //right div starts - dashboard */}
          <div
            className="dashboard m-1 col-12 col-md-9"
            style={{ backgroundColor: "aqua" }}
          >
            {/* //1. header  */}
            <h1 className="text-center">Dashboard</h1>
            {/* //2. numbers */}
            <div className="card shadow">
              <div className="card-body">
                <h3 className="card-title">No of Notes</h3>
                <h4 className="card-text">{details?.totalNotes ?? 0}</h4>
              </div>
              <div className="card-body">
                <h3 className="card-title">No of Users</h3>
                <h4 className="card-text">{details?.totalUsers ?? 0}</h4>
              </div>
            </div>
            //3. 2 divs
            <div className="3">
              <div className="left">
                {/* //left - targets */}
                <div className="targets"></div>
                {/* //left - calendar events */}
                <div className="calendar"></div>
              </div>
              <div className="right">
                {/* //right - Avg */}
                <div className="avg"></div>
              </div>
            </div>
          </div>
          {/* right div ends */}
        </div>
        {/* //main row div of left and right ends */}
        {/* </div> */}
      </div>
      {isLoggedIn && (
        <>
          <div className="container-fluid mt-5">
            <div className="row mb-4 p-2 border border-dark rounded justify-content-center">
              {/* first child */}
              <div className="col-md-6 mb-2 col-lg-5">
                <div className="card text-center shadow">
                  <div className="card-body">
                    <h5 className="card-title shadow-lg">No of Notes</h5>
                    <p className="card-text"></p>
                  </div>
                </div>
              </div>
              {/* second child */}
              <div className="col-md-6 mb-2 col-lg-5">
                <div className="card text-center shadow">
                  <div className="card-body">
                    <h5 className="card-title shadow-lg">No of Users</h5>
                    <p className="card-text">{details?.totalUsers ?? 0}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="d-flex flex-wrap gap-3 justify-content-center">
            <button
              className="btn btn-primary"
              onClick={() => navigate("/admin/users", {state: "users"})}
            >
              All Users
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => navigate("/notes", { state: "notes" })}
            >
              All Notes
            </button>
            <button
              className="btn btn-success"
              onClick={() => navigate("/admin/plan")}
            >
              Plan Buy
            </button>
            <button
              className="btn btn-warning"
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
