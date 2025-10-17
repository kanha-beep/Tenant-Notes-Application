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
    <div className={`min-h-screen transition-all duration-500 ${
      mode ? 'dark-mode' : ''
    }`}>
      <div className="container mx-auto px-4 py-6">
        <div className="text-center mb-8 mt-3">
          <h1 className={`text-4xl font-bold mb-4 transition-colors duration-300 ${
            mode ? 'text-white' : 'text-gray-800'
          }`}>
            👥 All Users
          </h1>
          <div className="flex justify-center">
            <SwitchMode mode={mode} setMode={setMode} />
          </div>
        </div>
        
        <div className="mb-8">
          <NewButton navigate={navigate} userRole={userRole} toShowAdmin={toShowAdmin}/>
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
            setFilterUsers={setFilterUsers}
          />
        </div>
        
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
      

    </div>
  );
}
