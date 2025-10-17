import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AllUsers from "./AllUsers.jsx";
import NewButton from "../Components/Buttons/NewButton.jsx";
import PageButtons from "../Components/Buttons/PageButtons.jsx";
import SwitchMode from "../Components/Buttons/SwitchMode.jsx";

export default function AllUsersFinal() {
  const [msg, setMsg] = useState("");
  const location = useLocation()
  const navigate = useNavigate();
  const [owner, setOwner] = useState([]);
  const token = localStorage.getItem("tokens");
  const userRole = localStorage.getItem("role");
  const [users, setUsers] = useState([]);
  const [notes, setNotes] = useState([]);
  const [filterNotes, setFilterNotes] = useState([]);
  // const [toShowAdmin, setToShowAdmin] = useState(location.state);
  // localStorage.setItem("toShowAdmin", toShowAdmin)
  const [filterUsers, setFilterUsers] = useState([]);
  const [mode, setMode] = useState(false);
  // console.log("admin will get", toShowAdmin);
  const [toShowAdmin, setToShowAdmin] = useState(() => {
    return localStorage.getItem("toShowAdmin") || "users";
  });
  console.log("what is got: ", toShowAdmin)
  console.log(location.state, ": admin .....");
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
      <AllUsers
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
        setIsPage={() => {}}
        toShowAdmin={toShowAdmin}
        setToShowAdmin={setToShowAdmin}
      />
    </div>
  );
}
