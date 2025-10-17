import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../init/instance.js";
import UpdateButton from "../Components/Buttons/UpdateButton.jsx";
export default function EditNotes() {
  const { noteId } = useParams(); // Get note ID from URL
  const navigate = useNavigate();
  const token = localStorage.getItem("tokens");
  const [msg, setMsg] = useState("");
  const [data, setData] = useState({ title: "", content: "" });

  //get single note
  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await api.get(`/notes/${noteId}/edit`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setData(res.data);
      } catch (e) {
        setMsg(e.response?.data?.message || "Error fetching note");
      }
    };
    fetchNote();
  }, [noteId, token]);

  const handleChange = (e) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
// edit note
  const handleEditNote = async (e) => {
    e.preventDefault();
    try {
      const res = await api.patch(`/notes/${noteId}/edit`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("Edited Note: ", res.data);
      navigate(`/notes/${noteId}`); // Redirect to notes page
    } catch (e) {
      setMsg(e.response?.data?.message || "Error updating note");
    }
  };

  return (
    <div className="container">
      <h1 className="text-center">Edit Note</h1>
      {/* msg */}
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
      {/* edit form */}
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
            className="form-control my-2"
          />
          <UpdateButton/>
        </form>
      </div>
      {/* back to all notes */}
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
