/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../init/api"

export default function AllTasks() {
  const tenant = localStorage.getItem("tenant") || "got";
  const [filterTenant] = useState(tenant || "are");
  const [filterTenantNotes, setFilterTenantNotes] = useState([]);
  const [owner, setOwner] = useState({});
  const [notes, setNotes] = useState([]);
  const token = localStorage.getItem("tokens");
  const navigate = useNavigate();
  //tenant filter
  useEffect(() => {
    const filtered = notes.filter((n) => n.tenant?.name === filterTenant);
    console.log("Filtered Notes: ", filtered);
    setFilterTenantNotes(filtered);
  }, [filterTenant, notes, token]);
  const currentOwner = async () => {
    try {
      // console.log("tokens for owner AllNotes:", token);
      if (!token) {
        console.log("No token for Owner AllNotes");
        return;
      }
      const res = await api.get(`/api/notes/auth/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log("current owner AllNotes: ", res.data);
      setOwner(res.data);
    } catch (e) {
      console.log("current AllNotes: ", e.response.data);
    }
  };
  useEffect(() => {
    currentOwner();
  }, [token, filterTenantNotes]);
  const handleDelete = async (notesId) => {
    try {
      const res = await api.delete(
        `/api/notes/${notesId}/delete`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
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
      // console.log("get all notes", res.data);
      setNotes(res.data);
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
  return (
    <div>
      <div>
        Add Note{" "}
        <button onClick={() => navigate("/notes/new")}>Add Note </button>
      </div>
      <h1> All Tasks</h1>
      {owner && (
        <div key={owner._id}>
          <p>
            {" "}
            Current OwnerId: <b>{owner?._id}</b> <br />
            Current Owner Name: <b>{owner?.username}</b>
          </p>
          {owner?.tenant?.name && (
            <p>
              Current Tenant Name: <b>{owner?.tenant.name}</b>
            </p>
          )}
        </div>
      )}
      {filterTenantNotes &&
        filterTenantNotes.map((n) => (
          <div key={n._id}>
            <br />
            <div
              className="m-1 p-1"
              style={{
                backgroundColor: "aqua",
                height: "20rem",
                width: "20rem",
              }}
            >
              <div>
                <p>
                  Owner Name: <b>{n.user?.username}</b>
                </p>
              </div>
              <div>
                <p>
                  Owner Id: <b>{n.user?._id}</b>{" "}
                </p>
              </div>
              <div>
                <p>Title: {n.title}</p>
              </div>
              <div>
                <p>Content: {n.content}</p>
              </div>
              <div>
                <p>
                  Id: <b>{n._id}</b>
                </p>
                <p>
                  Current Tenant Name: <b>{n.tenant?.name}</b>
                </p>
              </div>

              <button
                onClick={() => navigate(`/notes/${n._id}`)}
                className="m-1"
              >
                View{" "}
              </button>
              <br />
              <button onClick={() => handleDelete(n._id)}>Delete</button>
            </div>
          </div>
        ))}
    </div>
  );
}
