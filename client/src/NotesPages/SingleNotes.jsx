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
      <div className="row">
        {msg !== "" && (
          <h4
            className="alert alert-danger col-12 col-md-8 col-lg-6"
            role="alert"
          >
            {msg}
          </h4>
        )}
      </div>
      {/* notes show details */}
      {notes && (
        <div
          key={notes._id}
          className="m-1 p-1 mx-auto col-7 col-lg-4 col-md-5"
          style={{
            backgroundColor: "aqua",
            height: "20rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            boxShadow: "0px 0px 15px black",
            borderRadius: "20px",
          }}
        >
          <SingleNotesCards
            n={notes}
            token={token}
            navigate={navigate}
            noteId={noteId}
            check={check}
            setCheck={setCheck}
          />
        </div>
      )}
      {/* home page */}
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
