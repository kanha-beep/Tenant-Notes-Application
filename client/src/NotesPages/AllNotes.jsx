/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../init/api";
import NewButton from "../NotesComponents/Buttons/NewButton.jsx";
import DownloadButton from "../NotesComponents/Buttons/DownloadButton.jsx";
import SortButton from "../NotesComponents/Buttons/SortButton.jsx";
import CurrentOwner from "../NotesAdminPages/AllUsers/CurrentOwner.jsx";

export default function AllTasks({ isPage, setIsPage }) {
  // const {userId} = useParams();

  const tenant = localStorage.getItem("tenant") || "got";
  const [filterTenant] = useState(tenant || "are");
  const [filterNotes, setFilterNotes] = useState([]);
  const [owner, setOwner] = useState({});
  const [notes, setNotes] = useState([]);
  const token = localStorage.getItem("tokens");
  const navigate = useNavigate();
  const [sortBy, setSortBy] = useState("");
  //tenant filter
  useEffect(() => {
    const filtered = notes.filter((n) => n.tenant?.name === filterTenant);
    console.log("Filtered Notes: ", filtered);
    setFilterNotes(filtered);
  }, [filterTenant, notes, token]);
  const currentOwner = async () => {
    try {
      // console.log("tokens for owner AllNotes:", token);
      if (!token) {
        console.log("No token for Owner AllNotes");
        return;
      }
      const res = await api.get(`/api/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log("current owner AllNotes: ", res.data);
      setOwner(res.data);
    } catch (e) {
      console.log("current AllNotes: ", e.response.data.message);
    }
  };
  useEffect(() => {
    currentOwner();
  }, [token, filterNotes]);
  const handleDelete = async (notesId) => {
    try {
      const res = await api.delete(`/api/notes/${notesId}/delete`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("note deleted AllNotes F", res.data);
      setNotes((p) => p.filter((n) => n._id !== notesId));
    } catch (e) {
      console.log("error while deleting AllNotes F: ", e.response.data.message);
    }
  };

  const getAllNotes = async () => {
    try {
      const res = await api.get("/api/notes", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("1. get all notes", res.data);
      setNotes(res.data);
      setIsPage(true);
    } catch (e) {
      if (e.response.status === 401) {
        console.log("error AllNotes: ", e.response.data);
      } else if (e.response.status === 403) {
        console.log("error AllNotes: ", e.response.data.message);
      }
    }
  };
  useEffect(() => {
    getAllNotes();
  }, [token]);

  const sortedTasks = async (e) => {
    const value = e.target.value;
    setSortBy(value);
    try {
      const res = await api.get(`/api/notes?sortBy=${value}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setFilterNotes(res.data.notes || []);
    } catch (e) {
      console.log("error sort", e);
    }
  };
  return (
    <div className="container">
      <h1 className="p-2 text-center">All Notes</h1>
      hello this is old allNotes
      <div className="d-flex justify-content-start mb-3">
        <NewButton navigate={navigate} />
      </div>
      <div className="d-flex justify-content-start mb-3">
        <DownloadButton notes={notes} />
      </div>
      <div>
        <SortButton sortBy={sortBy} sortedTasks={sortedTasks} />
      </div>
      <CurrentOwner
        owner={owner}
        setOwner={setOwner}
        token={token}
        isPage={isPage}
        navigate={navigate}
      />
      <div className="row">
        {filterNotes &&
          filterNotes.map((n) => (
            <div key={n._id} className="col-12 col-sm-6 col-md-4 mb-3">
              <div className="p-3 rounded-3 bg-info shadow-sm h-100">
                <p>
                  Owner Name: <b>{n.user?.username}</b>
                </p>
                <p>
                  Owner Id: <b>{n.user?._id}</b>
                </p>
                <p>Title: {n.title}</p>
                <p>Content: {n.content}</p>
                <p>
                  Id: <b>{n._id}</b>
                </p>
                <p>
                  Current Tenant Name: <b>{n.tenant?.name}</b>
                </p>
                <div className="d-flex flex-wrap">
                  <button
                    onClick={() => navigate(`/notes/${n._id}`)}
                    className="btn btn-outline-primary m-1 rounded-4"
                  >
                    View
                  </button>
                  <button
                    onClick={() => handleDelete(n._id)}
                    className="btn btn-outline-danger m-1 rounded-4"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
{
  /* {owner && (
        <div
          key={owner._id}
          className="p-3 mb-3 rounded-5 bg-info col-12 col-sm-6 col-md-4"
        >
          <p>
            Current OwnerId: <b>{owner?._id}</b> <br />
            Current Owner Name: <b>{owner?.username}</b> <br />
            Current Tenant Name: <b>{owner?.tenant?.name}</b> <br />
            Status: {isPage ? "Online" : "Offline"}
          </p>
          <button
            className="btn btn-secondary rounded-4"
            onClick={() => navigate(`/users/${owner?._id}`)}
          >
            Go to Profile
          </button>
        </div>
      )} */
}
