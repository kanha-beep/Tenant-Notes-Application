/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import api from "../../init/api.js";
import Msg from "./AlertBoxes/Msg.jsx";
import SingleUsersCards from "./UsersCards/SingleUsersCards.jsx";
import { useNavigate, useParams } from "react-router-dom";
export default function C4_SingleUsers() {
  const userRole = localStorage.getItem("role");
  const navigate = useNavigate();
  const token = localStorage.getItem("tokens");
  const [users, setUsers] = useState(null);
  const [notes, setNotes] = useState(null);
  const [msg, setMsg] = useState("");
  const { userId, notesId } = useParams();
  const [check, setCheck] = useState("");
  const toShowAdmin = localStorage.getItem("toShowAdmin");
  // console.log("admin will get id....:", location.pathname);
  //get one user details by admin
  const getOneUserNotes = async () => {
    try {
      const res = await api.get(`/api/admin/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("get one note AllNotes F: ", res.data);
      setUsers(res.data);
    } catch (e) {
      console.log("error Notes: ", e.response.data.message);
      setMsg(e.response.data.message);
    }
  };
  //get one note detail for user
  const getOneTasks = async () => {
    try {
      console.log("get notes");
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
  //update notes
  const updateOneTasks = async () => {
    try {
      const res = await api.patch(
        `/api/notes/${notesId}`,
        { check: check },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log("updated Note: ", res.data);
      setNotes(res.data);
    } catch (e) {
      console.log("error Notes: ", e.response.data.message);
      setMsg(e.response.data.message);
    }
  };
  //execute update function
  useEffect(() => {
    if (check === "") return;
    updateOneTasks();
  }, [check]);
  //auto checks the updated value on render
  useEffect(() => {
    if (notes) setCheck(notes.check); // sync checkbox state with backend
  }, [notes]);
  //auto render the notes value
  useEffect(() => {
    if (userRole === "admin" && toShowAdmin === "users") getOneUserNotes();
    else getOneTasks();
  }, []);
  // console.log("one note: ", notes);
  return (
    <div className="row justify-content-center">
      <h2 className="text-center">
        {userRole === "users"
          ? "Single Note"
          : toShowAdmin === "users"
          ? "Single User"
          : "Single Notes by Admin"}
      </h2>
      <div className="col-10 col-md-10 col-lg-10 bg-dark">
        <Msg msg={msg} />
        {userRole === "admin" && toShowAdmin === "users" && (
          <SingleUsersCards
            users={users}
            token={token}
            navigate={navigate}
            key={users?._id}
            n={users}
            userRole={userRole}
            setCheck={setCheck}
            toShowAdmin={toShowAdmin}
            userId={userId}
            notesId={notesId}
          />
        )}
        {userRole === "admin" && toShowAdmin === "notes" && (
          <SingleUsersCards
            users={users}
            token={token}
            navigate={navigate}
            key={users?._id}
            n={notes}
            userRole={userRole}
            setCheck={setCheck}
            toShowAdmin={toShowAdmin}
            userId={userId}
            notesId={notesId}
          />
        )}
        {userRole === "user" && notes && (
          <SingleUsersCards
            key={users?._id}
            users={users}
            token={token}
            navigate={navigate}
            notes={notes}
            userRole={userRole}
            check={check}
            setCheck={setCheck}
            toShowAdmin={toShowAdmin}
            userId={userId}
            notesId={notesId}
          />
        )}
      </div>
    </div>
  );
}
