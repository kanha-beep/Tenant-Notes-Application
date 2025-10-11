import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import C1_AllUsers from "./C1_AllUsers.jsx";
import NewButton from "../../NotesComponents/Buttons/NewButton.jsx";
import SearchButton from "../../NotesComponents/Buttons/SearchButton.jsx";
import SortButton from "../../NotesComponents/Buttons/SortButton.jsx";
import PageButtons from "../../NotesComponents/Buttons/PageButtons.jsx";
import SwitchMode from "../../NotesComponents/Buttons/SwitchMode.jsx";

export default function AllUsersFinal() {
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const [owner, setOwner] = useState([]);
  const token = localStorage.getItem("tokens");
  const userRole = localStorage.getItem("role");
  const [users, setUsers] = useState([]);
  const [notes, setNotes] = useState([]);
  const [filterNotes, setFilterNotes] = useState([]);
  const location = useLocation();
  // const [toShowAdmin, setToShowAdmin] = useState(location.state);
  // localStorage.setItem("toShowAdmin", toShowAdmin)
  const [filterUsers, setFilterUsers] = useState([]);
  const [mode, setMode] = useState(false);
  // console.log("admin will get", toShowAdmin);
  const [toShowAdmin, setToShowAdmin] = useState(() => {
    return location.state || localStorage.getItem("toShowAdmin") || "notes";
  });

  useEffect(() => {
    if (toShowAdmin) localStorage.setItem("toShowAdmin", toShowAdmin);
  }, [toShowAdmin]);

  return (
    <div className={`${mode ? "bg-dark text-white" : "bg-light text-dark"}`}>
      <h1 className="text-center">All Users</h1>
      <NewButton navigate={navigate} userRole={userRole} />
      <PageButtons
        token={token}
        setFilterNotes={setFilterNotes}
        userRole={userRole}
        setUsers={setUsers}
        setNotes={setNotes}
        filterNotes={filterNotes}
        toShowAdmin={toShowAdmin}
        setToShowAdmin={setToShowAdmin}
        setFilterUsers={setFilterUsers}
      />
      <SwitchMode mode={mode} setMode={setMode} />
      <C1_AllUsers
        navigate={navigate}
        owner={owner}
        setOwner={setOwner}
        token={token}
        users={users}
        setUsers={setUsers}
        msg={msg}
        setMsg={setMsg}
        notes={notes}
        setNotes={setNotes}
        filterNotes={filterNotes}
        setFilterUsers={setFilterUsers}
        filterUsers={filterUsers}
      />
    </div>
  );
}
