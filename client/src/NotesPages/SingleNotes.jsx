/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../init/instance.js";
import SingleNotesCards from "./NotesCards/SingleNotesCards.jsx";

export default function Notes() {
  const [msg, setMsg] = useState("");
  const { noteId } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("tokens");
  const [notes, setNotes] = useState(null);
  const [check, setCheck] = useState("");
  //all one single note done
  useEffect(() => {
    const getOneNotes = async () => {
      try {
        const res = await api.get(`/notes/${noteId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // console.log("get one note AllNotes F: ", res.data);
        setNotes(res.data);
      } catch (e) {
        console.log("error Notes 1: ", e.response.data.message);
        setMsg(e.response.data.message);
      }
    };
    getOneNotes();
  }, []);
  //check
  useEffect(() => {
    if (notes) {
      setCheck(notes.check);
    }
  }, [notes]);
  console.log("check: notes ", check);
  useEffect(() => {
    const updateCheck = async () => {
      if (check === "") return;
      const res = await api.patch(`/notes/${noteId}`, { check: check });
      console.log("check: notes ", res.data);
    };
    updateCheck();
  }, [check]);

  return (
    <div className="container-fluid">
      {/* msg */}
      <div className="row justify-content-center">
        <div className="col-12 col-md-10 col-lg-8">
          {msg !== "" && (
            <div className="alert alert-danger" role="alert">
              {msg}
            </div>
          )}
        </div>
      </div>
      {/* notes show details */}
      <div className="row justify-content-center">
        <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-4">
          {notes && (
            <div
              key={notes._id}
              className="card shadow-lg mb-4"
              style={{
                backgroundColor: "aqua",
                minHeight: "20rem",
                borderRadius: "20px",
              }}
            >
              <div className="card-body d-flex flex-column justify-content-center">
                <SingleNotesCards
                  n={notes}
                  token={token}
                  navigate={navigate}
                  noteId={noteId}
                  check={check}
                  setCheck={setCheck}
                />
              </div>
            </div>
          )}
        </div>
      </div>
      {/* home page */}
      <div className="row justify-content-center">
        <div className="col-12 text-center">
          <button
            onClick={() => navigate("/notes")}
            className="btn btn-primary btn-lg"
          >
            Home Page
          </button>
        </div>
      </div>
    </div>
  );
}
