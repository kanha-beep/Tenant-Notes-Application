import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AllNotes from "./AllNotes.jsx";
import NewButton from "../Components/Buttons/NewButton.jsx";
import PageButtons from "../Components/Buttons/PageButtons.jsx";
import SwitchMode from "../Components/Buttons/SwitchMode.jsx";

export default function AllNotesFinal() {
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const [owner, setOwner] = useState([]);
  const token = localStorage.getItem("tokens");
  const userRole = localStorage.getItem("role");
  const [users, setUsers] = useState([]);
  const [notes, setNotes] = useState([]);
  const [filterNotes, setFilterNotes] = useState([]);
  // const [filterUsers, setFilterUsers] = useState([]);
  const [mode, setMode] = useState(false);
  const [toShowAdmin, setToShowAdmin] = useState(location.state || "notes");
  console.log("toShowAdmin: ", toShowAdmin);
  useEffect(() => {
    if (toShowAdmin) localStorage.setItem("toShowAdmin", toShowAdmin);
  }, [toShowAdmin]);
  return (
    <div
      className={`min-h-screen transition-all duration-500 ${
        mode ? "dark-mode" : ""
      }`}
    >
      <div className="container mx-auto px-4 py-6 mt-3">
        <div className="text-center mb-8">
          <h1
            className={`text-4xl font-bold mb-4 transition-colors duration-300 ${
              mode ? "text-white" : "text-gray-800"
            }`}
          >
            📝 All Notes
          </h1>
          <div className="flex justify-center">
            <SwitchMode mode={mode} setMode={setMode} />
          </div>
        </div>

        <div className="mb-8">
          <NewButton
            navigate={navigate}
            userRole={userRole}
            toShowAdmin={toShowAdmin}
          />
        </div>

        <div className="mb-8">
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
        </div>

        <AllNotes
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
          setFilterNotes={setFilterNotes}
          setIsPage={() => {}}
          toShowAdmin={toShowAdmin}
          setToShowAdmin={setToShowAdmin}
        />
      </div>


    </div>
  );
}
