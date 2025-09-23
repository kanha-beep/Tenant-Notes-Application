import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../init/api";

export default function EditNotes() {
  const { notesId } = useParams(); // Get note ID from URL
  const navigate = useNavigate();
  const token = localStorage.getItem("tokens");

  const [msg, setMsg] = useState(""); // Error message
  const [data, setData] = useState({ title: "", content: "" }); // Form data

  // Fetch existing note data when component mounts
  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await api.get(`/api/notes/${notesId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setData({ title: res.data.title, content: res.data.content });
      } catch (e) {
        setMsg(e.response?.data || "Error fetching note");
      }
    };
    fetchNote();
  }, [notesId, token]);

  const handleChange = (e) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleEditNote = async (e) => {
    e.preventDefault();
    try {
      const res = await api.put(`/api/notes/${notesId}`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("Edited Note: ", res.data);
      navigate("/notes"); // Redirect to notes page
    } catch (e) {
      setMsg(e.response?.data || "Error updating note");
    }
  };

  return (
    <div className="container">
      <h1 className="text-center">Edit Note</h1>
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
      <div className="row">
        <form onSubmit={handleEditNote} className="col-12 col-lg-8 mx-auto">
          <input
            type="text"
            name="title"
            placeholder="Name of Note"
            value={data.title}
            onChange={handleChange}
            className="form-control mb-2"
          />
          <input
            type="text"
            name="content"
            placeholder="Content of Note"
            value={data.content}
            onChange={handleChange}
            className="form-control"
          />
          <button className="btn btn-outline-primary m-2">Update</button>
        </form>
      </div>
      <div className="row">
        <div className="col-12 col-lg-8 mx-auto">
          <button
            className="btn btn-outline-secondary m-2 w-20"
            onClick={() => navigate("/notes")}
          >
            Back to Notes
          </button>
        </div>
      </div>
    </div>
  );
}
