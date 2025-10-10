import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import C1_AllUsers from "../NotesAdminPages/AllUsers/C1_AllUsers.jsx";
import NewButton from "../NotesComponents/Buttons/NewButton.jsx";
import DownloadButton from "../NotesComponents/Buttons/DownloadButton.jsx";
import SortButton from "../NotesComponents/Buttons/SortButton.jsx";
// import api from "../init/api.js";
import SearchButton from "../NotesComponents/Buttons/SearchButton.jsx";
// import api from "../init/api.js";
import PageButtons from "../NotesComponents/Buttons/PageButtons.jsx";
import Orientation from "../NotesComponents/Orientation.jsx";
import SwitchMode from "../NotesComponents/Buttons/SwitchMode.jsx";
export default function AllNotesFinal({ setIsPage }) {
  const tenant = localStorage.getItem("tenant") || "got";
  const filterTenant = tenant || "are";
  const [filterNotes, setFilterNotes] = useState([]);
  const [notes, setNotes] = useState([]);
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const [owner, setOwner] = useState([]);
  const token = localStorage.getItem("tokens");
  const [users, setUsers] = useState([]);
  const userRole = localStorage.getItem("role");
  const location = useLocation();
  const [toShowAdmin, setToShowAdmin] = useState(location.state);
  const [mode, setMode] = useState(false);
  return (
    <div className={`${mode ? "bg-dark text-white" : "bg-light text-dark"}`}>
      <Orientation />
      <h1 className="text-center">All Notes</h1>
      <NewButton navigate={navigate} />
      <div className="d-flex justify-content-start mb-3">
        <DownloadButton notes={notes} />
      </div>
      <PageButtons
        token={token}
        setFilterNotes={setFilterNotes}
        userRole={userRole}
        setUsers={setUsers}
        setNotes={setNotes}
        filterNotes={filterNotes}
        toShowAdmin={toShowAdmin}
        setToShowAdmin={setToShowAdmin}
      />
      <SwitchMode mode={mode} setMode={setMode} />
      <C1_AllUsers
        setNotes={setNotes}
        setIsPage={setIsPage}
        navigate={navigate}
        owner={owner}
        setOwner={setOwner}
        token={token}
        users={users}
        setUsers={setUsers}
        msg={msg}
        setMsg={setMsg}
        filterNotes={filterNotes}
        setFilterNotes={setFilterNotes}
        notes={notes}
        filterTenant={filterTenant}
      />
      end of all users final
    </div>
  );
}
