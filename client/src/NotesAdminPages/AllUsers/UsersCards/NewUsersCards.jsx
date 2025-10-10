import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../init/api.js";
import PlanButton from "../../../NotesComponents/Buttons/PlanButton.jsx";
import CreateButton from "../../../NotesComponents/Buttons/CreateButton.jsx";
import HomePageButton from "../../../NotesComponents/Buttons/HomePageButton.jsx";

export default function NewUsersCards() {
  const userRole = localStorage.getItem("role");
  console.log("role we got: 11 ", userRole);
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("tokens");
  const [data, setData] = useState({ title: "", content: "", email:"", username:"" });
  const handleChange = (e) => {
    setData((p) => ({ ...p, [e.target.name]: e.target.value }));
  };
  const handleCreateUser = async (e) => {
    try {
      e.preventDefault();
      console.log("data ready", data); //
      const res = await api.post("/api/admin/users/new", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("NewNotes: ", res.data);
      navigate("/admin/users");
    } catch (e) {
      console.log("error NewNotes F:", typeof e.response.data);
      setMsg(e.response.data);
    }
  };
  return (
    <div className="container">
      <h1 className="text-center"> Add Users Here by Admin </h1>
      <div className="row">
        {msg !== "" && (
          <div
            className="alert alert-danger col-12 col-lg-6 col-sm-8"
            role="alert"
          >
            {msg} &nbsp;&nbsp;&nbsp;
            <PlanButton />
          </div>
        )}
      </div>
      <div className="row justify-content-center">
        <form onSubmit={handleCreateUser} className="col-12 col-lg-6 col-md-8">
          <input
            type="text"
            onChange={handleChange}
            placeholder="Username of User"
            name="username"
            value={data.username}
            className="form-control my-3"
          />
          <input
            type="text"
            onChange={handleChange}
            placeholder="Email of User"
            name="email"
            value={data.email}
            className="form-control my-3"
          />
          <input
            type="text"
            onChange={handleChange}
            placeholder="Title of User"
            name="title"
            value={data.title}
            className="form-control my-3"
          />
          <input
            type="text"
            onChange={handleChange}
            placeholder="Content of User"
            name="content"
            value={data.content}
            className="form-control my-3"
          />
          <CreateButton />
        </form>
      </div>
      <HomePageButton />
    </div>
  );
}
