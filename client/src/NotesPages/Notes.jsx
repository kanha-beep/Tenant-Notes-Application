/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../init/api"

export default function Notes() {
  const [msg, setMsg] = useState("");
  const { notesId } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("tokens");
  const [notes, setNotes] = useState(null);
  console.log("token:", token); // check this
  const getOneNotes = async () => {
    try {
      const res = await api.get(
        `/api/notes/${notesId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("get one note AllNotes F: ", res.data);
      setNotes(res.data);
    } catch (e) {
      console.log("error Notes: ", e.response.data.message);
      setMsg(e.response.data.message);
    }
  };
  useEffect(() => {
    getOneNotes();
  }, []);
  return (
    <div>
      <h2> Single Note</h2>
      {msg !== "" && (
        <h4 className="alert alert-danger" role="alert">
          {msg}
        </h4>
      )}
      <button onClick={() => navigate("/notes")}>Go Home</button>
      {notes && (
        <div
          key={notes._id}
          className="m-1 p-1"
          style={{
            backgroundColor: "aqua",
            height: "12rem",
            width: "15rem",
          }}
        >
          <div>
            <p>Title: {notes.title}</p>
          </div>
          <div>
            <p>Content: {notes.content}</p>
          </div>
          <div>
            <p>Id: {notes._id}</p>
          </div>
          <div>
            <p>Owner: {notes?.user?.username}</p>
            <p>Tenant: {notes.tenant.name}</p>
          </div>
          {/* <button onClick={() => navigate(`/${n._id}`)} className="m-1">
              View{" "}
            </button> */}
          <br />
          <button onClick={() => navigate("/notes")}>Home Page</button>
        </div>
      )}
    </div>
  );
}
