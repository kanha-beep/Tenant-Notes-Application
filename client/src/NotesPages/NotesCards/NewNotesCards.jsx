import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../init/instance.js";
import PlanButton from "../../Components/Buttons/PlanButton.jsx";
import CreateButton from "../../Components/Buttons/CreateButton.jsx";
import HomePageButton from "../../Components/Buttons/HomePageButton.jsx";

export default function NewNotesCards() {
  const userRole = localStorage.getItem("role");
  console.log("role we got: 11 ", userRole);
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("tokens");
  const [data, setData] = useState({ title: "", content: "", email:"", username:"" });
  const handleChange = (e) => {
    setData((p) => ({ ...p, [e.target.name]: e.target.value }));
  };
  const handleCreateNote = async (e) => {
    try {
      e.preventDefault();
      console.log("data ready", data); //
      const res = await api.post("/notes/new", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("NewNotes: ", res.data);
      navigate("/notes");
    } catch (e) {
      console.log("error NewNotes F:", typeof e.response.data);
      setMsg(e.response.data);
    }
  };
  return (
    <div className="container">
      <h1 className="text-center"> Add Notes Here by Admin </h1>
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
        <form onSubmit={handleCreateNote} className="col-12 col-lg-6 col-md-8">
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
