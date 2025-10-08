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
  const getOneTasks = async () => {
    try {
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
  useEffect(() => {
    if (userRole === "admin") getOneUserNotes();
    else getOneTasks();
  }, []);
  console.log("notes", check);
  // const handleCheck = async () => {
  //   const res = await api.post(
  //     `/api/notes/${notesId}`,
  //     { check: check },
  //     { headers: { Authorization: `Bearer ${token}` } }
  //   );
  //   console.log("res for check", res);
  // };
  return (
    <div>
      <h2> Final SIngle User</h2>
      <Msg msg={msg} />
      {userRole === "admin" && users && (
        <SingleUsersCards
          users={users}
          token={token}
          navigate={navigate}
          n={users}
          userRole={userRole}
          onClick={(val) => setCheck(val)}
        />
      )}{" "}
      {userRole === "user" && notes && (
        <SingleUsersCards
          users={users}
          token={token}
          navigate={navigate}
          notes={notes}
          userRole={userRole}
          onClick={(val) => setCheck(val)}
        />
      )}
      value in real {check}
    </div>
  );
}
