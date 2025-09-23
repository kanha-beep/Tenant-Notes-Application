import React, { useEffect, useState } from "react";
import api from "../init/api";
import { useNavigate, useParams } from "react-router-dom";
export default function EditUsersProfile() {
  // const [owner, setOwner] = useState({});
  const { usersId } = useParams(); // Get note ID from URL
  const [msg, setMsg] = useState(""); // Error message
  const token = localStorage.getItem("tokens");
  const [data, setData] = useState({ usernameL: "", password: "" }); // Form data
  const navigate = useNavigate();
  //get user
  useEffect(() => {
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
        setData(res.data);
      } catch (e) {
        console.log("current AllNotes: ", e.response.data);
      }
    };
    currentOwner();
  }, [token]);
  const handleChange = (e) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleEditUser = async (e) => {
    e.preventDefault();
    try {
      const res = await api.patch(`/api/users/${usersId}/edit`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("Edited User: ", res.data);
      navigate(`/users/${usersId}`); // Redirect to notes page
    } catch (e) {
      setMsg(e.response?.data || "Error updating note");
      if (e.response.status === 404) return setMsg(e.response.data.message);
    }
  };
  return (
    <div>
      <h1>Edit Profile</h1>
      {msg && (
        <div className="alert alert-danger" role="alert">
          {msg}
        </div>
      )}
      <form onSubmit={handleEditUser}>
        <input
          type="text"
          name="username"
          placeholder="username of User"
          value={data.username}
          onChange={handleChange}
          className="m-2 p-1"
        />
        <input
          type="text"
          name="password"
          placeholder="password"
          value={data.password}
          onChange={handleChange}
          className="m-2 p-1"
        />
        <button className="btn btn-primary m-2">Edit</button>
      </form>
      <button
        className="btn btn-secondary m-2"
        onClick={() => navigate(`/users/${usersId}`)}
      >
        Back to Profile
      </button>
    </div>
  );
}
