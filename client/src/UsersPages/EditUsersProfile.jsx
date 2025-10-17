import React, { useEffect, useState } from "react";
import api from "../init/instance.js";
import { useNavigate, useParams } from "react-router-dom";
import UpdateButton from "../Components/Buttons/UpdateButton.jsx";
import BackToProfileButton from "../Components/Buttons/BackToProfileButton.jsx"
export default function EditUsersProfile() {
  // const [owner, setOwner] = useState({});
  const { userId } = useParams(); // Get note ID from URL
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
        const res = await api.get(`/users/${userId}`, {
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
      const res = await api.patch(`/users/${userId}/edit`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("Edited User: ", res.data);
      navigate(`/users/${userId}`); // Redirect to notes page
    } catch (e) {
      setMsg(e.response?.data || "Error updating note");
      if (e.response.status === 404) return setMsg(e.response.data.message);
    }
  };
  return (
    <div className="container">
      <h1 className="text-center">Edit Profile</h1>
      <div className="row">
        {msg && (
          <div
            className="alert alert-danger col-12 col-lg-6 col-md-8"
            role="alert"
          >
            {msg}
          </div>
        )}
      </div>
      <div className="row mx-auto">
        <form
          onSubmit={handleEditUser}
          className="col-12 col-lg-6 col-sm-8 mx-auto"
        >
          <input
            type="text"
            name="username"
            placeholder="username of User"
            value={data.username}
            onChange={handleChange}
            className="my-2 p-1 form-control"
          />
          <input
            type="text"
            name="password"
            placeholder="password"
            value={data.password}
            onChange={handleChange}
            className="my-2 p-1 form-control"
          />
          <UpdateButton />
        </form>
      </div>
      <BackToProfileButton navigate={navigate} usersId={userId} />
    </div>
  );
}
