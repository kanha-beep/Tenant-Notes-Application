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
    <div className="container-fluid">
        <h1 className="text-center">Profile</h1>
        {/* msg */}
        {msg && (
        <div className="alert alert-danger" role="alert">
          {msg}
        </div>
      )}
        <div
          className="row mx-auto justify-content-center align-items-center p-2 col-10 col-md-8 col-lg-6 bg-dark"
          style={{
            height: "100vh",
          }}
        >
          {/* owners details */}
          {owner && (
            <div
              key={owner._id}
              style={{ backgroundColor: "yellow" }}
              className="p-3 ms-1 me-1 rounded-5 col-12 col-lg-6 col-sm-8"
            >
              <p>
                Current OwnerId: <b>{owner?._id}</b> <br />
                Current Owner Name: <b>{owner?.username}</b> <br />
                Current Tenant Name: <b>{owner?.tenant?.name}</b>
              </p>
              <button
                className="p-2 rounded-4"
                onClick={() => navigate(`/users/${owner?._id}/edit`)}
              >
                Edit Profile
              </button>
            </div>
          )}
        </div>
        <GoHomeButton navigate={navigate}/>
    </div>
  );
}
