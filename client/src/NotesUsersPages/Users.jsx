import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../init/api";
import GoHomeButton from "../NotesComponents/Buttons/GoHomeButton";

export default function Users() {
  const { usersId } = useParams();
  const [owner, setOwner] = useState({});
  // const { notesId } = useParams(); // Get note ID from URL
  const navigate = useNavigate();
  const token = localStorage.getItem("tokens");
  // const [msg, setMsg] = useState(""); // Error message
  const currentOwner = async () => {
    try {
      // console.log("tokens for owner AllNotes:", token);
      if (!token) {
        console.log("No token for Owner AllNotes");
        return;
      }
      const res = await api.get(`/api/users/${usersId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log("current owner AllNotes: ", res.data);
      setOwner(res.data);
    } catch (e) {
      console.log("current AllNotes: ", e.response.data);
    }
  };
  useEffect(() => {
    currentOwner();
  }, [token]);
  return (
    <div className="container-fluid">
      {/* <div className="row justify-content-center"> */}
        <h1 className="text-center">Profile</h1>
        {/* {msg && (
        <div className="alert alert-danger" role="alert">
          {msg}
        </div>
      )} */}
        <div
          className="row mx-auto justify-content-center align-items-center p-2 col-10 col-md-8 col-lg-6 bg-dark"
          style={{
            height: "100vh",
          }}
        >
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
      {/* </div> */}
    </div>
  );
}
