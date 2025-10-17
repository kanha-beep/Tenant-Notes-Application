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
    <div className="container-fluid">
      <div className="row justify-content-center">
        <div className="col-12">
          <h1 className="text-center py-4">Edit Note</h1>
        </div>
      </div>
      {/* msg */}
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          {msg && (
            <div className="alert alert-danger" role="alert">
              {msg}
            </div>
          )}
        </div>
      </div>
      {/* edit form */}
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <form onSubmit={handleEditNote} className="card p-4 shadow">
            <div className="mb-3">
              <input
                type="text"
                name="title"
                placeholder="Title of Note"
                value={data.title}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            <div className="mb-3">
              <textarea
                name="content"
                placeholder="Content of Note"
                value={data.content}
                onChange={handleChange}
                className="form-control"
                rows="4"
                required
              />
            </div>
            <UpdateButton/>
          </form>
        </div>
      </div>
      {/* back to all notes */}
      <div className="row justify-content-center mt-4">
        <div className="col-12 text-center">
          <button
            className="btn btn-outline-secondary"
            onClick={() => navigate("/notes")}
          >
            Back to Notes
          </button>
        </div>
      </div>
    </div>
  );
}
