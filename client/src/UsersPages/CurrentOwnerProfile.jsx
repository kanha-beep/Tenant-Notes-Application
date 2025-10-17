import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../init/instance.js";
import GoHomeButton from "../Components/Buttons/GoHomeButton.jsx";

export default function Users() {
  const { userId } = useParams();
  const [owner, setOwner] = useState({});
  // const { notesId } = useParams(); // Get note ID from URL
  const navigate = useNavigate();
  const token = localStorage.getItem("tokens");
  const [msg, setMsg] = useState(""); // Error message
  // get current owner
  console.log("id: ......", userId)
  useEffect(() => {
    const currentOwner = async () => {
    try {
      if (!token) {
        console.log("No token for Owner AllNotes");
        return;
      }
      const res = await api.get(`/users/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setOwner(res.data.user);
      console.log("ownerasd: ", res.data.user)
      setMsg(res.data.message);
    } catch (e) {
      console.log("current AllNotes: ", e.response.data);
    }
  };
    currentOwner();
  }, [token]);
  return (
    <div className="container-fluid min-vh-100 bg-dark">
      <div className="row justify-content-center">
        <div className="col-12">
          <h1 className="text-center text-white py-4">Profile</h1>
        </div>
      </div>
      {/* msg */}
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          {msg && (
            <div className="alert alert-danger" role="alert">
              {msg}
            </div>
          )}
        </div>
      </div>
      {/* owners details */}
      <div className="row justify-content-center align-items-center" style={{ minHeight: "60vh" }}>
        <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-4">
          {owner && (
            <div className="card shadow-lg" style={{ backgroundColor: "#ffeaa7" }}>
              <div className="card-body text-center">
                <h5 className="card-title mb-4">User Information</h5>
                <div className="mb-3">
                  <strong>User ID:</strong>
                  <p className="text-muted">{owner?._id}</p>
                </div>
                <div className="mb-3">
                  <strong>Username:</strong>
                  <p className="text-primary">{owner?.username}</p>
                </div>
                <div className="mb-4">
                  <strong>Tenant:</strong>
                  <p className="text-success">{owner?.tenant?.name}</p>
                </div>
                <button
                  className="btn btn-primary btn-lg w-100"
                  onClick={() => navigate(`/users/${owner?._id}/edit`)}
                >
                  Edit Profile
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="row justify-content-center mt-4">
        <div className="col-12 text-center">
          <GoHomeButton navigate={navigate}/>
        </div>
      </div>
    </div>
  );
}
