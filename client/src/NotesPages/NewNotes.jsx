import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../init/api"

export default function NewNotes() {
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("tokens");
  const [data, setData] = useState({ title: "", content: "" });
  const handleChange = (e) => {
    setData((p) => ({ ...p, [e.target.name]: e.target.value }));
  };
  const handleCreateNote = async (e) => {
    try {
      e.preventDefault();
      console.log("data ready", data); //
      const res = await api.post(
        "/api/notes/new",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("NewNotes: ", res.data);
      navigate("/notes");
    } catch (e) {
      console.log("error NewNotes F:", typeof e.response.data);
      setMsg(e.response.data);
    }
  };
  return (
    <div>
      <h1> Add Note Here </h1>
      {msg !== "" && (
        <div className="alert alert-danger" role="alert">
          {msg} &nbsp;&nbsp;&nbsp;
          <button
            className="rounded p-1 m-3"
            onClick={() => navigate("/admin/plan")}
          >
            Plan Buy
          </button>
        </div>
      )}
      <form onSubmit={handleCreateNote}>
        <input
          type="text"
          onChange={handleChange}
          placeholder="Name of Note"
          name="title"
          value={data.title}
        />
        <input
          type="text"
          onChange={handleChange}
          placeholder="Content of Note"
          name="content"
          value={data.content}
        />
        <button>Create </button>
      </form>
      <button
        onClick={() => {
          navigate("/");
        }}
      >
        HomePage
      </button>
    </div>
  );
}
