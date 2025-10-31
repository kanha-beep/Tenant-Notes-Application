import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../init/instance.js";
import HomePageButton from "../Components/Buttons/HomePageButton.jsx";

export default function NewNotes() {
  const userRole = localStorage.getItem("role");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("tokens");
  const [data, setData] = useState({ title: "", content: "", user: "" });
  const handleChange = (e) => {
    setData((p) => ({ ...p, [e.target.name]: e.target.value }));
  };
  //new note
  const handleCreateNote = async (e) => {
    try {
      e.preventDefault();
      console.log("data ready", data); //
      const res = await api.post("/notes/new", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("NewNotes: ........", res.data);
      navigate("/notes");
    } catch (e) {
      console.log("error NewNotes F:", e.response?.data);
      setMsg(e.response?.data?.message || "Failed to create note");
    }
  };
  return (
    <div className="container-fluid">
      <div className="row justify-content-center">
        <div className="col-12">
          <h1 className="text-center py-4">Add Note Here By User</h1>
        </div>
      </div>
      {/* msg */}
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          {msg !== "" && (
            <div className="alert alert-danger" role="alert">
              {msg}
              <button
                className="btn btn-sm btn-warning ms-3"
                onClick={() => navigate("/admin/plan")}
              >
                Plan Buy
              </button>
            </div>
          )}
        </div>
      </div>
      {/* new note form */}
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <form onSubmit={handleCreateNote} className="card p-4 shadow">
            <div className="mb-3">
              <input
                type="text"
                onChange={handleChange}
                placeholder="Title of Note"
                name="title"
                value={data.title}
                className="form-control"
                required
              />
            </div>
            <div className="mb-3">
              <textarea
                onChange={handleChange}
                placeholder="Content of Note"
                name="content"
                value={data.content}
                className="form-control"
                rows="4"
                required
              />
            </div>
            <div className="mb-3">
              <input
                onChange={handleChange}
                placeholder="User of Note"
                name="user"
                value={data.user}
                className="form-control"
                rows="4"
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100 mb-3">
              Create Note
            </button>
          </form>
        </div>
      </div>
      {/* home page button */}
      <div className="row justify-content-center mt-4">
        <div className="col-12 text-center">
          <HomePageButton userRole={userRole} />
        </div>
      </div>
    </div>
  );
}
