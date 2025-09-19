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
    <div>
      <h1>Edit Note</h1>
      {msg && (
        <div className="alert alert-danger" role="alert">
          {msg}
        </div>
      )}
      <form onSubmit={handleEditNote}>
        <input
          type="text"
          name="title"
          placeholder="Name of Note"
          value={data.title}
          onChange={handleChange}
          className="m-2 p-1"
        />
        <input
          type="text"
          name="content"
          placeholder="Content of Note"
          value={data.content}
          onChange={handleChange}
          className="m-2 p-1"
        />
        <button className="btn btn-primary m-2">Update</button>
      </form>
      <button className="btn btn-secondary m-2" onClick={() => navigate("/notes")}>
        Back to Notes
      </button>
    </div>
  );
}
