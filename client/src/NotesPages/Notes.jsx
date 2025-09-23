/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../init/api";

export default function Notes() {
  const [msg, setMsg] = useState("");
  const { notesId } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("tokens");
  const [notes, setNotes] = useState(null);
  console.log("token:", token); // check this
  const getOneNotes = async () => {
    try {
      const res = await api.get(`/api/notes/${notesId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
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
    <div className="container-fluid">
      <h2 className="text-center">Your Dashboard</h2>
      <div className="row">
        {msg !== "" && (
          <h4 className="alert alert-danger col-12 col-md-8 col-lg-6" role="alert">
            {msg}
          </h4>
        )}
      </div>
      <div className="row justify-content-center">
        <div
          style={{ backgroundColor: "aqua", width: "30%" }}
          className="p-2 rounded-3 mb-2 col-12 col-md-8 col-lg-6"
        >
          <p>
            Owner Name: <b>{notes?.title}</b>
          </p>
          <p>
            Owner Id: <b>{notes?._id}</b>
          </p>
        </div>
      </div>
      <div
        style={{
          backgroundColor: "yellow",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
        }}
        className="p-2 row"
      >
        {notes && (
          <div
            key={notes._id}
            className="m-1 p-1 col-12 col-lg-6 col-md-8"
            style={{
              backgroundColor: "aqua",
              height: "20rem",
              // width: "25rem",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              boxShadow: "0px 0px 15px black",
              borderRadius: "20px",
            }}
          >
            <div>
              <p>
                Title:<b> {notes.title}</b>
              </p>
            </div>
            <div>
              <p>
                Content: <b>{notes.content}</b>
              </p>
            </div>
            <div>
              <p>
                Id: <b>{notes._id}</b>
              </p>
            </div>
            <div>
              <p>
                Owner: <b>{notes?.user?.username}</b>
              </p>
              <p>
                Tenant: <b>{notes.tenant.name}</b>
              </p>
            </div>
            <button
              onClick={() => navigate(`/notes/${notes?._id}/edit`)}
              className="m-1 btn btn-outline-primary rounded-4"
              style={{ width: "20%" }}
            >
              Edit
            </button>
            <br />
          </div>
        )}
      </div>
      <button
        onClick={() => navigate("/notes")}
        style={{ width: "7rem" }}
        className="p-2 rounded-5"
      >
        Home Page
      </button>
    </div>
  );
}
